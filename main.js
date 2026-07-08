// -------------------------------------------------------------
// PROJECT DATABASE (GALLERY NODES)
// -------------------------------------------------------------
const PROJECTS_DATA = [
  {
    id: "NODE_001",
    title: "Axonometric Study Platform",
    category: "frontend",
    desc: "A brutalist visual database engine featuring advanced canvas grid rendering, SVG architectural visualizations, and interactive structural blueprints. Optimized for sub-second load times.",
    tech: ["Next.js", "SVG", "Web Audio API", "Vanilla CSS"],
    dim: "1920x1080",
    label: "AXON_STUDY"
  },
  {
    id: "NODE_002",
    title: "Enterprise Grid Ledger",
    category: "backend",
    desc: "Highly-secure database ledger and transaction router designed for inventory logging. Built with strict validation schemas and fully automated integration testing.",
    tech: ["NodeJS", "PostgreSQL", "Docker", "Redis"],
    dim: "1440x900",
    label: "GRID_LEDGER"
  },
  {
    id: "NODE_003",
    title: "Brutalist Identity Guideline",
    category: "brand",
    desc: "Complete visual identity framework, custom typographic specs, and responsive component UI stylesheets for an industrial design consultancy.",
    tech: ["Figma", "Typography Guidelines", "SVG Symbols"],
    dim: "1200x1200",
    label: "BRUTAL_BRAND"
  },
  {
    id: "NODE_004",
    title: "High-Freq Web Scraper",
    category: "ai",
    desc: "Multi-threaded scraper pipeline capable of harvesting structured market intelligence from complex dynamically loaded target nodes. Includes automated proxy rotation and anti-bot bypass protocols.",
    tech: ["Python", "Playwright", "FastAPI", "MongoDB"],
    dim: "1024x1024",
    label: "SCRAPE_PIPELINE"
  },
  {
    id: "NODE_005",
    title: "Component Library Boilerplate",
    category: "frontend",
    desc: "A production-ready UI boilerplate featuring strict CSS variable design systems, micro-interactions, responsive bracket widgets, and comprehensive accessibility hooks.",
    tech: ["TypeScript", "Vanilla CSS", "HTML5 Canvas"],
    dim: "1280x800",
    label: "COMP_BOILER"
  },
  {
    id: "NODE_006",
    title: "Distributed Pipeline Router",
    category: "backend",
    desc: "Message-broker pipeline facilitating cross-origin API data mapping. Features detailed system diagnostics telemetry logs and micro-second message processing loops.",
    tech: ["Go", "RabbitMQ", "Prometheus", "Kubernetes"],
    dim: "1920x1080",
    label: "DISTRIB_ROUTE"
  },
  {
    id: "NODE_007",
    title: "Architectural Layout System",
    category: "brand",
    desc: "Print-ready and digital editorial wireframe layout models optimized for heavy text grids and diagram structures. Includes customized mathematical font pairing formulas.",
    tech: ["Typography Guidelines", "Illustrator", "Grid Systems"],
    dim: "1600x1200",
    label: "ARCH_LAYOUT"
  },
  {
    id: "NODE_008",
    title: "Autonomous Agent Evaluator",
    category: "ai",
    desc: "Interactive evaluation dashboard and pipeline assessing conversational LLM accuracy. Allows developers to trigger automated test suites and inspect structured reports.",
    tech: ["Python", "LangChain", "OpenAI API", "Svelte"],
    dim: "1440x950",
    label: "AI_EVAL_AGENT"
  }
];

// -------------------------------------------------------------
// STATE VARIABLES
// -------------------------------------------------------------
let activeFilter = 'all';
let visibleCount = 6;
let isPageRouting = false;
let conceptMode = 'wireframe';
let terminalContactState = {
  step: 'idle',
  name: '',
  email: '',
  msg: '',
  subject: '',
  totalCost: null
};

function getCategoryGradient(category) {
  if (category === 'frontend') return 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)';
  if (category === 'backend') return 'linear-gradient(135deg, #1e293b 0%, #10b981 100%)';
  if (category === 'brand') return 'linear-gradient(135deg, #f97316 0%, #ec4899 100%)';
  return 'linear-gradient(135deg, #d946ef 0%, #4f46e5 100%)';
}

// -------------------------------------------------------------
// CLIENT-SIDE ROUTER WITH DIAGNOSTIC LOADER
// -------------------------------------------------------------
function initRouter() {
  function handleHashChange() {
    let hash = window.location.hash || '#home';
    let targetPage = hash.substring(1);
    
    const targetEl = document.getElementById(`view-${targetPage}`);
    if (targetEl) {
      navigateToPage(targetPage);
    } else {
      window.location.hash = '#home';
    }
  }

  window.addEventListener('hashchange', handleHashChange);
  handleHashChange();
}

function navigateToPage(pageId) {
  if (isPageRouting) return;
  isPageRouting = true;

  const loader = document.getElementById('page-loader');
  const bar = document.getElementById('loader-bar-inner');
  const log = document.getElementById('loader-log');
  const targetView = document.getElementById(`view-${pageId}`);
  
  const logs = [
    "ALLOCATING_MEMORY...",
    "RESOLVING_BLUEPRINT_DEPENDENCIES...",
    "PARSING_WIREFRAME_COORDINATES...",
    "SYNCING_CSS_VARIABLES...",
    "RENDER_SEQUENCE_SUCCESS!"
  ];

  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${pageId}`) {
      link.classList.add('active');
    }
  });

  document.querySelectorAll('.mobile-drawer-link').forEach(btn => {
    btn.classList.remove('active');
    if (btn.getAttribute('href') === `#${pageId}`) {
      btn.classList.add('active');
    }
  });

  loader.classList.add('active');
  bar.style.width = '0%';
  
  let progress = 0;
  let logIdx = 0;

  function loadStep() {
    progress += Math.floor(Math.random() * 15) + 10;
    if (progress > 100) progress = 100;
    
    bar.style.width = `${progress}%`;
    
    if (logIdx < logs.length && progress >= (logIdx + 1) * 20) {
      log.textContent = logs[logIdx];
      logIdx++;
    }

    if (progress < 100) {
      setTimeout(loadStep, 80);
    } else {
      setTimeout(() => {
        document.querySelectorAll('.page-view').forEach(view => {
          view.classList.remove('active');
        });
        targetView.classList.add('active');
        
        const nodeTelemetry = document.getElementById('telemetry-node');
        if (nodeTelemetry) {
          nodeTelemetry.textContent = `${pageId.toUpperCase()}_PAGE`;
        }

        loader.classList.remove('active');
        isPageRouting = false;
        window.scrollTo(0, 0);
        
        printTerminalLine(`SYSTEM_ROUTER: Active view altered to node [${pageId.toUpperCase()}];`);
      }, 150);
    }
  }

  loadStep();
}

// -------------------------------------------------------------
// TELEMETRY MONITOR SYSTEM
// -------------------------------------------------------------
function initTelemetry() {
  const vpLabel = document.getElementById('telemetry-viewport');
  const scrollLabel = document.getElementById('telemetry-scroll');
  const cursorLabel = document.getElementById('telemetry-cursor');

  function updateViewport() {
    vpLabel.textContent = `${window.innerWidth}px × ${window.innerHeight}px`;
  }
  window.addEventListener('resize', updateViewport);
  updateViewport();

  window.addEventListener('scroll', () => {
    const scrollPercent = Math.round(
      (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    ) || 0;
    scrollLabel.textContent = `${scrollPercent}%`;
    
    updateActiveNavHighlight();
  });

  window.addEventListener('mousemove', (e) => {
    cursorLabel.textContent = `X:${e.clientX}, Y:${e.clientY}`;
  });
}

function updateActiveNavHighlight() {
  const sections = ['home', 'services', 'gallery', 'about', 'contact'];
  const scrollPos = window.scrollY + 200;
  
  sections.forEach(secId => {
    const el = document.getElementById(`view-${secId}`);
    if (el) {
      const top = el.offsetTop;
      const bottom = top + el.offsetHeight;
      if (scrollPos >= top && scrollPos < bottom) {
        document.querySelectorAll('.nav-link').forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${secId}`) {
            link.classList.add('active');
          }
        });
        document.querySelectorAll('.mobile-drawer-link').forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${secId}`) {
            link.classList.add('active');
          }
        });
      }
    }
  });
}

// -------------------------------------------------------------
// DUAL CONCEPT MODE SWITCHER LOGIC
// -------------------------------------------------------------
function initConceptSwitcher() {
  const toggleBtn = document.getElementById('concept-toggle');
  const label = document.getElementById('concept-label');
  const telemetryVal = document.getElementById('telemetry-concept');

  if (!toggleBtn) return;

  function setConceptMode(mode) {
    conceptMode = mode;
    localStorage.setItem('conceptMode', mode);

    if (mode === 'production') {
      document.documentElement.classList.add('production-mode');
      label.textContent = 'PRODUCTION';
      telemetryVal.textContent = 'PRODUCTION';
      printTerminalLine('SYS_CONCEPT: Concept mode set to PRODUCTION (High-Fidelity UI);');
    } else {
      document.documentElement.classList.remove('production-mode');
      label.textContent = 'WIREFRAME';
      telemetryVal.textContent = 'WIREFRAME';
      printTerminalLine('SYS_CONCEPT: Concept mode set to WIREFRAME (Blueprint System);');
    }

    renderGallery();
  }

  toggleBtn.addEventListener('click', () => {
    const nextMode = (conceptMode === 'wireframe') ? 'production' : 'wireframe';
    setConceptMode(nextMode);
  });

  const initialMode = localStorage.getItem('conceptMode') || 'wireframe';
  setConceptMode(initialMode);
}

// -------------------------------------------------------------
// THEME & GRID TOGGLES
// -------------------------------------------------------------
function initThemeAndGrid() {
  const themeBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const gridBtn = document.getElementById('grid-toggle');
  
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.classList.add(savedTheme);
  themeIcon.textContent = savedTheme === 'dark' ? 'light_mode' : 'dark_mode';

  themeBtn.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    const newTheme = isDark ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    themeIcon.textContent = isDark ? 'light_mode' : 'dark_mode';
    printTerminalLine(`SYSTEM_CONFIG: Switch mode to ${newTheme.toUpperCase()};`);
  });

  gridBtn.addEventListener('click', () => {
    const body = document.body;
    const hasGrid = body.classList.toggle('bg-dot-matrix');
    printTerminalLine(`SYS_VISUAL: Dot matrix grid is now ${hasGrid ? 'ENABLED' : 'DISABLED'};`);
  });
}

// -------------------------------------------------------------
// MOBILE DRAWER NAVIGATION CONTROLLER
// -------------------------------------------------------------
function initMobileDrawer() {
  const trigger = document.getElementById('mobile-menu-trigger');
  const closeBtn = document.getElementById('mobile-drawer-close');
  const backdrop = document.getElementById('mobile-drawer-backdrop');
  const drawer = document.getElementById('mobile-drawer');

  if (!trigger) return;

  function openDrawer() {
    drawer.classList.add('active');
    backdrop.classList.add('active');
    printTerminalLine('SYS_DRAWER: Opened mobile navigation index drawer;');
  }

  function closeDrawer() {
    drawer.classList.remove('active');
    backdrop.classList.remove('active');
  }

  trigger.addEventListener('click', openDrawer);
  closeBtn.addEventListener('click', closeDrawer);
  backdrop.addEventListener('click', closeDrawer);

  // Close when links are clicked
  document.querySelectorAll('.mobile-drawer-link').forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });
}

// -------------------------------------------------------------
// HERO TYPEWRITER EFFECT
// -------------------------------------------------------------
function initTypewriter() {
  const textEl = document.getElementById('typewriter-text');
  if (!textEl) return;
  
  const phrases = [
    'FRONTEND LAYOUTS',
    'BACKEND SYSTEMS',
    'BRAND UTILITIES',
    'AI AUTOMATIONS',
    'BLUEPRINT CODES'
  ];
  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function type() {
    const currentPhrase = phrases[phraseIdx];
    
    if (isDeleting) {
      textEl.textContent = currentPhrase.substring(0, charIdx - 1);
      charIdx--;
      typeSpeed = 40;
    } else {
      textEl.textContent = currentPhrase.substring(0, charIdx + 1);
      charIdx++;
      typeSpeed = 100;
    }

    if (!isDeleting && charIdx === currentPhrase.length) {
      isDeleting = true;
      typeSpeed = 2000;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      typeSpeed = 400;
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

// -------------------------------------------------------------
// INTERACTIVE PRICING ESTIMATOR
// -------------------------------------------------------------
function initEstimator() {
  const capFrontend = document.getElementById('cap-frontend');
  const capBackend = document.getElementById('cap-backend');
  const capBrand = document.getElementById('cap-brand');
  const capAi = document.getElementById('cap-ai');

  const paramPages = document.getElementById('param-pages');
  const paramComplexity = document.getElementById('param-complexity');

  const rangeValPages = document.getElementById('range-val-pages');
  const rangeValComplexity = document.getElementById('range-val-complexity');

  const invoiceItems = document.getElementById('invoice-items');
  const invoiceTotalAmount = document.getElementById('invoice-total-amount');
  const btnLockEstimate = document.getElementById('btn-lock-estimate');

  if (!capFrontend) return;

  const baseRates = {
    frontend: 3000,
    backend: 4000,
    brand: 2000,
    ai: 5000,
    page: 200
  };

  function updateEstimate() {
    let itemsHtml = '';
    let subtotal = 0;

    if (capFrontend.checked) {
      itemsHtml += `<div class="invoice-row"><span>Frontend Architecture</span><span>$${baseRates.frontend.toLocaleString()}</span></div>`;
      subtotal += baseRates.frontend;
      document.getElementById('label-cap-frontend').classList.add('checked');
    } else {
      document.getElementById('label-cap-frontend').classList.remove('checked');
    }

    if (capBackend.checked) {
      itemsHtml += `<div class="invoice-row"><span>Backend Database</span><span>$${baseRates.backend.toLocaleString()}</span></div>`;
      subtotal += baseRates.backend;
      document.getElementById('label-cap-backend').classList.add('checked');
    } else {
      document.getElementById('label-cap-backend').classList.remove('checked');
    }

    if (capBrand.checked) {
      itemsHtml += `<div class="invoice-row"><span>Brand Identity Package</span><span>$${baseRates.brand.toLocaleString()}</span></div>`;
      subtotal += baseRates.brand;
      document.getElementById('label-cap-brand').classList.add('checked');
    } else {
      document.getElementById('label-cap-brand').classList.remove('checked');
    }

    if (capAi.checked) {
      itemsHtml += `<div class="invoice-row"><span>AI Scraper / Agent Node</span><span>$${baseRates.ai.toLocaleString()}</span></div>`;
      subtotal += baseRates.ai;
      document.getElementById('label-cap-ai').classList.add('checked');
    } else {
      document.getElementById('label-cap-ai').classList.remove('checked');
    }

    const pages = parseInt(paramPages.value);
    const pagesCost = pages * baseRates.page;
    rangeValPages.textContent = `${pages} Page${pages > 1 ? 's' : ''}`;
    itemsHtml += `<div class="invoice-row"><span>Page Allocation (${pages} Nodes)</span><span>$${pagesCost.toLocaleString()}</span></div>`;
    subtotal += pagesCost;

    const complexityVal = parseInt(paramComplexity.value);
    let multiplier = 1.0;
    let complexityLabel = 'Standard (1.0x)';
    if (complexityVal === 2) {
      multiplier = 1.5;
      complexityLabel = 'Advanced (1.5x)';
    } else if (complexityVal === 3) {
      multiplier = 2.0;
      complexityLabel = 'Enterprise (2.0x)';
    }
    rangeValComplexity.textContent = complexityLabel;

    const total = subtotal * multiplier;

    itemsHtml += `<div class="invoice-row" style="color: var(--secondary); font-size: 11px;"><span>Subtotal</span><span>$${subtotal.toLocaleString()}</span></div>`;
    if (multiplier > 1.0) {
      itemsHtml += `<div class="invoice-row" style="color: var(--accent);"><span>Complexity Modifier</span><span>${multiplier}x</span></div>`;
    }

    invoiceItems.innerHTML = itemsHtml;
    invoiceTotalAmount.textContent = `$${Math.round(total).toLocaleString()}`;
    return { subtotal, total, pages, complexityLabel };
  }

  [capFrontend, capBackend, capBrand, capAi].forEach(chk => {
    chk.addEventListener('change', () => {
      if (!capFrontend.checked && !capBackend.checked && !capBrand.checked && !capAi.checked) {
        chk.checked = true;
      }
      updateEstimate();
    });
  });

  paramPages.addEventListener('input', updateEstimate);
  paramComplexity.addEventListener('input', updateEstimate);

  btnLockEstimate.addEventListener('click', () => {
    const config = updateEstimate();
    let servicesList = [];
    if (capFrontend.checked) servicesList.push('Frontend');
    if (capBackend.checked) servicesList.push('Backend');
    if (capBrand.checked) servicesList.push('Brand');
    if (capAi.checked) servicesList.push('AI');

    const totalCostRounded = Math.round(config.total);

    const formSubject = document.getElementById('f-subject');
    const formBudget = document.getElementById('f-budget');
    const formBudgetValue = document.getElementById('budget-value');
    const formMessage = document.getElementById('f-message');

    if (capAi.checked) formSubject.value = 'AI Integration';
    else if (capBackend.checked) formSubject.value = 'Fullstack Database';
    else if (capFrontend.checked) formSubject.value = 'Frontend Development';
    else formSubject.value = 'General Consultation';

    const clampedBudget = Math.min(Math.max(totalCostRounded, 1000), 50000);
    formBudget.value = clampedBudget;
    formBudgetValue.textContent = `$${Math.round(clampedBudget/1000)}k`;

    formMessage.value = `System Blueprint Estimate Compiled:\n- Selected Nodes: ${servicesList.join(' + ')}\n- Estimated Allocations: ${config.pages} Pages\n- System Complexity: ${config.complexityLabel}\n- Calculated Cost: $${totalCostRounded.toLocaleString()}`;

    printTerminalLine(`SYS_ESTIMATE: Auto-populating client contact payload structure;`);
    printTerminalLine(`SYS_ESTIMATE: Total Cost calculated: $${totalCostRounded.toLocaleString()};`);

    window.location.hash = '#contact';
  });

  updateEstimate();
}

// -------------------------------------------------------------
// PORTFOLIO REGISTRY & FILTERS (GALLERY)
// -------------------------------------------------------------
function renderGallery() {
  const container = document.getElementById('gallery-container');
  const counter = document.getElementById('gallery-counter');
  
  if (!container) return;

  const filtered = PROJECTS_DATA.filter(item => {
    if (activeFilter === 'all') return true;
    return item.category === activeFilter;
  });

  const displayed = filtered.slice(0, visibleCount);
  const isProduction = document.documentElement.classList.contains('production-mode');

  container.innerHTML = displayed.map(item => {
    const inlineStyle = isProduction ? `style="background: ${getCategoryGradient(item.category)}; border-color: transparent;"` : '';
    const labelLabel = isProduction ? `${item.title.toUpperCase()}` : item.label;

    return `
      <div class="gallery-item" data-id="${item.id}">
        <div class="wireframe-placeholder font-mono text-center" ${inlineStyle}>
          <div class="center-label">${labelLabel}</div>
          <div style="position: absolute; bottom: 8px; right: 8px; font-size: 8px; color: ${isProduction ? '#ffffff' : 'var(--secondary)'}; opacity: 0.7;">
            ${item.dim}
          </div>
        </div>
        <div class="gallery-meta">
          <span class="label-caps" style="font-size: 11px; color: var(--primary);">${item.title}</span>
          <span class="font-mono text-secondary" style="font-size: 10px;">ID: ${item.id} // CAT: ${item.category.toUpperCase()}</span>
        </div>
      </div>
    `;
  }).join('');

  if (counter) {
    counter.textContent = `DISPLAYING: ${displayed.length.toString().padStart(2, '0')} / ${filtered.length.toString().padStart(2, '0')} NODES`;
  }

  const loadMoreBtn = document.getElementById('btn-load-more');
  if (loadMoreBtn) {
    if (displayed.length >= filtered.length) {
      loadMoreBtn.style.display = 'none';
    } else {
      loadMoreBtn.style.display = 'block';
    }
  }

  document.querySelectorAll('.gallery-item').forEach(card => {
    card.addEventListener('click', () => {
      const projId = card.getAttribute('data-id');
      openProjectDrawer(projId);
    });
  });
}

// -------------------------------------------------------------
// FILTER CONTROLLERS
// -------------------------------------------------------------
function initFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  if (filterBtns.length === 0) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.getAttribute('data-filter');
      visibleCount = 6;
      renderGallery();
      printTerminalLine(`SYS_GALLERY: Active directory filtered [${activeFilter.toUpperCase()}];`);
    });
  });

  document.getElementById('btn-load-more').addEventListener('click', () => {
    visibleCount += 6;
    renderGallery();
    printTerminalLine(`SYS_GALLERY: Requesting next visual index nodes;`);
  });
}

// -------------------------------------------------------------
// DETAILS SIDE DRAWER SYSTEM
// -------------------------------------------------------------
function openProjectDrawer(projId) {
  const proj = PROJECTS_DATA.find(p => p.id === projId);
  if (!proj) return;

  const isProduction = document.documentElement.classList.contains('production-mode');
  const drawerImage = document.getElementById('drawer-image-placeholder');

  document.getElementById('drawer-project-id').textContent = proj.id;
  document.getElementById('drawer-title').textContent = proj.title;
  document.getElementById('drawer-category').textContent = `CATEGORY // ${proj.category.toUpperCase()}`;
  document.getElementById('drawer-image-label').textContent = isProduction ? proj.title.toUpperCase() : proj.label;
  document.getElementById('drawer-desc').textContent = proj.desc;
  
  if (isProduction) {
    drawerImage.style.background = getCategoryGradient(proj.category);
    drawerImage.style.borderColor = 'transparent';
  } else {
    drawerImage.style.background = '';
    drawerImage.style.borderColor = '';
  }

  const stackContainer = document.getElementById('drawer-stack');
  stackContainer.innerHTML = proj.tech.map(t => `<span class="tech-tag">${t}</span>`).join('');

  document.getElementById('side-drawer').classList.add('active');
  document.getElementById('drawer-backdrop').classList.add('active');
  printTerminalLine(`SYS_DRAWER: Populated specs for node [${proj.id}];`);
}

function initDrawer() {
  const closeBtn = document.getElementById('drawer-close');
  const backdrop = document.getElementById('drawer-backdrop');

  if (!closeBtn) return;

  function close() {
    document.getElementById('side-drawer').classList.remove('active');
    backdrop.classList.remove('active');
  }

  closeBtn.addEventListener('click', close);
  backdrop.addEventListener('click', close);
}

window.openProjectDrawer = openProjectDrawer;

// -------------------------------------------------------------
// BRUTALIST FORM INTERACTION
// -------------------------------------------------------------
function initContactForm() {
  const budgetSlider = document.getElementById('f-budget');
  const budgetValue = document.getElementById('budget-value');
  const submitBtn = document.getElementById('btn-submit-form');

  if (!budgetSlider) return;

  budgetSlider.addEventListener('input', () => {
    const val = parseInt(budgetSlider.value);
    if (val >= 1000) {
      budgetValue.textContent = `$${Math.round(val / 1000)}k`;
    }
  });

  submitBtn.addEventListener('click', () => {
    const name = document.getElementById('f-name').value.trim();
    const email = document.getElementById('f-email').value.trim();
    const subject = document.getElementById('f-subject').value;
    const budgetVal = budgetSlider.value;
    const msg = document.getElementById('f-message').value.trim();

    if (!name || !email || !msg) {
      printTerminalLine("ERROR: INCOMPLETE PAYLOAD PARAMETERS.", "#ba1a1a");
      alert("Please populate all required fields.");
      return;
    }

    terminalContactState = {
      step: 'submitting',
      services: [subject],
      pages: null,
      complexity: null,
      totalCost: parseInt(budgetVal),
      name: name,
      email: email,
      msg: msg
    };

    printTerminalLine("-----------------------------------------------------", "#a1a1a1");
    printTerminalLine("INCOMING INQUIRY VIA SECURE PAYLOAD FORM...", "#ffd700");
    printTerminalLine(`NAME  : ${name}`);
    printTerminalLine(`EMAIL : ${email}`);
    printTerminalLine(`TYPE  : ${subject}`);
    printTerminalLine(`BUDGET: $${parseInt(budgetVal).toLocaleString()}`);
    
    compileInquiry();

    document.getElementById('f-name').value = '';
    document.getElementById('f-email').value = '';
    document.getElementById('f-message').value = '';
  });
}

// -------------------------------------------------------------
// TERMINAL SIMULATOR
// -------------------------------------------------------------
function printTerminalLine(text, colorClass = '') {
  const screen = document.getElementById('terminal-screen');
  if (!screen) return;

  const line = document.createElement('div');
  line.className = 'terminal-line';
  if (colorClass) {
    line.style.color = colorClass;
  }
  
  const now = new Date();
  const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
  
  line.textContent = `[${timeStr}] ${text}`;
  screen.appendChild(line);
  screen.scrollTop = screen.scrollHeight;
}

function processCommand(cmdText) {
  const cmd = cmdText.trim().toLowerCase();
  printTerminalLine(`> ${cmdText}`, '#ffffff');

  if (terminalContactState.step !== 'idle') {
    handleWizardInput(cmdText);
    return;
  }

  if (cmd === 'help') {
    printTerminalLine('AVAILABLE SYSTEM COMMANDS:', '#a1a1a1');
    printTerminalLine('  capabilities   : Show technical capabilities');
    printTerminalLine('  work           : Show project registry index');
    printTerminalLine('  estimate       : Route to calculator widget');
    printTerminalLine('  contact        : Start project wizard');
    printTerminalLine('  about          : Output company credentials');
    printTerminalLine('  clear          : Flush terminal logs');
  } else if (cmd === 'clear') {
    const screen = document.getElementById('terminal-screen');
    if (screen) screen.innerHTML = '';
  } else if (cmd === 'capabilities') {
    printTerminalLine('CAPABILITIES CATALOGUE:', '#a1a1a1');
    printTerminalLine('  - FRONTEND_DEV: React/Next.js layout layers');
    printTerminalLine('  - BACKEND_SYS : DB routers and ledgers');
    printTerminalLine('  - BRAND_INFRA : SVG design rules');
    printTerminalLine('  - AI_AUTOMATE : Automation pipelines');
  } else if (cmd === 'about') {
    printTerminalLine('ARCH_SYS COMPANY CREDENTIALS:', '#a1a1a1');
    printTerminalLine('  - Organization: Architecture Systems Collective');
    printTerminalLine('  - Operational : 2022 - PRESENT');
    printTerminalLine('  - Core Stack  : Modular wireframe development');
    printTerminalLine('  - Grid Status : Connected // Online');
  } else if (cmd === 'work') {
    printTerminalLine('PROJECT REGISTRY NODES:', '#a1a1a1');
    PROJECTS_DATA.forEach(p => {
      printTerminalLine(`  - ${p.id} : ${p.title} [${p.category.toUpperCase()}]`);
    });
  } else if (cmd === 'estimate') {
    printTerminalLine('Redirecting to COMPILER configuration panel...');
    window.location.hash = '#services';
  } else if (cmd === 'contact') {
    startTerminalWizard();
  } else {
    printTerminalLine(`UNRECOGNIZED ACTION: "${cmdText}". Initializing contact sequence...`);
    startTerminalWizard([], null, null, null, cmdText);
  }
}

function startTerminalWizard(servicesList = [], pages = null, complexity = null, total = null, initialMsg = '') {
  terminalContactState = {
    step: 'awaiting_name',
    services: servicesList,
    pages: pages,
    complexity: complexity,
    totalCost: total,
    name: '',
    email: '',
    msg: initialMsg
  };

  printTerminalLine('-----------------------------------------------------', '#a1a1a1');
  printTerminalLine('LAUNCHING CONTACT COMPILER MODULE...', '#ffd700');
  
  if (total) {
    printTerminalLine(`ATTACHED ESTIMATE: $${total.toLocaleString()}`);
  }
  if (initialMsg) {
    printTerminalLine(`INQUIRY: "${initialMsg}"`);
  }

  printTerminalLine('Enter client name to initialize identity blueprint:');
}

function handleWizardInput(input) {
  if (terminalContactState.step === 'awaiting_name') {
    terminalContactState.name = input;
    terminalContactState.step = 'awaiting_email';
    printTerminalLine(`CLIENT_NAME REGISTERED: ${input}`, '#ffd700');
    printTerminalLine('Enter client email address for transport payload:');
  } else if (terminalContactState.step === 'awaiting_email') {
    if (!input.includes('@') || !input.includes('.')) {
      printTerminalLine('ERROR: INVALID TRANSPORT FORMAT. Re-enter valid email:', '#ba1a1a');
      return;
    }
    terminalContactState.email = input;
    
    if (terminalContactState.msg) {
      compileInquiry();
    } else {
      terminalContactState.step = 'awaiting_msg';
      printTerminalLine(`CLIENT_EMAIL REGISTERED: ${input}`, '#ffd700');
      printTerminalLine('Enter your detailed project parameters or message:');
    }
  } else if (terminalContactState.step === 'awaiting_msg') {
    terminalContactState.msg = input;
    compileInquiry();
  }
}

function compileInquiry() {
  terminalContactState.step = 'submitting';
  printTerminalLine('COMPILING TRANSMISSION DATA PACKET...', '#a1a1a1');
  
  let progress = 0;
  function updateProgress() {
    progress += 20;
    const bar = '='.repeat(progress / 10) + '>';
    printTerminalLine(`COMPILE_STATUS: [${bar.padEnd(11, ' ')}] ${progress}%`);
    
    if (progress < 100) {
      setTimeout(updateProgress, 150);
    } else {
      finalizeInquiry();
    }
  }
  
  setTimeout(updateProgress, 150);
}

function finalizeInquiry() {
  printTerminalLine('-----------------------------------------------------', '#a1a1a1');
  printTerminalLine('TRANSMISSION SUCCESSFUL // NODE ALIGNED', '#00ff66');
  printTerminalLine(`PAYLOAD: Name: ${terminalContactState.name} // Email: ${terminalContactState.email}`);
  
  if (terminalContactState.totalCost) {
    printTerminalLine(`EST_VALUATION: $${terminalContactState.totalCost.toLocaleString()}`);
  }
  
  printTerminalLine('Our coordinator node will reach out within 24 hours.', '#00ff66');
  printTerminalLine('Type "clear" or "help" to reset terminal session.');
  
  terminalContactState.step = 'idle';
}

function initTerminal() {
  const cmdInput = document.getElementById('terminal-cmd');
  if (!cmdInput) return;

  cmdInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && cmdInput.value.trim() !== '') {
      processCommand(cmdInput.value);
      cmdInput.value = '';
    }
  });
}

// -------------------------------------------------------------
// MODULE INITS
// -------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  initTelemetry();
  initThemeAndGrid();
  initTypewriter();
  initEstimator();
  initFilters();
  initDrawer();
  initContactForm();
  initTerminal();
  initRouter();
  initConceptSwitcher();
  initMobileDrawer(); // Initialize slide-out mobile drawer listeners
  
  console.log("ARCH_SYS: Core rendering sequence initiated.");
  console.log("MODE: Multi-view Routing Wireframe System.");
});
