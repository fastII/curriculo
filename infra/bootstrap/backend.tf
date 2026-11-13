terraform {
  backend "s3" {
    bucket       = "curriculo-tfstate-360716932416"
    key          = "site/tofu.tfstate"
    region       = "sa-east-1"
    encrypt      = true
    use_lockfile = true
  }
}