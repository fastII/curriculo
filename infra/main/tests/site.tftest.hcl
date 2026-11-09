# Testes automatizados da infraestrutura (tofu test + mock provider).
# Rodam sem conta AWS e sem custo: validam as regras de segurança e de entrega do site.
#   tofu init -backend=false && tofu test

# No OpenTofu só campos computados podem ser sobrescritos;
# os demais data sources recebem valores gerados pelo mock.
mock_provider "aws" {
  override_data {
    target = data.aws_caller_identity.current
    values = { account_id = "123456789012" }
  }
  override_data {
    target = data.aws_iam_policy_document.site_bucket
    values = { json = "{}" }
  }
  override_data {
    target = data.aws_iam_policy_document.deploy
    values = { json = "{}" }
  }
  override_data {
    target = data.aws_iam_policy_document.deploy_trust
    values = { json = "{}" }
  }
}

mock_provider "aws" {
  alias = "us_east_1"
}

# Simula os registros de validação que a AWS devolve para o certificado
override_resource {
  target = aws_acm_certificate.site
  values = {
    arn = "arn:aws:acm:us-east-1:123456789012:certificate/mock"
    domain_validation_options = [
      {
        domain_name           = "cadconsultoria.net.br"
        resource_record_name  = "_abc.cadconsultoria.net.br."
        resource_record_type  = "CNAME"
        resource_record_value = "_xyz.acm-validations.aws."
      },
      {
        domain_name           = "www.cadconsultoria.net.br"
        resource_record_name  = "_def.www.cadconsultoria.net.br."
        resource_record_type  = "CNAME"
        resource_record_value = "_uvw.acm-validations.aws."
      },
    ]
  }
}

# O mock do OpenTofu gera strings aleatórias; ARNs precisam de formato válido
override_resource {
  target = aws_cloudfront_function.redirect_www
  values = { arn = "arn:aws:cloudfront::123456789012:function/curriculo-redirect-www" }
}

override_resource {
  target = aws_cloudfront_distribution.site
  values = {
    arn            = "arn:aws:cloudfront::123456789012:distribution/EMOCK123"
    domain_name    = "dmock123.cloudfront.net"
    hosted_zone_id = "Z2FDTNDATAQYW2"
  }
}

variables {
  domain_name = "cadconsultoria.net.br"
  github_repo = "fastII/curriculo"
}

run "bucket_do_site_e_privado" {
  command = plan

  assert {
    condition = alltrue([
      aws_s3_bucket_public_access_block.site.block_public_acls,
      aws_s3_bucket_public_access_block.site.block_public_policy,
      aws_s3_bucket_public_access_block.site.ignore_public_acls,
      aws_s3_bucket_public_access_block.site.restrict_public_buckets,
    ])
    error_message = "O bucket do site precisa bloquear todo acesso público."
  }

  assert {
    condition     = aws_s3_bucket_versioning.site.versioning_configuration[0].status == "Enabled"
    error_message = "Versionamento deve estar ligado para permitir rollback."
  }

  assert {
    condition     = aws_s3_bucket.site.bucket == "curriculo-site-123456789012"
    error_message = "Nome do bucket fora do padrão <project>-site-<account_id>."
  }
}

run "cloudfront_seguro_e_global" {
  command = plan

  assert {
    condition     = aws_cloudfront_distribution.site.default_cache_behavior[0].viewer_protocol_policy == "redirect-to-https"
    error_message = "Todo acesso HTTP deve ser redirecionado para HTTPS."
  }

  assert {
    condition     = aws_cloudfront_distribution.site.viewer_certificate[0].minimum_protocol_version == "TLSv1.2_2021"
    error_message = "TLS mínimo deve ser 1.2."
  }

  assert {
    condition     = aws_cloudfront_distribution.site.price_class == "PriceClass_All"
    error_message = "PriceClass_All é necessário para usar os pontos de presença do Brasil."
  }

  assert {
    condition     = toset(aws_cloudfront_distribution.site.aliases) == toset(["cadconsultoria.net.br", "www.cadconsultoria.net.br"])
    error_message = "Domínio raiz e www devem estar nos aliases."
  }

  assert {
    condition     = aws_cloudfront_response_headers_policy.security.security_headers_config[0].strict_transport_security[0].access_control_max_age_sec >= 31536000
    error_message = "HSTS deve ter pelo menos 1 ano."
  }

  assert {
    condition     = aws_cloudfront_origin_access_control.site.signing_behavior == "always"
    error_message = "O CloudFront deve assinar todas as requisições ao S3 (OAC)."
  }
}

run "certificado_em_us_east_1_com_www" {
  command = plan

  assert {
    condition     = aws_acm_certificate.site.validation_method == "DNS"
    error_message = "Validação do certificado deve ser por DNS."
  }

  assert {
    condition     = contains(aws_acm_certificate.site.subject_alternative_names, "www.cadconsultoria.net.br")
    error_message = "O certificado deve cobrir o www."
  }
}

run "sem_www" {
  command = plan

  variables {
    enable_www = false
  }

  assert {
    condition     = aws_cloudfront_distribution.site.aliases == toset(["cadconsultoria.net.br"])
    error_message = "Sem www, só o domínio raiz deve ser alias."
  }

  assert {
    condition     = length(aws_route53_record.site) == 2
    error_message = "Sem www, devem existir só os registros A e AAAA do domínio raiz."
  }
}

run "dominio_invalido_e_rejeitado" {
  command = plan

  variables {
    domain_name = "https://www.cadconsultoria.net.br"
  }

  expect_failures = [var.domain_name]
}
