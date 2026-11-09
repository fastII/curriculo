output "name_servers" {
  description = "Cadastre estes 4 servidores em 'Servidores DNS' do domínio na Registro.br."
  value       = aws_route53_zone.this.name_servers
}

output "site_bucket" {
  description = "Variável SITE_BUCKET do GitHub."
  value       = aws_s3_bucket.site.bucket
}

output "cloudfront_distribution_id" {
  description = "Variável CF_DISTRIBUTION_ID do GitHub."
  value       = aws_cloudfront_distribution.site.id
}

output "cloudfront_domain" {
  value = aws_cloudfront_distribution.site.domain_name
}

output "deploy_role_arn" {
  description = "Variável AWS_DEPLOY_ROLE_ARN do GitHub."
  value       = aws_iam_role.deploy.arn
}

output "site_url" {
  value = "https://${var.domain_name}"
}
