/* =========================================================
   Anderson Oliveira · Senior SRE & Platform Engineer
   ========================================================= */
(() => {
  "use strict";
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  /* ---------- Tema claro/escuro ---------- */
  const root = document.documentElement;
  const THEME_KEY = "ao-theme";
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) root.dataset.theme = saved;
  } catch (_) {}
  $("#themeToggle")?.addEventListener("click", () => {
    const isDark = root.dataset.theme
      ? root.dataset.theme === "dark"
      : matchMedia("(prefers-color-scheme: dark)").matches;
    root.dataset.theme = isDark ? "light" : "dark";
    try { localStorage.setItem(THEME_KEY, root.dataset.theme); } catch (_) {}
  });

  /* ---------- Menu mobile ---------- */
  const burger = $("#navBurger");
  const links = $("#navLinks");
  burger?.addEventListener("click", () => {
    const open = links.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", String(open));
  });
  $$("#navLinks a").forEach(a => a.addEventListener("click", () => {
    links.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
  }));

  /* ---------- Nav: borda ao rolar + link ativo ---------- */
  const nav = $(".nav");
  addEventListener("scroll", () => nav.classList.toggle("is-scrolled", scrollY > 8), { passive: true });
  const sections = $$("main section[id]");
  const spy = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      $$("#navLinks a").forEach(a => a.classList.toggle("is-active", a.getAttribute("href") === "#" + e.target.id));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach(s => spy.observe(s));

  /* ---------- Foto: fallback com iniciais ---------- */
  $$(".photo-frame img").forEach(img => {
    const fail = () => img.classList.add("is-missing");
    if (img.complete && img.naturalWidth === 0) fail();
    img.addEventListener("error", fail);
  });

  /* ---------- i18n (js/i18n.js) ---------- */
  const I = window.I18N || { L: o => (o && typeof o === "object" ? o.pt : o), on: () => {}, lang: "pt" };
  const L = o => I.L(o);
  let rendered = false;
  const rv = () => (rendered ? "reveal is-visible" : "reveal");

  /* ---------- Competências ---------- */
  const SKILLS = [
    ["Cloud", { pt: "Multi-cloud em produção", en: "Multi-cloud in production", es: "Multi-cloud en producción" }, ["AWS", "Azure", "GCP", "Oracle Cloud"]],
    ["Containers & Platform", { pt: "Orquestração e autoscaling", en: "Orchestration and autoscaling", es: "Orquestación y autoscaling" }, ["Kubernetes", "EKS", "GKE", "AKS", "OpenShift", "Rancher", "ECS", "Karpenter", "EKS Auto Mode", "Cast AI"]],
    ["Infrastructure as Code", { pt: "Infra versionada e reprodutível", en: "Versioned, reproducible infra", es: "Infra versionada y reproducible" }, ["Terraform", "OpenTofu", "Terragrunt", "CloudFormation", "Ansible/AWX"]],
    ["GitOps & Platform Eng.", { pt: "Entrega declarativa e IDP", en: "Declarative delivery and IDP", es: "Entrega declarativa e IDP" }, ["ArgoCD", "FluxCD", "Helm", "Backstage", "SSO Okta", "Google SSO"]],
    ["CI/CD & DevEx", { pt: "Pipelines padronizados", en: "Standardized pipelines", es: "Pipelines estandarizados" }, ["GitHub Actions", "GitLab CI", "Jenkins", "Azure DevOps", "Helm Templates", "Gitflow"]],
    [{ pt: "Observabilidade & SRE", en: "Observability & SRE", es: "Observabilidad & SRE" }, { pt: "Confiabilidade mensurável", en: "Measurable reliability", es: "Confiabilidad medible" }, ["SLI", "SLO", "SLA", "Prometheus", "Grafana", "Alertmanager", "OpenSearch", "Elasticsearch", "Kibana", "New Relic"]],
    ["DevSecOps", { pt: "Segurança no pipeline", en: "Security in the pipeline", es: "Seguridad en el pipeline" }, ["Veracode", "Snyk", "Trivy", "AWS Security Hub", "SonarQube"]],
    [{ pt: "IA aplicada", en: "Applied AI", es: "IA aplicada" }, { pt: "Agentes para operação", en: "Agents for operations", es: "Agentes para la operación" }, ["Claude Code", "Codex", "Agents", "Skills", "MCP Kubernetes", "MCP Prometheus", "Spec-Driven Dev", "LLM/MLOps"]],
    [{ pt: "Automação & Middleware", en: "Automation & Middleware", es: "Automatización & Middleware" }, { pt: "Base sólida", en: "Solid foundation", es: "Base sólida" }, ["Python", "Shell Script", "Linux", "JBoss EAP", "Tomcat", "Nginx", "Kong"]],
  ];
  const skillsEl = $("#skills");
  function renderSkills() {
    if (!skillsEl) return;
    skillsEl.innerHTML = SKILLS.map(([t, d, items]) => `
      <article class="skill ${rv()}">
        <h3>${L(t)}</h3>
        <p style="margin:0;color:var(--muted);font-size:.9rem">${L(d)}</p>
        <div class="chips">${items.map(i => `<span>${i}</span>`).join("")}</div>
      </article>`).join("");
  }

  /* ---------- Certificações ---------- */
  const CERTS = [
    ["K8s", "CKAD · Certified Kubernetes Application Developer", "CNCF / Linux Foundation"],
    ["AWS", "AWS Certified Solutions Architect – Associate", "SAA-C03"],
    ["AWS", "AWS Certified Cloud Practitioner", "CLF-C01"],
    ["AZ", "Microsoft Azure Fundamentals", "AZ-900"],
    ["GL", "GitLab Certified Associate", "GitLab"],
    ["RH", "RHCSA · Red Hat Certified System Administrator", "Red Hat"],
    ["RH", "RHCJA · Red Hat Certified JBoss Administrator", "Red Hat"],
    ["LPI", { pt: "LPIC-1 e LPIC-2", en: "LPIC-1 and LPIC-2", es: "LPIC-1 y LPIC-2" }, "Linux Professional Institute"],
    ["DO", "DevOps Professional", "EXIN"],
    ["DO", "DevOps Essentials Professional Certificate", "CertiProf"],
    ["OCI", "Oracle Cloud Infrastructure Foundations Associate", "Oracle"],
    ["IT", "ITIL V3 Foundation", "AXELOS"],
    ["CB", "COBIT 4.1", "ISACA"],
    ["SC", "Scrum Foundation", "CertiProf"],
  ];
  const certsEl = $("#certs");
  function renderCerts() {
    if (!certsEl) return;
    certsEl.innerHTML = CERTS.map(([ico, name, by]) => `
      <div class="cert ${rv()}">
        <div class="cert__ico">${ico}</div>
        <div><strong>${L(name)}</strong><small>${by}</small></div>
      </div>`).join("");
  }

  /* ---------- Projetos de migração ---------- */
  const MIG_LABELS = {
    challenge: { pt: "Desafio", en: "Challenge", es: "Desafío" },
    solution: { pt: "Solução", en: "Solution", es: "Solución" },
    result: { pt: "Resultado", en: "Result", es: "Resultado" },
  };
  const MIGS = [
    {
      tab: "OpenShift → Azure AKS", org: "META · 2020–2021", tipo: "On-premises → Cloud",
      desafio: {
        pt: "Migrar sistemas críticos core de um OpenShift on-premises legado para a nuvem, sem impactar a operação e reduzindo custos de infraestrutura e licenciamento.",
        en: "Migrate critical core systems from a legacy on-premises OpenShift to the cloud without impacting operations, while reducing infrastructure and licensing costs.",
        es: "Migrar sistemas críticos core de un OpenShift on-premises heredado a la nube, sin impactar la operación y reduciendo costos de infraestructura y licencias.",
      },
      solucao: [
        { pt: "Estratégia de migração em ondas, priorizando serviços por criticidade e dependências.", en: "Wave-based migration strategy, prioritizing services by criticality and dependencies.", es: "Estrategia de migración por olas, priorizando servicios por criticidad y dependencias." },
        { pt: "Conversão de Routes, DeploymentConfigs e ImageStreams para Ingress e Deployments padrão Kubernetes.", en: "Converted Routes, DeploymentConfigs and ImageStreams to standard Kubernetes Ingress and Deployments.", es: "Conversión de Routes, DeploymentConfigs e ImageStreams a Ingress y Deployments estándar de Kubernetes." },
        { pt: "Velero para replicação de volumes (Azure Files/Disk) e Skopeo para sincronizar imagens no Azure Container Registry.", en: "Velero for volume replication (Azure Files/Disk) and Skopeo to sync images to Azure Container Registry.", es: "Velero para la replicación de volúmenes (Azure Files/Disk) y Skopeo para sincronizar imágenes en Azure Container Registry." },
        { pt: "Fim do OpenShift S2I: pipelines no GitHub Actions e Azure Pipelines integrados ao ACR, com GitOps via ArgoCD.", en: "Retired OpenShift S2I: GitHub Actions and Azure Pipelines integrated with ACR, with GitOps via ArgoCD.", es: "Fin de OpenShift S2I: pipelines en GitHub Actions y Azure Pipelines integrados con ACR, con GitOps vía ArgoCD." },
        { pt: "SCCs substituídas por Azure Policy para Kubernetes e Kubewarden; autoscaling orientado a eventos com KEDA.", en: "SCCs replaced by Azure Policy for Kubernetes and Kubewarden; event-driven autoscaling with KEDA.", es: "SCCs sustituidas por Azure Policy para Kubernetes y Kubewarden; autoscaling orientado a eventos con KEDA." },
        { pt: "Bancos que rodavam em contêiner migrados para PaaS (Azure SQL e Cosmos DB), reduzindo o overhead operacional.", en: "Containerized databases moved to PaaS (Azure SQL and Cosmos DB), reducing operational overhead.", es: "Bases de datos en contenedores migradas a PaaS (Azure SQL y Cosmos DB), reduciendo la carga operativa." },
      ],
      resultado: {
        pt: "Plataforma gerenciada, sem custo de licenciamento do OpenShift, com deploys declarativos e zero-downtime via GitOps.",
        en: "A managed platform with no OpenShift licensing cost, declarative deployments and zero-downtime releases via GitOps.",
        es: "Plataforma gestionada, sin costo de licencias de OpenShift, con despliegues declarativos y zero-downtime vía GitOps.",
      },
      tech: ["Azure AKS", "OpenShift", "Terraform", "ArgoCD", "Azure Pipelines", "GitHub Actions", "ACR", "Velero", "Skopeo", "KEDA", "Azure Policy", "Kubewarden", "Azure SQL", "Cosmos DB", "Azure Files"],
    },
    {
      tab: "GKE → Amazon EKS", org: { pt: "Cactus Gaming · 2025–atual", en: "Cactus Gaming · 2025–present", es: "Cactus Gaming · 2025–actual" }, tipo: "Cloud → Cloud",
      desafio: {
        pt: "Mover a plataforma Kubernetes do Google Cloud para a AWS mantendo os SLOs dos serviços e a experiência dos times de desenvolvimento.",
        en: "Move the Kubernetes platform from Google Cloud to AWS while keeping service SLOs and the developer experience intact.",
        es: "Mover la plataforma Kubernetes de Google Cloud a AWS manteniendo los SLOs de los servicios y la experiencia de los equipos de desarrollo.",
      },
      solucao: [
        { pt: "IaC reescrita para AWS com Terraform, OpenTofu e Terragrunt: VPC, EKS, IAM, Route 53, ECR.", en: "IaC rewritten for AWS with Terraform, OpenTofu and Terragrunt: VPC, EKS, IAM, Route 53, ECR.", es: "IaC reescrita para AWS con Terraform, OpenTofu y Terragrunt: VPC, EKS, IAM, Route 53, ECR." },
        { pt: "Troca de Workload Identity (GCP) por IRSA/EKS Pod Identity; segredos e SSO com Okta e Google preservados.", en: "Workload Identity (GCP) replaced by IRSA/EKS Pod Identity; secrets and SSO with Okta and Google preserved.", es: "Workload Identity (GCP) sustituido por IRSA/EKS Pod Identity; secretos y SSO con Okta y Google preservados." },
        { pt: "Imagens espelhadas para o ECR e aplicações reimplantadas por GitOps (FluxCD e ArgoCD) com os mesmos charts Helm.", en: "Images mirrored to ECR and applications redeployed via GitOps (FluxCD and ArgoCD) using the same Helm charts.", es: "Imágenes replicadas en ECR y aplicaciones redesplegadas vía GitOps (FluxCD y ArgoCD) con los mismos charts de Helm." },
        { pt: "Karpenter e EKS Auto Mode para escalar nós sob demanda com custo controlado.", en: "Karpenter and EKS Auto Mode to scale nodes on demand with controlled cost.", es: "Karpenter y EKS Auto Mode para escalar nodos bajo demanda con costo controlado." },
        { pt: "Cutover gradual por DNS ponderado, observabilidade comparando SLIs entre clusters e rollback planejado.", en: "Gradual cutover with weighted DNS, observability comparing SLIs across clusters and a planned rollback.", es: "Cutover gradual con DNS ponderado, observabilidad comparando SLIs entre clusters y rollback planificado." },
      ],
      resultado: {
        pt: "Plataforma consolidada na AWS, com escalabilidade elástica, FinOps ativo e confiabilidade medida por SLOs.",
        en: "A platform consolidated on AWS, with elastic scalability, active FinOps and reliability measured by SLOs.",
        es: "Plataforma consolidada en AWS, con escalabilidad elástica, FinOps activo y confiabilidad medida por SLOs.",
      },
      tech: ["GKE", "Amazon EKS", "Karpenter", "EKS Auto Mode", "Terraform", "OpenTofu", "Terragrunt", "FluxCD", "ArgoCD", "Helm", "Route 53", "ECR", "Prometheus", "Grafana"],
    },
    {
      tab: "ECS/EC2 → EKS", org: "Compass · 2021–2025", tipo: { pt: "Modernização", en: "Modernization", es: "Modernización" },
      desafio: {
        pt: "Unificar workloads espalhados entre EC2 e ECS em uma plataforma Kubernetes padronizada, segura e com custo previsível.",
        en: "Unify workloads spread across EC2 and ECS into a standardized, secure Kubernetes platform with predictable cost.",
        es: "Unificar workloads dispersos entre EC2 y ECS en una plataforma Kubernetes estandarizada, segura y con costo predecible.",
      },
      solucao: [
        { pt: "Containerização e empacotamento das aplicações em charts Helm reutilizáveis.", en: "Containerized and packaged applications into reusable Helm charts.", es: "Contenerización y empaquetado de las aplicaciones en charts de Helm reutilizables." },
        { pt: "Deploys via ArgoCD com estratégias Canary e Rolling Update para reduzir risco.", en: "Deployments via ArgoCD with Canary and Rolling Update strategies to reduce risk.", es: "Despliegues vía ArgoCD con estrategias Canary y Rolling Update para reducir el riesgo." },
        { pt: "Autoscaling de nós com Karpenter e otimização de custos com Cast AI.", en: "Node autoscaling with Karpenter and cost optimization with Cast AI.", es: "Autoscaling de nodos con Karpenter y optimización de costos con Cast AI." },
        { pt: "Segurança no pipeline (Snyk, Trivy, Veracode) e postura monitorada com AWS Security Hub.", en: "Pipeline security (Snyk, Trivy, Veracode) and posture monitoring with AWS Security Hub.", es: "Seguridad en el pipeline (Snyk, Trivy, Veracode) y postura monitoreada con AWS Security Hub." },
      ],
      resultado: {
        pt: "Entrega padronizada para as squads, deploys mais seguros e melhor aproveitamento de recursos.",
        en: "Standardized delivery for squads, safer deployments and better resource utilization.",
        es: "Entrega estandarizada para los squads, despliegues más seguros y mejor aprovechamiento de recursos.",
      },
      tech: ["Amazon ECS", "EC2", "Amazon EKS", "Helm", "ArgoCD", "Karpenter", "Cast AI", "Terraform", "CloudFormation", "Security Hub"],
    },
    {
      tab: "Jenkins → Azure DevOps / GitHub Actions", org: "META · Compass", tipo: "CI/CD",
      desafio: {
        pt: "Pipelines legados, difíceis de manter e sem padrão entre os times.",
        en: "Legacy pipelines that were hard to maintain and inconsistent across teams.",
        es: "Pipelines heredados, difíciles de mantener y sin un estándar entre los equipos.",
      },
      solucao: [
        { pt: "Migração de projetos para Azure DevOps e GitHub Actions com templates reutilizáveis.", en: "Migrated projects to Azure DevOps and GitHub Actions with reusable templates.", es: "Migración de proyectos a Azure DevOps y GitHub Actions con templates reutilizables." },
        { pt: "Build de artefatos, scans de segurança e aplicação de manifestos integrados ao fluxo.", en: "Artifact builds, security scans and manifest deployment built into the flow.", es: "Build de artefactos, escaneos de seguridad y aplicación de manifiestos integrados al flujo." },
        { pt: "Gitflow e quality gates com SonarQube para padronizar a entrega.", en: "Gitflow and SonarQube quality gates to standardize delivery.", es: "Gitflow y quality gates con SonarQube para estandarizar la entrega." },
      ],
      resultado: {
        pt: "Pipelines versionados como código, mais rápidos de criar e fáceis de auditar.",
        en: "Pipelines versioned as code, faster to create and easier to audit.",
        es: "Pipelines versionados como código, más rápidos de crear y fáciles de auditar.",
      },
      tech: ["Jenkins", "Azure DevOps", "GitHub Actions", "GitLab CI", "SonarQube", "Nexus", "Helm"],
    },
    {
      tab: { pt: "VMs & middleware → Containers", en: "VMs & middleware → Containers", es: "VMs & middleware → Contenedores" }, org: "GlobalWeb · RPerformance", tipo: "On-premises",
      desafio: {
        pt: "Aplicações Java críticas em JBoss, Tomcat e servidores tradicionais em ambientes de governo e corporativos, com deploy manual.",
        en: "Critical Java applications on JBoss, Tomcat and traditional servers in government and corporate environments, with manual deployments.",
        es: "Aplicaciones Java críticas en JBoss, Tomcat y servidores tradicionales en entornos de gobierno y corporativos, con despliegue manual.",
      },
      solucao: [
        { pt: "Containerização das aplicações e migração para Docker Swarm e, depois, Kubernetes com Rancher e OpenShift/OKD.", en: "Containerized applications and migrated them to Docker Swarm and later to Kubernetes with Rancher and OpenShift/OKD.", es: "Contenerización de las aplicaciones y migración a Docker Swarm y, después, a Kubernetes con Rancher y OpenShift/OKD." },
        { pt: "Registry e Nexus como fonte única de artefatos; automação com Jenkins, Rundeck e Ansible AWX.", en: "Registry and Nexus as the single source of artifacts; automation with Jenkins, Rundeck and Ansible AWX.", es: "Registry y Nexus como fuente única de artefactos; automatización con Jenkins, Rundeck y Ansible AWX." },
        { pt: "Kong API Gateway, proxy reverso e certificados SSL em arquitetura de alta disponibilidade.", en: "Kong API Gateway, reverse proxy and SSL certificates in a high-availability architecture.", es: "Kong API Gateway, proxy inverso y certificados SSL en una arquitectura de alta disponibilidad." },
      ],
      resultado: {
        pt: "Ambientes reprodutíveis, deploys automatizados e base pronta para a jornada de cloud.",
        en: "Reproducible environments, automated deployments and a foundation ready for the cloud journey.",
        es: "Entornos reproducibles, despliegues automatizados y una base lista para el viaje a la nube.",
      },
      tech: ["JBoss EAP", "Tomcat", "Docker", "Docker Swarm", "Kubernetes", "Rancher", "OKD", "Kong", "Ansible AWX", "Nexus"],
    },
    {
      tab: { pt: "Monitoramento legado → Observabilidade", en: "Legacy monitoring → Observability", es: "Monitoreo heredado → Observabilidad" },
      org: "GlobalWeb → Cactus Gaming", tipo: { pt: "Observabilidade", en: "Observability", es: "Observabilidad" },
      desafio: {
        pt: "Monitoramento reativo, baseado em checagens de host, sem visão de experiência do usuário.",
        en: "Reactive, host-check-based monitoring with no view of the user experience.",
        es: "Monitoreo reactivo, basado en chequeos de host, sin visión de la experiencia del usuario.",
      },
      solucao: [
        { pt: "Evolução de Nagios, Centreon e Check_MK para Zabbix, Graylog e Grafana.", en: "Evolved from Nagios, Centreon and Check_MK to Zabbix, Graylog and Grafana.", es: "Evolución de Nagios, Centreon y Check_MK a Zabbix, Graylog y Grafana." },
        { pt: "Depois, métricas, logs e traces com Prometheus, Alertmanager, OpenSearch e New Relic.", en: "Then metrics, logs and traces with Prometheus, Alertmanager, OpenSearch and New Relic.", es: "Después, métricas, logs y traces con Prometheus, Alertmanager, OpenSearch y New Relic." },
        { pt: "SLIs e SLOs por serviço, alertas por burn rate e agentes de IA para correlação de anomalias.", en: "Per-service SLIs and SLOs, burn-rate alerts and AI agents for anomaly correlation.", es: "SLIs y SLOs por servicio, alertas por burn rate y agentes de IA para la correlación de anomalías." },
      ],
      resultado: {
        pt: "Do “o servidor caiu?” para “o usuário está sendo impactado?”: incidentes detectados antes do cliente.",
        en: "From “is the server down?” to “are users being impacted?”: incidents detected before the customer notices.",
        es: "Del “¿se cayó el servidor?” al “¿el usuario está siendo impactado?”: incidentes detectados antes que el cliente.",
      },
      tech: ["Nagios", "Zabbix", "Graylog", "Prometheus", "Grafana", "Alertmanager", "OpenSearch", "New Relic", "SLO"],
    },
  ];
  const migTabs = $("#migTabs"), migPanel = $("#migPanel");
  let migIdx = 0;
  function showMig(i) {
    migIdx = i;
    const m = MIGS[i];
    $$(".mig__tab", migTabs).forEach((b, k) => {
      b.classList.toggle("is-active", k === i);
      b.setAttribute("aria-selected", String(k === i));
    });
    migPanel.innerHTML = `
      <header><span class="tag">${L(m.tipo)}</span><h3>${L(m.tab)}</h3><p class="mig__org">${L(m.org)}</p></header>
      <div class="mig__block"><h4>${L(MIG_LABELS.challenge)}</h4><p>${L(m.desafio)}</p></div>
      <div class="mig__block"><h4>${L(MIG_LABELS.solution)}</h4><ul>${m.solucao.map(x => `<li>${L(x)}</li>`).join("")}</ul></div>
      <div class="mig__block mig__result"><h4>${L(MIG_LABELS.result)}</h4><p>${L(m.resultado)}</p></div>
      <div class="chips">${m.tech.map(x => `<span>${x}</span>`).join("")}</div>`;
  }
  function renderMigs() {
    if (!migTabs || !migPanel) return;
    migTabs.innerHTML = MIGS.map((m, i) =>
      `<button class="mig__tab" role="tab" data-i="${i}"><small>${L(m.tipo)}</small>${L(m.tab)}</button>`).join("");
    showMig(migIdx);
  }
  migTabs?.addEventListener("click", e => {
    const b = e.target.closest(".mig__tab");
    if (b) showMig(+b.dataset.i);
  });

  /* ---------- Diagrama de evolução ---------- */
  const EVO = [
    { y: "2005", h: 20, t: { pt: "Datacenter & fundamentos", en: "Datacenter & fundamentals", es: "Datacenter & fundamentos" },
      d: { pt: "Suporte, redes, servidores Linux e Windows em datacenter on-premises. A base de tudo.", en: "Support, networking, Linux and Windows servers in on-premises datacenters. The foundation of everything.", es: "Soporte, redes, servidores Linux y Windows en datacenter on-premises. La base de todo." },
      c: ["Linux", { pt: "Redes", en: "Networking", es: "Redes" }, "Datacenter"] },
    { y: "2013", h: 32, t: "Linux & middleware",
      d: { pt: "Servidores de aplicação, proxy reverso, balanceamento e e-mail corporativo.", en: "Application servers, reverse proxy, load balancing and corporate email.", es: "Servidores de aplicaciones, proxy inverso, balanceo de carga y correo corporativo." },
      c: ["Tomcat", "JBoss", "Varnish", "HAProxy", "SUSE"] },
    { y: "2016", h: 45, t: { pt: "Alta disponibilidade & automação", en: "High availability & automation", es: "Alta disponibilidad & automatización" },
      d: { pt: "Ambientes críticos de governo e corporativos com API Gateway, HA e primeiras automações com Ansible e Jenkins.", en: "Critical government and corporate environments with API Gateway, HA and early automation with Ansible and Jenkins.", es: "Entornos críticos de gobierno y corporativos con API Gateway, HA y primeras automatizaciones con Ansible y Jenkins." },
      c: ["Kong", "Ansible AWX", "Rundeck", "Zabbix"] },
    { y: "2018", h: 58, t: { pt: "Containers", en: "Containers", es: "Contenedores" },
      d: { pt: "Primeiros clusters Kubernetes, Rancher e Docker Swarm. Registry e Nexus como fonte única de artefatos.", en: "First Kubernetes clusters, Rancher and Docker Swarm. Registry and Nexus as the single source of artifacts.", es: "Primeros clusters de Kubernetes, Rancher y Docker Swarm. Registry y Nexus como fuente única de artefactos." },
      c: ["Kubernetes", "Rancher", "Docker", "Nexus"] },
    { y: "2020", h: 70, t: "On-premises → Cloud",
      d: { pt: "Migração de OpenShift on-premises para Azure AKS, pipelines de ponta a ponta e Terraform como padrão de provisionamento.", en: "Migration from on-premises OpenShift to Azure AKS, end-to-end pipelines and Terraform as the provisioning standard.", es: "Migración de OpenShift on-premises a Azure AKS, pipelines de punta a punta y Terraform como estándar de aprovisionamiento." },
      c: ["OpenShift → AKS", "Azure DevOps", "KEDA", "Terraform"] },
    { y: "2022", h: 84, t: "DevSecOps & GitOps",
      d: { pt: "Migração ECS → EKS com Karpenter e Cast AI, ArgoCD, segurança integrada ao pipeline e deploys Canary.", en: "ECS → EKS migration with Karpenter and Cast AI, ArgoCD, security built into the pipeline and Canary deployments.", es: "Migración ECS → EKS con Karpenter y Cast AI, ArgoCD, seguridad integrada al pipeline y despliegues Canary." },
      c: ["EKS", "ArgoCD", "Karpenter", "Security Hub"] },
    { y: "2026", h: 100, t: { pt: "SRE, Platform & IA", en: "SRE, Platform & AI", es: "SRE, Platform & IA" },
      d: { pt: "SLOs, Backstage, migração GKE → EKS, FinOps e agentes de IA com MCPs para diagnóstico e testes automatizados.", en: "SLOs, Backstage, GKE → EKS migration, FinOps and AI agents with MCPs for diagnostics and automated testing.", es: "SLOs, Backstage, migración GKE → EKS, FinOps y agentes de IA con MCPs para diagnóstico y pruebas automatizadas." },
      c: ["SLO", "Backstage", "FluxCD", "MCP", "Claude Code", "Codex"] },
  ];
  const track = $("#evoTrack");
  const panel = $("#evoPanel");
  let evoIdx = EVO.length - 1;
  function renderEvoStep(i) {
    evoIdx = (i + EVO.length) % EVO.length;
    const e = EVO[evoIdx];
    $$(".evo__bar", track).forEach((b, k) => {
      b.classList.toggle("is-active", k === evoIdx);
      b.setAttribute("aria-selected", String(k === evoIdx));
    });
    panel.innerHTML = `<h4>${e.y} · ${L(e.t)}</h4><p>${L(e.d)}</p><div class="chips">${e.c.map(x => `<span>${L(x)}</span>`).join("")}</div>`;
  }
  function renderEvo() {
    if (!track || !panel) return;
    track.innerHTML = EVO.map((e, i) =>
      `<button class="evo__bar" role="tab" style="height:${e.h}%" data-i="${i}" aria-label="${e.y}: ${L(e.t)}">${e.y}</button>`
    ).join("");
    renderEvoStep(evoIdx);
  }
  if (track && panel) {
    track.addEventListener("click", ev => {
      const b = ev.target.closest(".evo__bar");
      if (b) renderEvoStep(+b.dataset.i);
    });
    track.addEventListener("mouseover", ev => {
      const b = ev.target.closest(".evo__bar");
      if (b && matchMedia("(hover:hover)").matches) renderEvoStep(+b.dataset.i);
    });
    $("#evoPrev").addEventListener("click", () => renderEvoStep(evoIdx - 1));
    $("#evoNext").addEventListener("click", () => renderEvoStep(evoIdx + 1));
  }

  /* ---------- Terminal: demonstração ilustrativa do agente SRE ---------- */
  const SCRIPT = [
    ["p", { pt: "$ claude \"/sre-diagnose checkout-api latência p99 alta\"", en: "$ claude \"/sre-diagnose checkout-api high p99 latency\"", es: "$ claude \"/sre-diagnose checkout-api latencia p99 alta\"" }],
    ["dim", { pt: "▸ skill: sre-k8s-diagnostics · modo: read-only", en: "▸ skill: sre-k8s-diagnostics · mode: read-only", es: "▸ skill: sre-k8s-diagnostics · modo: read-only" }],
    ["", ""],
    ["", "● mcp:prometheus  histogram_quantile(0.99, …checkout-api…)"],
    ["warn", { pt: "  p99 = 1.8s (SLO 400ms) · burn rate 6.2x na última 1h", en: "  p99 = 1.8s (SLO 400ms) · burn rate 6.2x over the last 1h", es: "  p99 = 1.8s (SLO 400ms) · burn rate 6.2x en la última 1h" }],
    ["", "● mcp:kubernetes  get pods -n payments -l app=checkout-api"],
    ["err", { pt: "  3/8 pods com restarts recentes · OOMKilled", en: "  3/8 pods with recent restarts · OOMKilled", es: "  3/8 pods con reinicios recientes · OOMKilled" }],
    ["", "● mcp:kubernetes  describe node ip-10-0-42-17"],
    ["warn", { pt: "  MemoryPressure=True · consolidação recente do Karpenter", en: "  MemoryPressure=True · recent Karpenter consolidation", es: "  MemoryPressure=True · consolidación reciente de Karpenter" }],
    ["", "● mcp:prometheus  container_memory_working_set_bytes"],
    ["warn", { pt: "  uso ~95% do limit desde o deploy v2.14.0", en: "  ~95% of limit used since deploy v2.14.0", es: "  uso ~95% del limit desde el deploy v2.14.0" }],
    ["", ""],
    ["ok", { pt: "✔ Hipótese de causa raiz:", en: "✔ Root-cause hypothesis:", es: "✔ Hipótesis de causa raíz:" }],
    ["", { pt: "  limit de memória subdimensionado após v2.14.0", en: "  memory limit undersized after v2.14.0", es: "  limit de memoria subdimensionado tras v2.14.0" }],
    ["", { pt: "  → OOMKill → retries → latência p99", en: "  → OOMKill → retries → p99 latency", es: "  → OOMKill → retries → latencia p99" }],
    ["", ""],
    ["p", { pt: "▸ Próximos passos sugeridos", en: "▸ Suggested next steps", es: "▸ Próximos pasos sugeridos" }],
    ["", { pt: "  1. PR no repositório GitOps: memory limit 512Mi → 768Mi", en: "  1. PR to the GitOps repo: memory limit 512Mi → 768Mi", es: "  1. PR en el repositorio GitOps: memory limit 512Mi → 768Mi" }],
    ["", { pt: "  2. Teste automatizado: helm lint + kubeconform + policy check", en: "  2. Automated test: helm lint + kubeconform + policy check", es: "  2. Prueba automatizada: helm lint + kubeconform + policy check" }],
    ["", { pt: "  3. Aprovação humana → FluxCD sincroniza", en: "  3. Human approval → FluxCD syncs", es: "  3. Aprobación humana → FluxCD sincroniza" }],
    ["dim", { pt: "  nenhuma alteração aplicada em produção pelo agente.", en: "  no changes applied to production by the agent.", es: "  el agente no aplicó ningún cambio en producción." }],
  ].map(([c, t]) => [c, t]);
  const term = $("#termBody");
  let termTimer = null;
  const esc = s => s.replace(/[&<>]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
  function runTerm() {
    if (!term) return;
    clearTimeout(termTimer);
    term.innerHTML = "";
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      term.innerHTML = SCRIPT.map(([c, t]) => `<span class="${c}">${esc(L(t))}</span>`).join("\n");
      return;
    }
    let line = 0, ch = 0;
    const out = [];
    const tick = () => {
      if (line >= SCRIPT.length) {
        term.innerHTML = out.join("\n") + '\n<span class="cursor"></span>';
        return;
      }
      const [cls, raw] = SCRIPT[line];
      const text = L(raw);
      const typing = line === 0;
      if (typing && ch < text.length) {
        ch++;
        term.innerHTML = [...out, `<span class="${cls}">${esc(text.slice(0, ch))}</span><span class="cursor"></span>`].join("\n");
        termTimer = setTimeout(tick, 28);
        return;
      }
      out.push(`<span class="${cls}">${esc(text)}</span>`);
      term.innerHTML = out.join("\n") + '\n<span class="cursor"></span>';
      term.scrollTop = term.scrollHeight;
      line++; ch = 0;
      termTimer = setTimeout(tick, text ? 260 : 120);
    };
    tick();
  }
  $("#termReplay")?.addEventListener("click", runTerm);
  if (term) {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { runTerm(); io.disconnect(); }
    }, { threshold: .35 });
    io.observe(term);
  }

  /* ---------- Contadores do hero ---------- */
  const counters = $$("[data-count]");
  const countIO = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target, end = +el.dataset.count, suf = el.dataset.suffix || "";
      const t0 = performance.now(), dur = 1100;
      const step = now => {
        const p = Math.min(1, (now - t0) / dur);
        el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + suf;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      countIO.unobserve(el);
    });
  }, { threshold: .6 });
  counters.forEach(c => countIO.observe(c));

  /* ---------- Copiar para a área de transferência ---------- */
  const toast = $("#toast");
  let toastT;
  const showToast = msg => {
    toast.textContent = msg;
    toast.classList.add("is-visible");
    clearTimeout(toastT);
    toastT = setTimeout(() => toast.classList.remove("is-visible"), 1800);
  };
  $$(".copy").forEach(btn => btn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(btn.dataset.copy);
      showToast(L({ pt: "Copiado!", en: "Copied!", es: "¡Copiado!" }));
    } catch (_) {
      showToast(btn.dataset.copy);
    }
  }));

  /* ---------- Render inicial + troca de idioma ---------- */
  function renderAll() { renderSkills(); renderCerts(); renderMigs(); renderEvo(); }
  renderAll();
  rendered = true;
  I.on(() => {
    renderAll();
    if (term && term.textContent) runTerm();
  });

  /* ---------- Reveal on scroll ---------- */
  const revealIO = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("is-visible"); revealIO.unobserve(e.target); }
    });
  }, { threshold: .12, rootMargin: "0px 0px -40px 0px" });
  $$(".reveal").forEach(el => revealIO.observe(el));
})();
