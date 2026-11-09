terraform {
  required_version = ">= 1.10"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 5.80, < 7.0"
    }
  }

  # Configuração parcial: bucket/key/region vêm de backend.hcl
  # tofu init -backend-config=backend.hcl
  # use_lockfile = lock nativo no S3 (OpenTofu >= 1.10), sem DynamoDB.
  backend "s3" {
    encrypt      = true
    use_lockfile = true
  }
}
