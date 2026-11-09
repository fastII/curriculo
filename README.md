# anderson-site · Site pessoal com OpenTofu, GitOps e testes automatizados

Site estático hospedado na AWS com **S3 privado + CloudFront (OAC) + ACM + Route 53**, provisionado 100% com **OpenTofu** e publicado por **GitHub Actions** com autenticação **OIDC** (sem chaves de acesso fixas).

```
Usuário ──► Route 53 ──► CloudFront (HTTPS, HTTP/3, cache, headers de segurança)
                              │  OAC (SigV4)
                              ▼
                         S3 privado (versionado, criptografado)
```

## O que tem aqui

| Pasta | Conteúdo |
|---|---|
| `site/` | HTML, CSS e JS do site + página 404 |
| `infra/bootstrap/` | State remoto (S3 com lock nativo), provedor OIDC do GitHub e role do pipeline. Roda **uma vez**, localmente. |
| `infra/main/` | Stack do site: Route 53, ACM, S3, CloudFront, função de redirect www e role de deploy. |
| `infra/main/tests/` | Testes `tofu test` com mock provider (sem AWS, sem custo). |
| `.github/workflows/tofu.yml` | fmt → validate → test → Trivy → plan → apply (com aprovação) |
| `.github/workflows/deploy-site.yml` | HTML lint → links → busca de segredos → deploy → invalidação → smoke test |

### Segurança e boas práticas
- Bucket do site **sem acesso público**; só o CloudFront lê via **Origin Access Control**.
- **HTTPS obrigatório**, TLS mínimo 1.2, HTTP/2 e HTTP/3, IPv6.
- Cabeçalhos: **HSTS**, **CSP**, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy.
- **CAA** no DNS: só a Amazon emite certificados para o domínio.
- **OIDC** no GitHub Actions: credenciais temporárias, roles separadas para infra e deploy, deploy com **menor privilégio**.
- **Versionamento** no S3 para rollback e state remoto com **lock nativo** (`use_lockfile`, OpenTofu ≥ 1.10).
- `PriceClass_All`: usa os pontos de presença do **Brasil** (o PriceClass_100 não inclui América do Sul).
- Riscos aceitos documentados em `.trivyignore`.

---

## Pré-requisitos
- Conta AWS com um usuário/perfil administrador para o bootstrap
- **OpenTofu ≥ 1.10** e **AWS CLI v2**
- Repositório no GitHub (ex.: `SEU-USUARIO/anderson-site`)
- Domínio registrado na [Registro.br](https://registro.br)

### Instalar o OpenTofu
```bash
# macOS
brew install opentofu

# Linux (script oficial)
curl -fsSL https://get.opentofu.org/install-opentofu.sh -o install-opentofu.sh
chmod +x install-opentofu.sh && ./install-opentofu.sh --install-method standalone

# Windows
winget install --exact --id=OpenTofu.Tofu

tofu version
```
Mais opções: <https://opentofu.org/docs/intro/install/>

## Passo a passo

### 1. Bootstrap (uma vez, local)
```bash
cd infra/bootstrap
cp terraform.tfvars.example terraform.tfvars   # edite github_repo
tofu init
tofu apply
```
Anote os outputs `tf_state_bucket` e `infra_role_arn`.

> Se a conta já tiver o provedor OIDC do GitHub, use `create_github_oidc_provider = false`.
> O state do bootstrap fica local (`terraform.tfstate`). Guarde-o em local seguro.

### 2. Criar a zona DNS e apontar a Registro.br
O certificado só é validado depois que o domínio aponta para o Route 53, por isso a primeira aplicação é em duas etapas:

```bash
cd ../main
cp backend.hcl.example backend.hcl             # preencha com tf_state_bucket
cp terraform.tfvars.example terraform.tfvars   # domínio e repositório
tofu init -backend-config=backend.hcl
tofu apply -target=aws_route53_zone.this
tofu output name_servers
```

Na **Registro.br** → seu domínio → **DNS** → **Alterar servidores DNS** → cadastre os **4 servidores** do output e salve.
A propagação costuma levar de minutos a algumas horas. Para conferir:
```bash
dig NS andersonoliveira.com.br +short
```

### 3. Criar o resto da infraestrutura
```bash
tofu apply
```
O `aws_acm_certificate_validation` aguarda (até 2 h) a validação do certificado. Ao final, anote os outputs.

### 4. Configurar o GitHub
**Settings → Secrets and variables → Actions → Variables**:

| Variável | Valor |
|---|---|
| `AWS_REGION` | `sa-east-1` |
| `DOMAIN_NAME` | `andersonoliveira.com.br` |
| `TF_STATE_BUCKET` | output `tf_state_bucket` (bootstrap) |
| `AWS_INFRA_ROLE_ARN` | output `infra_role_arn` (bootstrap) |
| `AWS_DEPLOY_ROLE_ARN` | output `deploy_role_arn` |
| `SITE_BUCKET` | output `site_bucket` |
| `CF_DISTRIBUTION_ID` | output `cloudfront_distribution_id` |

**Settings → Environments → New environment** → `production` → marque **Required reviewers** (você).

### 5. Publicar
```bash
git add . && git commit -m "feat: site + infra" && git push origin main
```
- Mudou `site/**` → testes → deploy → invalidação → smoke test.
- Mudou `infra/main/**` → testes → plan → apply (após aprovação).
- Em pull requests rodam só os testes e o plan.

---

## Testes automatizados
```bash
cd infra/main
tofu init -backend=false
tofu test
```
Validam: bucket privado e versionado, redirect para HTTPS, TLS 1.2, `PriceClass_All`, HSTS ≥ 1 ano, OAC assinando requisições, certificado cobrindo o `www`, cenário sem `www` e rejeição de domínio inválido.

> Os arquivos usam a extensão `.tf` e o bloco `terraform {}`, que o OpenTofu lê normalmente.
> Os nomes `terraform.tfvars` e `terraform.tfstate` também são os padrões do OpenTofu.

## Opcional: criptografia do state (recurso exclusivo do OpenTofu)
O OpenTofu pode criptografar o state no cliente antes de enviá-lo ao S3. Exemplo com chave do **AWS KMS** (~US$ 1/mês), em `infra/main/versions.tf`, dentro do bloco `terraform {}`:

```hcl
encryption {
  key_provider "aws_kms" "state" {
    kms_key_id = "arn:aws:kms:sa-east-1:123456789012:key/SUA-CHAVE"
    region     = "sa-east-1"
    key_spec   = "AES_256"
  }
  method "aes_gcm" "state" {
    keys = key_provider.aws_kms.state
  }
  state {
    method = method.aes_gcm.state
  }
  plan {
    method = method.aes_gcm.state
  }
}
```
A role do pipeline precisa de `kms:Encrypt`, `kms:Decrypt` e `kms:GenerateDataKey` nessa chave. Para migrar um state já existente sem criptografia, siga <https://opentofu.org/docs/language/state/encryption/>.

## Custo estimado
| Item | Mensal | Anual |
|---|---|---|
| Route 53 (1 zona) | US$ 0,50 | US$ 6 |
| CloudFront (free tier: 1 TB e 10 milhões de requisições/mês) | US$ 0 | US$ 0 |
| S3 (< 5 MB + versões) | centavos | centavos |
| ACM | US$ 0 | US$ 0 |
| Domínio .com.br (Registro.br) | | R$ 40 |

## Comandos úteis
```bash
# Rollback de um arquivo
aws s3api list-object-versions --bucket <SITE_BUCKET> --prefix index.html
aws s3api copy-object --bucket <SITE_BUCKET> --key index.html \
  --copy-source "<SITE_BUCKET>/index.html?versionId=<ID>"

# Invalidar cache manualmente
aws cloudfront create-invalidation --distribution-id <ID> --paths "/*"
```

## Destruir
O bucket do site tem `force_destroy = false`. Para remover tudo, esvazie o bucket (incluindo versões) e rode `tofu destroy` em `infra/main`. O bucket de state do bootstrap tem `prevent_destroy`.



