provider "aws" {
  region = var.aws_region
  default_tags {
    tags = local.tags
  }
}

# O certificado usado pelo CloudFront precisa estar em us-east-1
provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"
  default_tags {
    tags = local.tags
  }
}

data "aws_caller_identity" "current" {}

locals {
  tags = {
    Project   = var.project
    ManagedBy = "opentofu"
    Stack     = "site"
    Domain    = var.domain_name
  }

  www_domain  = "www.${var.domain_name}"
  aliases     = var.enable_www ? [var.domain_name, local.www_domain] : [var.domain_name]
  site_bucket = "${var.project}-site-${data.aws_caller_identity.current.account_id}"
}
