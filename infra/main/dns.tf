# Zona DNS no Route 53.
# Depois de criada, copie os 4 servidores do output "name_servers"
# para "Servidores DNS" do domínio na Registro.br.
resource "aws_route53_zone" "this" {
  name    = var.domain_name
  comment = "Site ${var.domain_name} - gerenciado por OpenTofu"
}

# Registros Alias (consultas Alias para o CloudFront não são cobradas)
resource "aws_route53_record" "site" {
  for_each = toset(flatten([for d in local.aliases : ["${d}|A", "${d}|AAAA"]]))

  zone_id = aws_route53_zone.this.zone_id
  name    = split("|", each.key)[0]
  type    = split("|", each.key)[1]

  alias {
    name                   = aws_cloudfront_distribution.site.domain_name
    zone_id                = aws_cloudfront_distribution.site.hosted_zone_id
    evaluate_target_health = false
  }
}

# CAA: só a Amazon pode emitir certificados para o domínio
resource "aws_route53_record" "caa" {
  zone_id = aws_route53_zone.this.zone_id
  name    = var.domain_name
  type    = "CAA"
  ttl     = 3600
  records = [
    "0 issue \"amazon.com\"",
    "0 issue \"amazontrust.com\"",
    "0 issue \"awstrust.com\"",
    "0 issue \"amazonaws.com\"",
  ]
}
