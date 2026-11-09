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

  /* ---------- Competências ---------- */
  const SKILLS = [
    ["Cloud", "Multi-cloud em produção", ["AWS", "Azure", "GCP", "Oracle Cloud"]],
    ["Containers & Platform", "Orquestração e autoscaling", ["Kubernetes", "EKS", "GKE", "AKS", "OpenShift", "Rancher", "ECS", "Karpenter", "EKS Auto Mode", "Cast AI"]],
    ["Infrastructure as Code", "Infra versionada e reprodutível", ["Terraform", "OpenTofu", "Terragrunt", "CloudFormation", "Ansible/AWX"]],
    ["GitOps & Platform Eng.", "Entrega declarativa e IDP", ["ArgoCD", "FluxCD", "Helm", "Backstage", "SSO Okta", "Google SSO"]],
    ["CI/CD & DevEx", "Pipelines padronizados", ["GitHub Actions", "GitLab CI", "Jenkins", "Azure DevOps", "Helm Templates", "Gitflow"]],
    ["Observabilidade & SRE", "Confiabilidade mensurável", ["SLI", "SLO", "SLA", "Prometheus", "Grafana", "Alertmanager", "OpenSearch", "Elasticsearch", "Kibana", "New Relic"]],
    ["DevSecOps", "Segurança no pipeline", ["Veracode", "Snyk", "Trivy", "AWS Security Hub", "SonarQube"]],
    ["IA aplicada", "Agentes para operação", ["Claude Code", "Codex", "Agents", "Skills", "MCP Kubernetes", "MCP Prometheus", "Spec-Driven Dev", "LLM/MLOps"]],
    ["Automação & Middleware", "Base sólida", ["Python", "Shell Script", "Linux", "JBoss EAP", "Tomcat", "Nginx", "Kong"]],
  ];
  const skillsEl = $("#skills");
  if (skillsEl) {
    skillsEl.innerHTML = SKILLS.map(([t, d, items]) => `
      <article class="skill reveal">
        <h3>${t}</h3>
        <p style="margin:0;color:var(--muted);font-size:.9rem">${d}</p>
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
    ["LPI", "LPIC-1 e LPIC-2", "Linux Professional Institute"],
    ["DO", "DevOps Professional", "EXIN"],
    ["DO", "DevOps Essentials Professional Certificate", "CertiProf"],
    ["OCI", "Oracle Cloud Infrastructure Foundations Associate", "Oracle"],
    ["IT", "ITIL V3 Foundation", "AXELOS"],
    ["CB", "COBIT 4.1", "ISACA"],
    ["SC", "Scrum Foundation", "CertiProf"],
  ];
  const certsEl = $("#certs");
  if (certsEl) {
    certsEl.innerHTML = CERTS.map(([ico, name, by]) => `
      <div class="cert reveal">
        <div class="cert__ico">${ico}</div>
        <div><strong>${name}</strong><small>${by}</small></div>
      </div>`).join("");
  }


  /* ---------- Projetos de migração ---------- */
  const MIGS = [
    {
      tab: "OpenShift → Azure AKS", org: "META · 2020–2021", tipo: "On-premises → Cloud",
      desafio: "Migrar sistemas críticos core de um OpenShift on-premises legado para a nuvem, sem impactar a operação e reduzindo custos de infraestrutura e licenciamento.",
      solucao: [
        "Estratégia de migração em ondas, priorizando serviços por criticidade e dependências.",
        "Conversão de Routes, DeploymentConfigs e ImageStreams para Ingress e Deployments padrão Kubernetes.",
        "Velero para replicação de volumes (Azure Files/Disk) e Skopeo para sincronizar imagens no Azure Container Registry.",
        "Fim do OpenShift S2I: pipelines no GitHub Actions e Azure Pipelines integrados ao ACR, com GitOps via ArgoCD.",
        "SCCs substituídas por Azure Policy para Kubernetes e Kubewarden; autoscaling orientado a eventos com KEDA.",
        "Bancos que rodavam em contêiner migrados para PaaS (Azure SQL e Cosmos DB), reduzindo o overhead operacional."
      ],
      resultado: "Plataforma gerenciada, sem custo de licenciamento do OpenShift, com deploys declarativos e zero-downtime via GitOps.",
      tech: ["Azure AKS", "OpenShift", "Terraform", "ArgoCD", "Azure Pipelines", "GitHub Actions", "ACR", "Velero", "Skopeo", "KEDA", "Azure Policy", "Kubewarden", "Azure SQL", "Cosmos DB", "Azure Files"]
    },
    {
      tab: "GKE → Amazon EKS", org: "Cactus Gaming · 2025–atual", tipo: "Cloud → Cloud",
      desafio: "Mover a plataforma Kubernetes do Google Cloud para a AWS mantendo os SLOs dos serviços e a experiência dos times de desenvolvimento.",
      solucao: [
        "IaC reescrita para AWS com Terraform, OpenTofu e Terragrunt: VPC, EKS, IAM, Route 53, ECR.",
        "Troca de Workload Identity (GCP) por IRSA/EKS Pod Identity; segredos e SSO com Okta e Google preservados.",
        "Imagens espelhadas para o ECR e aplicações reimplantadas por GitOps (FluxCD e ArgoCD) com os mesmos charts Helm.",
        "Karpenter e EKS Auto Mode para escalar nós sob demanda com custo controlado.",
        "Cutover gradual por DNS ponderado, observabilidade comparando SLIs entre clusters e rollback planejado."
      ],
      resultado: "Plataforma consolidada na AWS, com escalabilidade elástica, FinOps ativo e confiabilidade medida por SLOs.",
      tech: ["GKE", "Amazon EKS", "Karpenter", "EKS Auto Mode", "Terraform", "OpenTofu", "Terragrunt", "FluxCD", "ArgoCD", "Helm", "Route 53", "ECR", "Prometheus", "Grafana"]
    },
    {
      tab: "ECS/EC2 → EKS", org: "Compass · 2021–2025", tipo: "Modernização",
      desafio: "Unificar workloads espalhados entre EC2 e ECS em uma plataforma Kubernetes padronizada, segura e com custo previsível.",
      solucao: [
        "Containerização e empacotamento das aplicações em charts Helm reutilizáveis.",
        "Deploys via ArgoCD com estratégias Canary e Rolling Update para reduzir risco.",
        "Autoscaling de nós com Karpenter e otimização de custos com Cast AI.",
        "Segurança no pipeline (Snyk, Trivy, Veracode) e postura monitorada com AWS Security Hub."
      ],
      resultado: "Entrega padronizada para as squads, deploys mais seguros e melhor aproveitamento de recursos.",
      tech: ["Amazon ECS", "EC2", "Amazon EKS", "Helm", "ArgoCD", "Karpenter", "Cast AI", "Terraform", "CloudFormation", "Security Hub"]
    },
    {
      tab: "Jenkins → Azure DevOps / GitHub Actions", org: "META · Compass", tipo: "CI/CD",
      desafio: "Pipelines legados, difíceis de manter e sem padrão entre os times.",
      solucao: [
        "Migração de projetos para Azure DevOps e GitHub Actions com templates reutilizáveis.",
        "Build de artefatos, scans de segurança e aplicação de manifestos integrados ao fluxo.",
        "Gitflow e quality gates com SonarQube para padronizar a entrega."
      ],
      resultado: "Pipelines versionados como código, mais rápidos de criar e fáceis de auditar.",
      tech: ["Jenkins", "Azure DevOps", "GitHub Actions", "GitLab CI", "SonarQube", "Nexus", "Helm"]
    },
    {
      tab: "VMs & middleware → Containers", org: "GlobalWeb · RPerformance", tipo: "On-premises",
      desafio: "Aplicações Java críticas em JBoss, Tomcat e servidores tradicionais em ambientes de governo e corporativos, com deploy manual.",
      solucao: [
        "Containerização das aplicações e migração para Docker Swarm e, depois, Kubernetes com Rancher e OpenShift/OKD.",
        "Registry e Nexus como fonte única de artefatos; automação com Jenkins, Rundeck e Ansible AWX.",
        "Kong API Gateway, proxy reverso e certificados SSL em arquitetura de alta disponibilidade."
      ],
      resultado: "Ambientes reprodutíveis, deploys automatizados e base pronta para a jornada de cloud.",
      tech: ["JBoss EAP", "Tomcat", "Docker", "Docker Swarm", "Kubernetes", "Rancher", "OKD", "Kong", "Ansible AWX", "Nexus"]
    },
    {
      tab: "Monitoramento legado → Observabilidade", org: "GlobalWeb → Cactus Gaming", tipo: "Observabilidade",
      desafio: "Monitoramento reativo, baseado em checagens de host, sem visão de experiência do usuário.",
      solucao: [
        "Evolução de Nagios, Centreon e Check_MK para Zabbix, Graylog e Grafana.",
        "Depois, métricas, logs e traces com Prometheus, Alertmanager, OpenSearch e New Relic.",
        "SLIs e SLOs por serviço, alertas por burn rate e agentes de IA para correlação de anomalias."
      ],
      resultado: "Do “o servidor caiu?” para “o usuário está sendo impactado?”: incidentes detectados antes do cliente.",
      tech: ["Nagios", "Zabbix", "Graylog", "Prometheus", "Grafana", "Alertmanager", "OpenSearch", "New Relic", "SLO"]
    }
  ];
  const migTabs = $("#migTabs"), migPanel = $("#migPanel");
  if (migTabs && migPanel) {
    migTabs.innerHTML = MIGS.map((m, i) =>
      `<button class="mig__tab" role="tab" data-i="${i}"><small>${m.tipo}</small>${m.tab}</button>`).join("");
    const show = i => {
      const m = MIGS[i];
      $$(".mig__tab", migTabs).forEach((b, k) => {
        b.classList.toggle("is-active", k === i);
        b.setAttribute("aria-selected", String(k === i));
      });
      migPanel.innerHTML = `
        <header><span class="tag">${m.tipo}</span><h3>${m.tab}</h3><p class="mig__org">${m.org}</p></header>
        <div class="mig__block"><h4>Desafio</h4><p>${m.desafio}</p></div>
        <div class="mig__block"><h4>Solução</h4><ul>${m.solucao.map(x => `<li>${x}</li>`).join("")}</ul></div>
        <div class="mig__block mig__result"><h4>Resultado</h4><p>${m.resultado}</p></div>
        <div class="chips">${m.tech.map(x => `<span>${x}</span>`).join("")}</div>`;
    };
    migTabs.addEventListener("click", e => {
      const b = e.target.closest(".mig__tab");
      if (b) show(+b.dataset.i);
    });
    show(0);
  }

  /* ---------- Diagrama de evolução ---------- */
  const EVO = [
    { y: "2005", h: 20, t: "Datacenter & fundamentos", d: "Suporte, redes, servidores Linux e Windows em datacenter on-premises. A base de tudo.", c: ["Linux", "Redes", "Datacenter"] },
    { y: "2013", h: 32, t: "Linux & middleware", d: "Servidores de aplicação, proxy reverso, balanceamento e e-mail corporativo.", c: ["Tomcat", "JBoss", "Varnish", "HAProxy", "SUSE"] },
    { y: "2016", h: 45, t: "Alta disponibilidade & automação", d: "Ambientes críticos de governo e corporativos com API Gateway, HA e primeiras automações com Ansible e Jenkins.", c: ["Kong", "Ansible AWX", "Rundeck", "Zabbix"] },
    { y: "2018", h: 58, t: "Containers", d: "Primeiros clusters Kubernetes, Rancher e Docker Swarm. Registry e Nexus como fonte única de artefatos.", c: ["Kubernetes", "Rancher", "Docker", "Nexus"] },
    { y: "2020", h: 70, t: "On-premises → Cloud", d: "Migração de OpenShift on-premises para Azure AKS, pipelines de ponta a ponta e Terraform como padrão de provisionamento.", c: ["OpenShift → AKS", "Azure DevOps", "KEDA", "Terraform"] },
    { y: "2022", h: 84, t: "DevSecOps & GitOps", d: "Migração ECS → EKS com Karpenter e Cast AI, ArgoCD, segurança integrada ao pipeline e deploys Canary.", c: ["EKS", "ArgoCD", "Karpenter", "Security Hub"] },
    { y: "2026", h: 100, t: "SRE, Platform & IA", d: "SLOs, Backstage, migração GKE → EKS, FinOps e agentes de IA com MCPs para diagnóstico e testes automatizados.", c: ["SLO", "Backstage", "FluxCD", "MCP", "Claude Code", "Codex"] },
  ];
  const track = $("#evoTrack");
  const panel = $("#evoPanel");
  let evoIdx = EVO.length - 1;
  if (track && panel) {
    track.innerHTML = EVO.map((e, i) =>
      `<button class="evo__bar" role="tab" style="height:${e.h}%" data-i="${i}" aria-label="${e.y}: ${e.t}">${e.y}</button>`
    ).join("");
    const render = i => {
      evoIdx = (i + EVO.length) % EVO.length;
      const e = EVO[evoIdx];
      $$(".evo__bar", track).forEach((b, k) => {
        b.classList.toggle("is-active", k === evoIdx);
        b.setAttribute("aria-selected", String(k === evoIdx));
      });
      panel.innerHTML = `<h4>${e.y} · ${e.t}</h4><p>${e.d}</p><div class="chips">${e.c.map(x => `<span>${x}</span>`).join("")}</div>`;
    };
    track.addEventListener("click", ev => {
      const b = ev.target.closest(".evo__bar");
      if (b) render(+b.dataset.i);
    });
    track.addEventListener("mouseover", ev => {
      const b = ev.target.closest(".evo__bar");
      if (b && matchMedia("(hover:hover)").matches) render(+b.dataset.i);
    });
    $("#evoPrev").addEventListener("click", () => render(evoIdx - 1));
    $("#evoNext").addEventListener("click", () => render(evoIdx + 1));
    render(evoIdx);
  }

  /* ---------- Terminal: demonstração ilustrativa do agente SRE ---------- */
  const SCRIPT = [
    ["p", "$ claude \"/sre-diagnose checkout-api latência p99 alta\""],
    ["dim", "▸ skill: sre-k8s-diagnostics · modo: read-only"],
    ["", ""],
    ["", "● mcp:prometheus  histogram_quantile(0.99, …checkout-api…)"],
    ["warn", "  p99 = 1.8s (SLO 400ms) · burn rate 6.2x na última 1h"],
    ["", "● mcp:kubernetes  get pods -n payments -l app=checkout-api"],
    ["err", "  3/8 pods com restarts recentes · OOMKilled"],
    ["", "● mcp:kubernetes  describe node ip-10-0-42-17"],
    ["warn", "  MemoryPressure=True · consolidação recente do Karpenter"],
    ["", "● mcp:prometheus  container_memory_working_set_bytes"],
    ["warn", "  uso ~95% do limit desde o deploy v2.14.0"],
    ["", ""],
    ["ok", "✔ Hipótese de causa raiz:"],
    ["", "  limit de memória subdimensionado após v2.14.0"],
    ["", "  → OOMKill → retries → latência p99"],
    ["", ""],
    ["p", "▸ Próximos passos sugeridos"],
    ["", "  1. PR no repositório GitOps: memory limit 512Mi → 768Mi"],
    ["", "  2. Teste automatizado: helm lint + kubeconform + policy check"],
    ["", "  3. Aprovação humana → FluxCD sincroniza"],
    ["dim", "  nenhuma alteração aplicada em produção pelo agente."],
  ];
  const term = $("#termBody");
  let termTimer = null;
  const esc = s => s.replace(/[&<>]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
  function runTerm() {
    if (!term) return;
    clearTimeout(termTimer);
    term.innerHTML = "";
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      term.innerHTML = SCRIPT.map(([c, t]) => `<span class="${c}">${esc(t)}</span>`).join("\n");
      return;
    }
    let line = 0, ch = 0;
    const out = [];
    const tick = () => {
      if (line >= SCRIPT.length) {
        term.innerHTML = out.join("\n") + '\n<span class="cursor"></span>';
        return;
      }
      const [cls, text] = SCRIPT[line];
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
      showToast("Copiado!");
    } catch (_) {
      showToast(btn.dataset.copy);
    }
  }));

  /* ---------- Reveal on scroll ---------- */
  const revealIO = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("is-visible"); revealIO.unobserve(e.target); }
    });
  }, { threshold: .12, rootMargin: "0px 0px -40px 0px" });
  $$(".reveal").forEach(el => revealIO.observe(el));
})();
