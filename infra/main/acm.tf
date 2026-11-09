resource "aws_acm_certificate" "site" {
  provider = aws.us_east_1

  domain_name               = var.domain_name
  subject_alternative_names = var.enable_www ? [local.www_domain] : []
  validation_method         = "DNS"
  key_algorithm             = "EC_prime256v1"

  lifecycle {
    create_before_destroy = true
  }
}

# Chaves estáticas (domínios conhecidos no plan); valores vêm do certificado
resource "aws_route53_record" "acm_validation" {
  for_each = toset(local.aliases)

  zone_id         = aws_route53_zone.this.zone_id
  name            = one([for o in aws_acm_certificate.site.domain_validation_options : o.resource_record_name if o.domain_name == each.key])
  type            = one([for o in aws_acm_certificate.site.domain_validation_options : o.resource_record_type if o.domain_name == each.key])
  records         = [one([for o in aws_acm_certificate.site.domain_validation_options : o.resource_record_value if o.domain_name == each.key])]
  ttl             = 300
  allow_overwrite = true
}

# Só conclui depois que a Registro.br estiver apontando para o Route 53.
resource "aws_acm_certificate_validation" "site" {
  provider = aws.us_east_1

  certificate_arn         = aws_acm_certificate.site.arn
  validation_record_fqdns = [for r in aws_route53_record.acm_validation : r.fqdn]

  timeouts {
    create = "2h"
  }
}
