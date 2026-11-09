variable "aws_region" {
  description = "Região principal (state remoto e bucket do site)."
  type        = string
  default     = "sa-east-1"
}

variable "project" {
  description = "Prefixo dos recursos (letras minúsculas, números e hífen)."
  type        = string
  default     = "curriculo"

  validation {
    condition     = can(regex("^[a-z0-9-]{3,30}$", var.project))
    error_message = "Use de 3 a 30 caracteres: letras minúsculas, números e hífen."
  }
}

variable "github_repo" {
  description = "Repositório no formato dono/nome, ex.: andersonoliveira/anderson-site."
  type        = string

  validation {
    condition     = can(regex("^[A-Za-z0-9_.-]+/[A-Za-z0-9_.-]+$", var.github_repo))
    error_message = "Use o formato dono/nome."
  }
}

variable "create_github_oidc_provider" {
  description = "false se a conta já tiver o provedor OIDC do GitHub (só pode existir um por conta)."
  type        = bool
  default     = true
}
