output "tf_state_bucket" {
  description = "Use em infra/main/backend.hcl e na variável TF_STATE_BUCKET do GitHub."
  value       = aws_s3_bucket.tfstate.bucket
}

output "infra_role_arn" {
  description = "Use na variável AWS_INFRA_ROLE_ARN do GitHub."
  value       = aws_iam_role.infra.arn
}

output "github_oidc_provider_arn" {
  value = local.oidc_provider_arn
}
