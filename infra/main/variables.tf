variable "aws_region" {
  description = "Região do bucket do site."
  type        = string
  default     = "sa-east-1"
}

variable "project" {
  description = "Prefixo dos recursos (o mesmo usado no bootstrap)."
  type        = string
  default     = "curriculo"
}

variable "domain_name" {
  description = "Domínio raiz registrado na Registro.br, ex.: cadconsultoria.net.br"
  type        = string

  validation {
    condition     = can(regex("^[a-z0-9-]+(\\.[a-z0-9-]+)+$", var.domain_name))
    error_message = "Informe só o domínio, sem https:// e sem www."
  }
}

variable "enable_www" {
  description = "Atende www.<domínio> redirecionando (301) para o domínio raiz."
  type        = bool
  default     = true
}

variable "github_repo" {
  description = "Repositório no formato dono/nome (o mesmo do bootstrap)."
  type        = string
}

variable "price_class" {
  description = "PriceClass_All inclui os pontos de presença da América do Sul (PriceClass_100 não inclui)."
  type        = string
  default     = "PriceClass_All"
}

variable "content_security_policy" {
  description = "CSP enviada pelo CloudFront. Ajuste se adicionar scripts/fontes de outros domínios."
  type        = string
  default     = "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'none'; object-src 'none'; upgrade-insecure-requests"
}
