/* =========================================================
   i18n · PT (padrão) / EN / ES
   - Textos estáticos: dicionário abaixo, indexado pelo texto em português.
   - Textos dinâmicos (main.js): objetos { pt, en, es } via I18N.L().
   - Idioma: ?lang=xx  >  escolha salva  >  idioma do navegador  >  pt
   ========================================================= */
(() => {
  "use strict";
  const LANGS = ["pt", "en", "es"];
  const HTML_LANG = { pt: "pt-BR", en: "en", es: "es" };
  const OG_LOCALE = { pt: "pt_BR", en: "en_US", es: "es_ES" };
  const KEY = "ao-lang";

  const DICT = {
  "Resultados": {
    "en": "Results",
    "es": "Resultados"
  },
  "Migrações": {
    "en": "Migrations",
    "es": "Migraciones"
  },
  "Como lidero": {
    "en": "How I lead",
    "es": "Cómo lidero"
  },
  "Trajetória": {
    "en": "Career",
    "es": "Trayectoria"
  },
  "IA aplicada": {
    "en": "Applied AI",
    "es": "IA aplicada"
  },
  "Competências": {
    "en": "Skills",
    "es": "Competencias"
  },
  "Em resumo": {
    "en": "At a glance",
    "es": "En resumen"
  },
  "Vamos conversar": {
    "en": "Let's talk",
    "es": "Hablemos"
  },
  "Plataformas <em>confiáveis</em> em escala.": {
    "en": "Platforms you can <em>trust</em>, at scale.",
    "es": "Plataformas <em>confiables</em> a escala."
  },
  "Há mais de 20 anos levo confiabilidade a empresas, órgãos de governo e à iniciativa privada, do datacenter on-premises ao multi-cloud. Sua operação fica estável, transparente, ágil e com o custo certo.": {
    "en": "For more than 20 years I have been bringing reliability to companies, government agencies and the private sector, from on-premises datacenters to multi-cloud. Your operation becomes stable, transparent, agile and cost-efficient.",
    "es": "Desde hace más de 20 años llevo confiabilidad a empresas, organismos de gobierno y al sector privado, del datacenter on-premises al multi-cloud. Tu operación se vuelve estable, transparente, ágil y con el costo adecuado."
  },
  "Estável": {
    "en": "Stable",
    "es": "Estable"
  },
  "SLOs claros e agentes de IA que detectam e diagnosticam problemas antes que seus clientes percebam.": {
    "en": "Clear SLOs and AI agents that detect and diagnose issues before your customers notice.",
    "es": "SLOs claros y agentes de IA que detectan y diagnostican problemas antes de que tus clientes lo noten."
  },
  "Transparente": {
    "en": "Transparent",
    "es": "Transparente"
  },
  "Rastreabilidade de ponta a ponta: você sabe o que aconteceu, por que aconteceu e o que já está sendo feito.": {
    "en": "End-to-end traceability: you know what happened, why it happened and what is already being done.",
    "es": "Trazabilidad de punta a punta: sabes qué pasó, por qué pasó y qué se está haciendo al respecto."
  },
  "Ágil e segura": {
    "en": "Agile and secure",
    "es": "Ágil y segura"
  },
  "Infraestrutura como código: provisionamento automatizado, versionado e auditável, com segurança integrada ao pipeline (DevSecOps) e arquitetura pronta para escalar com o negócio.": {
    "en": "Infrastructure as code: automated, versioned and auditable provisioning, with security built into the pipeline (DevSecOps) and an architecture ready to scale with the business.",
    "es": "Infraestructura como código: aprovisionamiento automatizado, versionado y auditable, con seguridad integrada al pipeline (DevSecOps) y una arquitectura lista para escalar con el negocio."
  },
  "Custo sob controle": {
    "en": "Cost under control",
    "es": "Costo bajo control"
  },
  "Escala com eficiência, não com desperdício: identifico os gargalos reais, dimensiono cada recurso na medida certa e elimino gastos que não geram valor.": {
    "en": "Scale with efficiency, not waste: I find the real bottlenecks, right-size every resource and cut spending that does not create value.",
    "es": "Escalar con eficiencia, no con desperdicio: identifico los cuellos de botella reales, dimensiono cada recurso a la medida y elimino gastos que no generan valor."
  },
  "Entrar em contato": {
    "en": "Get in touch",
    "es": "Contactar"
  },
  "Currículo (PDF)": {
    "en": "Resume (PDF, Portuguese)",
    "es": "Currículum (PDF, en portugués)"
  },
  "anos em infraestrutura": {
    "en": "years in infrastructure",
    "es": "años en infraestructura"
  },
  "cenários de migração": {
    "en": "migration scenarios",
    "es": "escenarios de migración"
  },
  "clouds: AWS · Azure · GCP": {
    "es": "nubes: AWS · Azure · GCP"
  },
  "certificações": {
    "en": "certifications",
    "es": "certificaciones"
  },
  "O que muda nas plataformas em que atuo": {
    "en": "What changes in the platforms I work on",
    "es": "Qué cambia en las plataformas en las que trabajo"
  },
  "Entregas concretas, do provisionamento à confiabilidade em produção.": {
    "en": "Concrete deliverables, from provisioning to reliability in production.",
    "es": "Entregas concretas, del aprovisionamiento a la confiabilidad en producción."
  },
  "On-premises → multi-cloud, sem parar a operação": {
    "en": "On-premises → multi-cloud, without stopping operations",
    "es": "On-premises → multi-cloud, sin detener la operación"
  },
  "GKE → EKS, OpenShift on-premises → Azure AKS, ECS → EKS, VMs e middleware → containers. Cada migração com plano de rollback, validação automatizada e cutover controlado.": {
    "en": "GKE → EKS, on-premises OpenShift → Azure AKS, ECS → EKS, VMs and middleware → containers. Every migration with a rollback plan, automated validation and a controlled cutover.",
    "es": "GKE → EKS, OpenShift on-premises → Azure AKS, ECS → EKS, VMs y middleware → contenedores. Cada migración con plan de rollback, validación automatizada y cutover controlado."
  },
  "Confiabilidade medida, não percebida": {
    "en": "Reliability that is measured, not assumed",
    "es": "Confiabilidad medida, no percibida"
  },
  "Definição e acompanhamento de SLIs, SLOs e SLAs para disponibilidade, latência, taxa de erros e qualidade dos serviços.": {
    "en": "Defining and tracking SLIs, SLOs and SLAs for availability, latency, error rate and service quality.",
    "es": "Definición y seguimiento de SLIs, SLOs y SLAs para disponibilidad, latencia, tasa de errores y calidad de los servicios."
  },
  "Cactus Gaming · 2025–atual": {
    "en": "Cactus Gaming · 2025–present",
    "es": "Cactus Gaming · 2025–actual"
  },
  "Deploy declarativo de microsserviços": {
    "en": "Declarative microservice deployments",
    "es": "Despliegue declarativo de microservicios"
  },
  "FluxCD e ArgoCD para gestão declarativa e automação de deployments, com estratégias Canary e Rolling Update.": {
    "en": "FluxCD and ArgoCD for declarative management and deployment automation, with Canary and Rolling Update strategies.",
    "es": "FluxCD y ArgoCD para la gestión declarativa y la automatización de despliegues, con estrategias Canary y Rolling Update."
  },
  "Developer Experience com Backstage": {
    "en": "Developer Experience with Backstage",
    "es": "Developer Experience con Backstage"
  },
  "Templates Helm e pipelines padronizados que aceleram o onboarding e o deploy de aplicações pelos times.": {
    "en": "Helm templates and standardized pipelines that speed up onboarding and application deployment for every team.",
    "es": "Templates Helm y pipelines estandarizados que aceleran el onboarding y el despliegue de aplicaciones de los equipos."
  },
  "Custo otimizado sem perder performance": {
    "en": "Optimized cost without losing performance",
    "es": "Costo optimizado sin perder rendimiento"
  },
  "Identificação de desperdícios e rightsizing de recursos AWS, preservando escalabilidade e disponibilidade.": {
    "en": "Identifying waste and rightsizing AWS resources while preserving scalability and availability.",
    "es": "Identificación de desperdicios y rightsizing de recursos de AWS, preservando escalabilidad y disponibilidad."
  },
  "Acesso unificado na plataforma": {
    "en": "Unified access across the platform",
    "es": "Acceso unificado en la plataforma"
  },
  "Integração de SSO com Okta e Google nos componentes da plataforma, fortalecendo segurança e experiência de autenticação.": {
    "en": "SSO integration with Okta and Google across platform components, strengthening security and the sign-in experience.",
    "es": "Integración de SSO con Okta y Google en los componentes de la plataforma, fortaleciendo la seguridad y la experiencia de autenticación."
  },
  "Diagnóstico de anomalias com agentes": {
    "en": "Anomaly diagnosis with agents",
    "es": "Diagnóstico de anomalías con agentes"
  },
  "Agentes de IA com MCP Kubernetes e MCP Prometheus em modo somente leitura para correlacionar eventos, métricas e logs e sugerir causa raiz.": {
    "en": "AI agents with the Kubernetes MCP and Prometheus MCP in read-only mode to correlate events, metrics and logs and suggest root causes.",
    "es": "Agentes de IA con MCP Kubernetes y MCP Prometheus en modo solo lectura para correlacionar eventos, métricas y logs y sugerir la causa raíz."
  },
  "Principais projetos": {
    "en": "Key projects",
    "es": "Proyectos principales"
  },
  "Migrações que <em>não</em> param o negócio": {
    "en": "Migrations that <em>don't</em> stop the business",
    "es": "Migraciones que <em>no</em> detienen el negocio"
  },
  "Desafio, solução e resultado. Do datacenter on-premises ao Kubernetes gerenciado em AWS, Azure e GCP.": {
    "en": "Challenge, solution and result. From on-premises datacenters to managed Kubernetes on AWS, Azure and GCP.",
    "es": "Desafío, solución y resultado. Del datacenter on-premises a Kubernetes gestionado en AWS, Azure y GCP."
  },
  "Fazendo a infraestrutura <em>crescer</em> junto com o negócio": {
    "en": "Helping infrastructure <em>grow</em> with the business",
    "es": "Haciendo que la infraestructura <em>crezca</em> junto con el negocio"
  },
  "Atuo no crescimento de ambientes de infraestrutura no mundo corporativo, em órgãos de governo e na iniciativa privada: de servidores de aplicação e middleware a plataformas cloud-native com GitOps, observabilidade e IA. Tecnologia é ponto de partida; o objetivo é um ambiente que o time consiga operar, evoluir e no qual possa confiar.": {
    "en": "I help infrastructure environments grow in the corporate world, government agencies and the private sector: from application servers and middleware to cloud-native platforms with GitOps, observability and AI. Technology is the starting point; the goal is an environment the team can operate, evolve and trust.",
    "es": "Contribuyo al crecimiento de entornos de infraestructura en el mundo corporativo, en organismos de gobierno y en el sector privado: de servidores de aplicaciones y middleware a plataformas cloud-native con GitOps, observabilidad e IA. La tecnología es el punto de partida; el objetivo es un entorno que el equipo pueda operar, evolucionar y en el que pueda confiar."
  },
  "Governo": {
    "en": "Government",
    "es": "Gobierno"
  },
  "Ambientes críticos e regulados": {
    "en": "Critical and regulated environments",
    "es": "Entornos críticos y regulados"
  },
  "Alta disponibilidade, API Gateway, proxy reverso, certificados e middleware (JBoss, Tomcat, Apache, Nginx) em ambientes que não podem parar.": {
    "en": "High availability, API Gateway, reverse proxy, certificates and middleware (JBoss, Tomcat, Apache, Nginx) in environments that cannot go down.",
    "es": "Alta disponibilidad, API Gateway, proxy inverso, certificados y middleware (JBoss, Tomcat, Apache, Nginx) en entornos que no pueden detenerse."
  },
  "Corporativo": {
    "en": "Corporate"
  },
  "Padronização que escala": {
    "en": "Standardization that scales",
    "es": "Estandarización que escala"
  },
  "Pipelines CI/CD, IaC e templates reutilizáveis para que dezenas de squads entreguem do mesmo jeito, com qualidade e segurança.": {
    "en": "CI/CD pipelines, IaC and reusable templates so dozens of squads deliver the same way, with quality and security.",
    "es": "Pipelines CI/CD, IaC y templates reutilizables para que decenas de squads entreguen de la misma forma, con calidad y seguridad."
  },
  "Privado": {
    "en": "Private sector",
    "es": "Sector privado"
  },
  "Cloud-native e FinOps": {
    "en": "Cloud-native and FinOps",
    "es": "Cloud-native y FinOps"
  },
  "Kubernetes em AWS, Azure e GCP com custo sob controle, autoscaling inteligente e decisões baseadas em métricas.": {
    "en": "Kubernetes on AWS, Azure and GCP with cost under control, smart autoscaling and metrics-driven decisions.",
    "es": "Kubernetes en AWS, Azure y GCP con costo bajo control, autoscaling inteligente y decisiones basadas en métricas."
  },
  "Pessoas → resultado": {
    "en": "People → results",
    "es": "Personas → resultados"
  },
  "Times que operam com autonomia": {
    "en": "Teams that operate autonomously",
    "es": "Equipos que operan con autonomía"
  },
  "Apoio às squads de desenvolvimento, documentação viva, runbooks e cultura de postmortem sem culpados.": {
    "en": "Supporting development squads, living documentation, runbooks and a blameless postmortem culture.",
    "es": "Apoyo a los squads de desarrollo, documentación viva, runbooks y cultura de postmortem sin culpables."
  },
  "“Confiabilidade é desenhar a plataforma para que o time durma tranquilo, sabendo que o alerta certo vai tocar antes do cliente perceber.”": {
    "en": "“Reliability is designing the platform so the team can sleep well, knowing the right alert will fire before the customer notices.”",
    "es": "“La confiabilidad es diseñar la plataforma para que el equipo duerma tranquilo, sabiendo que la alerta correcta sonará antes de que el cliente lo note.”"
  },
  "Evolução da plataforma · 2005 → 2026": {
    "en": "Platform evolution · 2005 → 2026",
    "es": "Evolución de la plataforma · 2005 → 2026"
  },
  "← Anterior": {
    "en": "← Previous"
  },
  "Próximo →": {
    "en": "Next →",
    "es": "Siguiente →"
  },
  "Cada etapa adicionou uma camada sobre a anterior; nada foi descartado, tudo foi automatizado.": {
    "en": "Each stage added a layer on top of the previous one; nothing was discarded, everything was automated.",
    "es": "Cada etapa agregó una capa sobre la anterior; nada se descartó, todo se automatizó."
  },
  "20+ anos: do datacenter à engenharia de plataforma": {
    "en": "20+ years: from the datacenter to platform engineering",
    "es": "Más de 20 años: del datacenter a la ingeniería de plataformas"
  },
  "Cada passo somou uma camada: middleware, containers, cloud, GitOps, SRE e IA.": {
    "en": "Each step added a layer: middleware, containers, cloud, GitOps, SRE and AI.",
    "es": "Cada paso sumó una capa: middleware, contenedores, cloud, GitOps, SRE e IA."
  },
  "jun 2025 – atual": {
    "en": "Jun 2025 – present",
    "es": "jun 2025 – actual"
  },
  "Atual": {
    "en": "Current",
    "es": "Actual"
  },
  "SLIs, SLOs e SLAs para disponibilidade, latência, taxa de erros e qualidade dos serviços.": {
    "en": "SLIs, SLOs and SLAs for availability, latency, error rate and service quality.",
    "es": "SLIs, SLOs y SLAs para disponibilidad, latencia, tasa de errores y calidad de los servicios."
  },
  "Monitoramento, logging e alertas proativos com Prometheus, Grafana, Alertmanager, OpenSearch, Kibana e New Relic.": {
    "en": "Proactive monitoring, logging and alerting with Prometheus, Grafana, Alertmanager, OpenSearch, Kibana and New Relic.",
    "es": "Monitoreo, logging y alertas proactivas con Prometheus, Grafana, Alertmanager, OpenSearch, Kibana y New Relic."
  },
  "Agentes de IA para análise de anomalias em Kubernetes/EKS com skills e prompts de diagnóstico SRE, integrando MCP Kubernetes e MCP Prometheus em modo somente leitura.": {
    "en": "AI agents for anomaly analysis on Kubernetes/EKS with SRE diagnostic skills and prompts, integrating the Kubernetes MCP and Prometheus MCP in read-only mode.",
    "es": "Agentes de IA para el análisis de anomalías en Kubernetes/EKS con skills y prompts de diagnóstico SRE, integrando MCP Kubernetes y MCP Prometheus en modo solo lectura."
  },
  "Liderou a migração de infraestrutura GKE → EKS: reescrita da IaC em Terraform/OpenTofu/Terragrunt, espelhamento de imagens para o ECR, troca de Workload Identity por IRSA/Pod Identity e cutover gradual por DNS (Route 53) com rollback planejado.": {
    "en": "Led the GKE → EKS infrastructure migration: IaC rewritten in Terraform/OpenTofu/Terragrunt, images mirrored to ECR, Workload Identity replaced by IRSA/Pod Identity and a gradual DNS cutover (Route 53) with a planned rollback.",
    "es": "Lideró la migración de infraestructura GKE → EKS: IaC reescrita en Terraform/OpenTofu/Terragrunt, imágenes replicadas en ECR, Workload Identity sustituido por IRSA/Pod Identity y cutover gradual por DNS (Route 53) con rollback planificado."
  },
  "Evolução do EKS com Karpenter e EKS Auto Mode, com foco em escalabilidade e custo.": {
    "en": "Evolved EKS with Karpenter and EKS Auto Mode, focusing on scalability and cost.",
    "es": "Evolución de EKS con Karpenter y EKS Auto Mode, con foco en escalabilidad y costo."
  },
  "CI/CD com GitHub Actions; GitOps com FluxCD e ArgoCD; SSO com Okta e Google.": {
    "en": "CI/CD with GitHub Actions; GitOps with FluxCD and ArgoCD; SSO with Okta and Google.",
    "es": "CI/CD con GitHub Actions; GitOps con FluxCD y ArgoCD; SSO con Okta y Google."
  },
  "Platform Engineering com Backstage e templates Helm; IaC com Terraform, OpenTofu e Terragrunt em AWS e GCP.": {
    "en": "Platform Engineering with Backstage and Helm templates; IaC with Terraform, OpenTofu and Terragrunt on AWS and GCP.",
    "es": "Platform Engineering con Backstage y templates Helm; IaC con Terraform, OpenTofu y Terragrunt en AWS y GCP."
  },
  "FinOps na AWS e contato com Power BI e Databricks em iniciativas de LLM e MLOps.": {
    "en": "FinOps on AWS and hands-on exposure to Power BI and Databricks in LLM and MLOps initiatives.",
    "es": "FinOps en AWS y contacto con Power BI y Databricks en iniciativas de LLM y MLOps."
  },
  "nov 2021 – mai 2025": {
    "en": "Nov 2021 – May 2025",
    "es": "nov 2021 – may 2025"
  },
  "Migração de workloads de ECS/EC2 para Amazon EKS, padronizando deploy com Helm e ArgoCD e autoscaling com Karpenter e Cast AI.": {
    "en": "Migrated workloads from ECS/EC2 to Amazon EKS, standardizing deployments with Helm and ArgoCD and autoscaling with Karpenter and Cast AI.",
    "es": "Migración de workloads de ECS/EC2 a Amazon EKS, estandarizando el despliegue con Helm y ArgoCD y el autoscaling con Karpenter y Cast AI."
  },
  "Transição de pipelines Jenkins para GitLab CI e GitHub Actions, com segurança integrada (Snyk, Trivy, Veracode).": {
    "en": "Moved Jenkins pipelines to GitLab CI and GitHub Actions, with built-in security (Snyk, Trivy, Veracode).",
    "es": "Transición de pipelines de Jenkins a GitLab CI y GitHub Actions, con seguridad integrada (Snyk, Trivy, Veracode)."
  },
  "Plataformas AWS e Kubernetes/EKS com Karpenter, EKS Auto Mode e Cast AI.": {
    "en": "AWS and Kubernetes/EKS platforms with Karpenter, EKS Auto Mode and Cast AI.",
    "es": "Plataformas AWS y Kubernetes/EKS con Karpenter, EKS Auto Mode y Cast AI."
  },
  "Pipelines CI/CD end-to-end com GitLab CI, GitHub Actions e Jenkins; GitOps com ArgoCD.": {
    "en": "End-to-end CI/CD pipelines with GitLab CI, GitHub Actions and Jenkins; GitOps with ArgoCD.",
    "es": "Pipelines CI/CD end-to-end con GitLab CI, GitHub Actions y Jenkins; GitOps con ArgoCD."
  },
  "IaC com Terraform e CloudFormation; observabilidade com New Relic, Elasticsearch, Kibana, Prometheus.": {
    "en": "IaC with Terraform and CloudFormation; observability with New Relic, Elasticsearch, Kibana, Prometheus.",
    "es": "IaC con Terraform y CloudFormation; observabilidad con New Relic, Elasticsearch, Kibana, Prometheus."
  },
  "Suporte às squads com deploys Canary e Rolling Update.": {
    "en": "Supported squads with Canary and Rolling Update deployments.",
    "es": "Soporte a los squads con despliegues Canary y Rolling Update."
  },
  "abr 2020 – nov 2021": {
    "en": "Apr 2020 – Nov 2021"
  },
  "Analista DevOps <span>· META</span>": {
    "en": "DevOps Analyst <span>· META</span>"
  },
  "Liderou a estratégia de migração cloud-native de sistemas críticos de um ambiente <strong>OpenShift on-premises para o Azure AKS</strong>.": {
    "en": "Led the cloud-native migration strategy for critical systems from an <strong>on-premises OpenShift environment to Azure AKS</strong>.",
    "es": "Lideró la estrategia de migración cloud-native de sistemas críticos desde un entorno <strong>OpenShift on-premises a Azure AKS</strong>."
  },
  "Conversão de manifestos OpenShift (Routes, DeploymentConfigs, ImageStreams) para padrões Kubernetes (Ingress, Deployments), com Velero para volumes e Skopeo para sincronização de imagens no ACR.": {
    "en": "Converted OpenShift manifests (Routes, DeploymentConfigs, ImageStreams) to Kubernetes standards (Ingress, Deployments), with Velero for volumes and Skopeo to sync images to ACR.",
    "es": "Conversión de manifiestos OpenShift (Routes, DeploymentConfigs, ImageStreams) a estándares de Kubernetes (Ingress, Deployments), con Velero para volúmenes y Skopeo para sincronizar imágenes en ACR."
  },
  "Substituição do OpenShift S2I por pipelines no GitHub Actions e Azure DevOps integrados ao ACR; GitOps com ArgoCD e autoscaling com KEDA.": {
    "en": "Replaced OpenShift S2I with GitHub Actions and Azure DevOps pipelines integrated with ACR; GitOps with ArgoCD and autoscaling with KEDA.",
    "es": "Sustitución de OpenShift S2I por pipelines en GitHub Actions y Azure DevOps integrados con ACR; GitOps con ArgoCD y autoscaling con KEDA."
  },
  "Governança de segurança no AKS trocando SCCs por Azure Policy para Kubernetes e Kubewarden; bancos em contêiner migrados para Azure SQL e Cosmos DB.": {
    "en": "Security governance on AKS, replacing SCCs with Azure Policy for Kubernetes and Kubewarden; containerized databases migrated to Azure SQL and Cosmos DB.",
    "es": "Gobernanza de seguridad en AKS, reemplazando SCCs por Azure Policy para Kubernetes y Kubewarden; bases de datos en contenedores migradas a Azure SQL y Cosmos DB."
  },
  "Migração de projetos para Azure DevOps; containers com Rancher, AKS e OKD/OpenShift.": {
    "en": "Migrated projects to Azure DevOps; containers with Rancher, AKS and OKD/OpenShift.",
    "es": "Migración de proyectos a Azure DevOps; contenedores con Rancher, AKS y OKD/OpenShift."
  },
  "Terraform e serviços Azure: Key Vault, App Service, API Management, Cosmos DB, CDN.": {
    "en": "Terraform and Azure services: Key Vault, App Service, API Management, Cosmos DB, CDN.",
    "es": "Terraform y servicios de Azure: Key Vault, App Service, API Management, Cosmos DB, CDN."
  },
  "mar 2020 – abr 2021": {
    "en": "Mar 2020 – Apr 2021"
  },
  "Analista de Infraestrutura Sênior <span>· RPerformanceGroup</span>": {
    "en": "Senior Infrastructure Analyst <span>· RPerformanceGroup</span>",
    "es": "Analista de Infraestructura Sénior <span>· RPerformanceGroup</span>"
  },
  "Sustentação de aplicações críticas em JBoss EAP e OpenShift/OKD, apoiando a migração de aplicações Java de servidores tradicionais para containers no OKD.": {
    "en": "Supported critical applications on JBoss EAP and OpenShift/OKD, helping migrate Java applications from traditional servers to containers on OKD.",
    "es": "Soporte de aplicaciones críticas en JBoss EAP y OpenShift/OKD, apoyando la migración de aplicaciones Java de servidores tradicionales a contenedores en OKD."
  },
  "Observabilidade com ELK, Grafana, Graylog e Zabbix; CI/CD com Jenkins, Maven, SonarQube e Nexus.": {
    "en": "Observability with ELK, Grafana, Graylog and Zabbix; CI/CD with Jenkins, Maven, SonarQube and Nexus.",
    "es": "Observabilidad con ELK, Grafana, Graylog y Zabbix; CI/CD con Jenkins, Maven, SonarQube y Nexus."
  },
  "mar 2016 – mai 2020": {
    "en": "Mar 2016 – May 2020",
    "es": "mar 2016 – may 2020"
  },
  "Especialista em Infraestrutura <span>· GlobalWeb</span>": {
    "en": "Infrastructure Specialist <span>· GlobalWeb</span>",
    "es": "Especialista en Infraestructura <span>· GlobalWeb</span>"
  },
  "Middleware e web: JBoss EAP, Tomcat, Apache, Nginx; Kong API Gateway e ambientes de alta disponibilidade.": {
    "en": "Middleware and web: JBoss EAP, Tomcat, Apache, Nginx; Kong API Gateway and high-availability environments.",
    "es": "Middleware y web: JBoss EAP, Tomcat, Apache, Nginx; Kong API Gateway y entornos de alta disponibilidad."
  },
  "Migração de aplicações de VMs e middleware tradicional para containers, evoluindo de Docker Swarm para Kubernetes com Rancher.": {
    "en": "Migrated applications from VMs and traditional middleware to containers, evolving from Docker Swarm to Kubernetes with Rancher.",
    "es": "Migración de aplicaciones de VMs y middleware tradicional a contenedores, evolucionando de Docker Swarm a Kubernetes con Rancher."
  },
  "Modernização do monitoramento de Nagios/Centreon para Zabbix, Graylog e Grafana; automação com Jenkins, Rundeck e Ansible AWX.": {
    "en": "Modernized monitoring from Nagios/Centreon to Zabbix, Graylog and Grafana; automation with Jenkins, Rundeck and Ansible AWX.",
    "es": "Modernización del monitoreo de Nagios/Centreon a Zabbix, Graylog y Grafana; automatización con Jenkins, Rundeck y Ansible AWX."
  },
  "Observabilidade com Graylog, Zabbix, Grafana, Nagios, Centreon e Check_MK.": {
    "en": "Observability with Graylog, Zabbix, Grafana, Nagios, Centreon and Check_MK.",
    "es": "Observabilidad con Graylog, Zabbix, Grafana, Nagios, Centreon y Check_MK."
  },
  "Alta disponibilidade": {
    "en": "High availability",
    "es": "Alta disponibilidad"
  },
  "Antes <span>· mais de 10 anos de base em Linux, datacenter e middleware</span>": {
    "en": "Earlier <span>· 10+ years of foundation in Linux, datacenter and middleware</span>",
    "es": "Antes <span>· más de 10 años de base en Linux, datacenter y middleware</span>"
  },
  "<strong>Início de carreira</strong> · suporte, redes, servidores Linux/Windows e datacenter": {
    "en": "<strong>Early career</strong> · support, networking, Linux/Windows servers and datacenter",
    "es": "<strong>Inicio de carrera</strong> · soporte, redes, servidores Linux/Windows y datacenter"
  },
  "<strong>Stefanini</strong> · Analista de Infraestrutura (2015–2016) · Zimbra, McAfee Email Gateway, Zabbix": {
    "en": "<strong>Stefanini</strong> · Infrastructure Analyst (2015–2016) · Zimbra, McAfee Email Gateway, Zabbix",
    "es": "<strong>Stefanini</strong> · Analista de Infraestructura (2015–2016) · Zimbra, McAfee Email Gateway, Zabbix"
  },
  "<strong>Bktech</strong> · Analista de Suporte Linux Sênior (2014–2015) · SUSE, HAProxy, Heartbeat, clustering": {
    "en": "<strong>Bktech</strong> · Senior Linux Support Analyst (2014–2015) · SUSE, HAProxy, Heartbeat, clustering",
    "es": "<strong>Bktech</strong> · Analista de Soporte Linux Sénior (2014–2015) · SUSE, HAProxy, Heartbeat, clustering"
  },
  "<strong>CPD Informática</strong> · Analista de Aplicação Sênior (2013–2014) · Tomcat, JBoss, Varnish, WebLogic, FortiWeb": {
    "en": "<strong>CPD Informática</strong> · Senior Application Analyst (2013–2014) · Tomcat, JBoss, Varnish, WebLogic, FortiWeb",
    "es": "<strong>CPD Informática</strong> · Analista de Aplicaciones Sénior (2013–2014) · Tomcat, JBoss, Varnish, WebLogic, FortiWeb"
  },
  "Agentes de IA a serviço da <em>confiabilidade</em>": {
    "en": "AI agents in service of <em>reliability</em>",
    "es": "Agentes de IA al servicio de la <em>confiabilidad</em>"
  },
  "Aplico IA como aplico qualquer ferramenta de plataforma: com escopo, permissões mínimas e métricas. Pós-graduado em Inteligência Artificial, uso agentes, skills e MCPs no dia a dia de Kubernetes e de testes automatizados.": {
    "en": "I apply AI the way I apply any platform tool: with clear scope, least privilege and metrics. With a postgraduate degree in Artificial Intelligence, I use agents, skills and MCPs every day for Kubernetes and automated testing.",
    "es": "Aplico la IA como cualquier herramienta de plataforma: con alcance definido, permisos mínimos y métricas. Con un posgrado en Inteligencia Artificial, uso agentes, skills y MCPs en el día a día de Kubernetes y de las pruebas automatizadas."
  },
  "Agentes com skills de diagnóstico SRE integrados ao <strong>MCP Kubernetes</strong> e ao <strong>MCP Prometheus</strong> para correlacionar eventos, logs, métricas e saúde de pods/nodes, apontando possíveis causas raiz em EKS.": {
    "en": "Agents with SRE diagnostic skills integrated with the <strong>Kubernetes MCP</strong> and the <strong>Prometheus MCP</strong> to correlate events, logs, metrics and pod/node health, pointing to likely root causes on EKS.",
    "es": "Agentes con skills de diagnóstico SRE integrados al <strong>MCP Kubernetes</strong> y al <strong>MCP Prometheus</strong> para correlacionar eventos, logs, métricas y salud de pods/nodes, señalando posibles causas raíz en EKS."
  },
  "Testes automatizados": {
    "en": "Automated testing",
    "es": "Pruebas automatizadas"
  },
  "Agentes que geram e revisam testes de infraestrutura e pipelines: validação de manifestos e Helm charts, <code>terraform plan</code>/testes de IaC, checagens de segurança (Trivy, Snyk) e gates de qualidade no CI/CD.": {
    "en": "Agents that generate and review infrastructure and pipeline tests: manifest and Helm chart validation, <code>terraform plan</code>/IaC tests, security checks (Trivy, Snyk) and quality gates in CI/CD.",
    "es": "Agentes que generan y revisan pruebas de infraestructura y pipelines: validación de manifiestos y Helm charts, <code>terraform plan</code>/pruebas de IaC, controles de seguridad (Trivy, Snyk) y quality gates en CI/CD."
  },
  "Soluções": {
    "en": "Solutions",
    "es": "Soluciones"
  },
  "Skills, agents e MCPs reutilizáveis; prompts especializados por domínio (incidente, capacidade, custo); workflows assíncronos integrados a observabilidade, Git e comunicação.": {
    "en": "Reusable skills, agents and MCPs; domain-specific prompts (incident, capacity, cost); asynchronous workflows integrated with observability, Git and communication tools.",
    "es": "Skills, agents y MCPs reutilizables; prompts especializados por dominio (incidente, capacidad, costo); workflows asíncronos integrados con observabilidad, Git y comunicación."
  },
  "Governança": {
    "en": "Governance",
    "es": "Gobernanza"
  },
  "MCPs em modo <strong>somente leitura</strong> em produção, princípio do menor privilégio, revisão humana antes de qualquer mudança e trilha de auditoria.": {
    "en": "MCPs in <strong>read-only</strong> mode in production, least privilege, human review before any change and a full audit trail.",
    "es": "MCPs en modo <strong>solo lectura</strong> en producción, principio de mínimo privilegio, revisión humana antes de cualquier cambio y registro de auditoría."
  },
  "Método": {
    "en": "Method"
  },
  "Spec-Driven Development, regras e contexto por repositório, loops de feedback e iteração; o agente propõe, o pipeline valida, a pessoa aprova.": {
    "en": "Spec-Driven Development, per-repository rules and context, feedback loops and iteration; the agent proposes, the pipeline validates, a human approves.",
    "es": "Spec-Driven Development, reglas y contexto por repositorio, ciclos de feedback e iteración; el agente propone, el pipeline valida, la persona aprueba."
  },
  "Ferramentas": {
    "en": "Tools",
    "es": "Herramientas"
  },
  "<span>1</span>Alerta<small>Alertmanager</small>": {
    "en": "<span>1</span>Alert<small>Alertmanager</small>"
  },
  "<span>2</span>Agente + Skill SRE<small>Claude Code / Codex</small>": {
    "en": "<span>2</span>Agent + SRE skill<small>Claude Code / Codex</small>",
    "es": "<span>2</span>Agente + skill SRE<small>Claude Code / Codex</small>"
  },
  "<span>3</span>MCPs read-only<small>Kubernetes · Prometheus</small>": {
    "en": "<span>3</span>Read-only MCPs<small>Kubernetes · Prometheus</small>",
    "es": "<span>3</span>MCPs de solo lectura<small>Kubernetes · Prometheus</small>"
  },
  "<span>4</span>Hipótese de causa raiz<small>evidências + runbook</small>": {
    "en": "<span>4</span>Root-cause hypothesis<small>evidence + runbook</small>",
    "es": "<span>4</span>Hipótesis de causa raíz<small>evidencias + runbook</small>"
  },
  "<span>5</span>Correção via GitOps<small>PR · testes · aprovação</small>": {
    "en": "<span>5</span>Fix via GitOps<small>PR · tests · approval</small>",
    "es": "<span>5</span>Corrección vía GitOps<small>PR · pruebas · aprobación</small>"
  },
  "Stack de plataforma": {
    "en": "Platform stack"
  },
  "Formação &amp; certificações": {
    "en": "Education &amp; certifications",
    "es": "Formación &amp; certificaciones"
  },
  "Base sólida, sempre atualizada": {
    "en": "A solid foundation, always up to date",
    "es": "Base sólida, siempre actualizada"
  },
  "Pós-graduação · 2024": {
    "en": "Postgraduate · 2024",
    "es": "Posgrado · 2024"
  },
  "Inteligência Artificial": {
    "en": "Artificial Intelligence",
    "es": "Inteligencia Artificial"
  },
  "Bacharelado · 2010–2013": {
    "en": "Bachelor's degree · 2010–2013",
    "es": "Licenciatura · 2010–2013"
  },
  "Sistemas de Informação": {
    "en": "Information Systems",
    "es": "Sistemas de Información"
  },
  "<strong>Cursos:</strong> Kubernetes e Docker (LinuxTips) · OpenShift · Rancher · Jenkins · Python · Microsoft Azure · AWS · Istio · Graylog · FortiWeb · JBoss Administration · Gestão de TI": {
    "en": "<strong>Courses:</strong> Kubernetes and Docker (LinuxTips) · OpenShift · Rancher · Jenkins · Python · Microsoft Azure · AWS · Istio · Graylog · FortiWeb · JBoss Administration · IT Management",
    "es": "<strong>Cursos:</strong> Kubernetes y Docker (LinuxTips) · OpenShift · Rancher · Jenkins · Python · Microsoft Azure · AWS · Istio · Graylog · FortiWeb · JBoss Administration · Gestión de TI"
  },
  "Para recrutadores": {
    "en": "For recruiters",
    "es": "Para reclutadores"
  },
  "Atuação": {
    "en": "Role",
    "es": "Rol"
  },
  "Senior SRE · Engenheiro Sênior de DevOps / Platform Engineering": {
    "en": "Senior SRE · Senior DevOps / Platform Engineer",
    "es": "Senior SRE · Ingeniero Sénior de DevOps / Platform Engineering"
  },
  "Base": {
    "en": "Location",
    "es": "Ubicación"
  },
  "Brasília - DF, Brasil (BRT)": {
    "en": "Brasília - DF, Brazil (BRT)"
  },
  "Modelo": {
    "en": "Work model",
    "es": "Modalidad"
  },
  "Remoto, híbrido ou presencial": {
    "en": "Remote, hybrid or on-site",
    "es": "Remoto, híbrido o presencial"
  },
  "Experiência": {
    "en": "Experience",
    "es": "Experiencia"
  },
  "20+ anos em infraestrutura; ambientes corporativos, de governo e privados; migrações on-premises → cloud e entre clouds": {
    "en": "20+ years in infrastructure; corporate, government and private-sector environments; on-premises → cloud and cloud-to-cloud migrations",
    "es": "Más de 20 años en infraestructura; entornos corporativos, de gobierno y privados; migraciones on-premises → cloud y entre clouds"
  },
  "Onde mais contribuo": {
    "en": "Where I add the most value",
    "es": "Donde más contribuyo"
  },
  "Confiabilidade (SLI/SLO), Kubernetes/EKS, GitOps, IaC, observabilidade, FinOps e IA aplicada à operação": {
    "en": "Reliability (SLI/SLO), Kubernetes/EKS, GitOps, IaC, observability, FinOps and AI applied to operations",
    "es": "Confiabilidad (SLI/SLO), Kubernetes/EKS, GitOps, IaC, observabilidad, FinOps e IA aplicada a la operación"
  },
  "Formação": {
    "en": "Education",
    "es": "Formación"
  },
  "Pós em Inteligência Artificial · Bacharel em Sistemas de Informação": {
    "en": "Postgraduate degree in Artificial Intelligence · Bachelor's in Information Systems",
    "es": "Posgrado en Inteligencia Artificial · Licenciado en Sistemas de Información"
  },
  "Idiomas": {
    "en": "Languages"
  },
  "Português (nativo) · Inglês (avançado)": {
    "en": "Portuguese (native) · English (advanced)",
    "es": "Portugués (nativo) · Inglés (avanzado)"
  },
  "In English": {
    "en": "Summary",
    "es": "En inglés"
  },
  "Contato": {
    "en": "Contact",
    "es": "Contacto"
  },
  "Vamos <em>conversar.</em>": {
    "en": "Let's <em>talk.</em>",
    "es": "<em>Hablemos.</em>"
  },
  "Se você está construindo, migrando ou escalando uma plataforma e precisa de confiabilidade em produção, eu respondo rápido.": {
    "en": "If you are building, migrating or scaling a platform and need reliability in production, I reply fast.",
    "es": "Si estás construyendo, migrando o escalando una plataforma y necesitas confiabilidad en producción, respondo rápido."
  },
  "E-mail": {
    "en": "Email",
    "es": "Correo"
  },
  "Copiar": {
    "en": "Copy"
  },
  "Telefone": {
    "en": "Phone",
    "es": "Teléfono"
  },
  "Chamar no WhatsApp": {
    "en": "Message me on WhatsApp",
    "es": "Escribir por WhatsApp"
  },
  "Abrir currículo (PDF)": {
    "en": "Open resume (PDF, Portuguese)",
    "es": "Abrir currículum (PDF, en portugués)"
  },
  "Anderson Dantas de Oliveira · Senior SRE &amp; Platform Engineer · Brasília, Brasil": {
    "en": "Anderson Dantas de Oliveira · Senior SRE &amp; Platform Engineer · Brasília, Brazil"
  },
  "Voltar ao topo ↑": {
    "en": "Back to top ↑",
    "es": "Volver arriba ↑"
  },
  "Início": {
    "en": "Home",
    "es": "Inicio"
  },
  "Seções": {
    "en": "Sections",
    "es": "Secciones"
  },
  "Alternar tema claro/escuro": {
    "en": "Toggle light/dark theme",
    "es": "Cambiar tema claro/oscuro"
  },
  "Abrir menu": {
    "en": "Open menu",
    "es": "Abrir menú"
  },
  "Foto de Anderson Dantas de Oliveira": {
    "en": "Photo of Anderson Dantas de Oliveira"
  },
  "Projetos de migração": {
    "en": "Migration projects",
    "es": "Proyectos de migración"
  },
  "Marcos da evolução": {
    "en": "Evolution milestones",
    "es": "Hitos de la evolución"
  },
  "Exemplo ilustrativo de diagnóstico com agente": {
    "en": "Illustrative example of an agent-driven diagnosis",
    "es": "Ejemplo ilustrativo de diagnóstico con agente"
  },
  "Reexecutar demonstração": {
    "en": "Replay demo",
    "es": "Repetir demostración"
  },
  "Idioma": {
    "en": "Language"
  },
  "Anderson Dantas de Oliveira, Senior SRE e Engenheiro Sênior de DevOps/Platform. Plataformas confiáveis em escala com Kubernetes, Cloud, GitOps, observabilidade e IA aplicada.": {
    "en": "Anderson Dantas de Oliveira, Senior SRE and Senior DevOps/Platform Engineer. Reliable platforms at scale with Kubernetes, Cloud, GitOps, observability and applied AI.",
    "es": "Anderson Dantas de Oliveira, Senior SRE e Ingeniero Sénior de DevOps/Platform. Plataformas confiables a escala con Kubernetes, Cloud, GitOps, observabilidad e IA aplicada."
  }
};

  const norm = s => s.replace(/\s+/g, " ").trim();
  const SKIP = new Set(["SCRIPT", "STYLE", "SVG", "PRE", "TEMPLATE"]);
  const DYNAMIC = "#skills, #certs, #migTabs, #migPanel, #evoTrack, #evoPanel, #termBody, .lang";

  // 1) Coleta, uma única vez, os elementos estáticos traduzíveis
  const nodes = [];
  (function walk(el) {
    if (SKIP.has(el.tagName) || el.matches(DYNAMIC)) return;
    const direct = [...el.childNodes].some(n => n.nodeType === 3 && /[A-Za-zÀ-ÿ]/.test(n.textContent));
    if (direct) {
      const key = norm(el.innerHTML);
      if (DICT[key]) nodes.push({ el, key, orig: el.innerHTML });
      return;
    }
    [...el.children].forEach(walk);
  })(document.body);

  const attrs = [];
  document.querySelectorAll("[aria-label],[alt],[title]").forEach(el => {
    if (el.closest(DYNAMIC) && !el.matches(".lang")) return;
    ["aria-label", "alt", "title"].forEach(a => {
      const v = el.getAttribute(a);
      if (v && DICT[v]) attrs.push({ el, a, key: v });
    });
  });

  const metaDesc = document.querySelector('meta[name="description"]');
  const descKey = metaDesc ? metaDesc.content : "";
  const ogLocale = document.querySelector('meta[property="og:locale"]');

  // 2) Idioma inicial
  const fromUrl = new URLSearchParams(location.search).get("lang");
  let saved = null;
  try { saved = localStorage.getItem(KEY); } catch (_) {}
  const fromBrowser = (navigator.languages || [navigator.language || "pt"])
    .map(l => String(l).slice(0, 2).toLowerCase()).find(l => LANGS.includes(l));
  let lang = [fromUrl, saved, fromBrowser, "pt"].find(l => LANGS.includes(l));

  const listeners = [];
  const tr = (key, l = lang) => (l === "pt" ? key : (DICT[key] && DICT[key][l]) || key);

  function apply() {
    nodes.forEach(n => { n.el.innerHTML = lang === "pt" ? n.orig : tr(n.key); });
    attrs.forEach(a => a.el.setAttribute(a.a, tr(a.key)));
    if (metaDesc) metaDesc.content = tr(descKey);
    if (ogLocale) ogLocale.content = OG_LOCALE[lang];
    document.documentElement.lang = HTML_LANG[lang];
    document.querySelectorAll(".lang [data-lang]").forEach(b => {
      b.setAttribute("aria-pressed", String(b.dataset.lang === lang));
    });
    listeners.forEach(fn => { try { fn(lang); } catch (e) { console.error(e); } });
  }

  function setLang(l) {
    if (!LANGS.includes(l) || l === lang) return;
    lang = l;
    try { localStorage.setItem(KEY, l); } catch (_) {}
    const url = new URL(location.href);
    if (l === "pt") url.searchParams.delete("lang"); else url.searchParams.set("lang", l);
    history.replaceState(null, "", url);
    apply();
  }

  document.querySelectorAll(".lang [data-lang]").forEach(b =>
    b.addEventListener("click", () => setLang(b.dataset.lang)));

  window.I18N = {
    get lang() { return lang; },
    L: o => (o && typeof o === "object" ? (o[lang] ?? o.pt) : o),
    t: tr,
    on: fn => listeners.push(fn),
    setLang,
  };

  apply();
})();
