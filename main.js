// -------------------------------------------------------------
// PROJECT DATABASE (GALLERY NODES)
// -------------------------------------------------------------
const PROJECTS_DATA = [
  {
    id: "NODE_001",
    title: "Taman Nasional Raja Ampat",
    category: "beach",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    tech: ["Papua Barat", "Diving", "Pulau Karang", "Speedboat"],
    dim: "0°30'S 130°0'E",
    label: "RAJA_AMPAT",
    image: "https://images.unsplash.com/photo-1516690561799-46d8f74f90f6?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "NODE_002",
    title: "Gunung Bromo & Tengger",
    category: "mountain",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    tech: ["Jawa Timur", "Hiking", "Kawah Aktif", "Jeep 4x4"],
    dim: "7°56'S 112°57'E",
    label: "BROMO_MTN",
    image: "https://images.unsplash.com/photo-1604999333679-b86d54738315?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "NODE_003",
    title: "Candi Borobudur Megah",
    category: "culture",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    tech: ["Jawa Tengah", "Sejarah", "Edukasi", "Candi Buddha"],
    dim: "7°36'S 110°12'E",
    label: "BOROBUDUR",
    image: "https://images.unsplash.com/photo-1584810359583-96fc3448beaa?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "NODE_004",
    title: "Pulau Komodo & Padar",
    category: "adventure",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    tech: ["Nusa Tenggara Timur", "Fauna", "Trekking", "Pink Beach"],
    dim: "8°35'S 119°29'E",
    label: "KOMODO_ISL",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "NODE_005",
    title: "Pantai Kuta & Nusa Penida",
    category: "beach",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    tech: ["Bali", "Pantai Pasir Putih", "Surfing", "Sunset View"],
    dim: "8°43'S 115°10'E",
    label: "BALI_BEACH",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "NODE_006",
    title: "Pendakian Gunung Rinjani",
    category: "mountain",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    tech: ["Nusa Tenggara Barat", "Trekking Ekstrim", "Danau Segara Anak", "Camping"],
    dim: "8°25'S 116°27'E",
    label: "RINJANI_MTN",
    image: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "NODE_007",
    title: "Desa Adat Tana Toraja",
    category: "culture",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    tech: ["Sulawesi Selatan", "Rumah Tongkonan", "Upacara Rambu Solo", "Budaya Leluhur"],
    dim: "3°0'S 119°50'E",
    label: "TORATORAJA",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "NODE_008",
    title: "Danau Toba & Samosir",
    category: "adventure",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    tech: ["Sumatera Utara", "Danau Vulkanik", "Budaya Batak", "Kapal Feri"],
    dim: "2°40'N 98°50'E",
    label: "LAKE_TOBA",
    image: "https://images.unsplash.com/photo-1626125345510-4603468eedfb?auto=format&fit=crop&w=800&q=80"
  }
];

// -------------------------------------------------------------
// STATE VARIABLES
// -------------------------------------------------------------
let activeFilter = 'all';
let visibleCount = 6;
let isPageRouting = false;
let conceptMode = 'production';
let terminalContactState = {
  step: 'idle',
  name: '',
  email: '',
  msg: '',
  subject: '',
  totalCost: null
};

function getCategoryGradient(category) {
  if (category === 'beach') return 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)'; // Sea blue
  if (category === 'mountain') return 'linear-gradient(135deg, #10b981 0%, #047857 100%)'; // Emerald green
  if (category === 'culture') return 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'; // Warm amber
  return 'linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)'; // Purple adventure
}

// -------------------------------------------------------------
// CLIENT-SIDE ROUTER WITH DIAGNOSTIC LOADER
// -------------------------------------------------------------
function initRouter() {
  function handleHashChange() {
    let hash = window.location.hash || '#dashboard';
    let targetPage = hash.substring(1);
    
    const targetEl = document.getElementById(`view-${targetPage}`);
    if (targetEl) {
      navigateToPage(targetPage);
    } else {
      window.location.hash = '#dashboard';
    }
  }

  window.addEventListener('hashchange', handleHashChange);
  handleHashChange();
}

function navigateToPage(pageId) {
  const targetView = document.getElementById(`view-${pageId}`);
  if (!targetView) return;

  if (pageId === 'dashboard') {
    document.body.classList.add('dashboard-active');
  } else {
    document.body.classList.remove('dashboard-active');
  }

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

  document.querySelectorAll('.page-view').forEach(view => {
    view.classList.remove('active');
  });
  targetView.classList.add('active');
  
  window.scrollTo(0, 0);
  printTerminalLine(`SYSTEM_ROUTER: Active view altered to node [${pageId.toUpperCase()}];`);
}

// -------------------------------------------------------------
// TELEMETRY MONITOR SYSTEM
// -------------------------------------------------------------


function updateActiveNavHighlight() {
  if (window.location.hash === '#dashboard' || !window.location.hash) return;
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
  conceptMode = 'production';
  document.documentElement.classList.add('production-mode');
  renderGallery();
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
    'DESTINASI INDAH',
    'PEMANDU LOKAL',
    'PAKET WISATA',
    'AKOMODASI NYAMAN',
    'PETUALANGAN BARU'
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
    frontend: 1500000, // Penginapan & Hotel
    backend: 500000,   // Transportasi
    brand: 300000,     // Pemandu Wisata
    ai: 800000,        // Dokumentasi
    page: 250000       // Biaya dasar harian
  };

  function updateEstimate() {
    let itemsHtml = '';
    let subtotal = 0;

    if (capFrontend.checked) {
      itemsHtml += `<div class="invoice-row"><span>Penginapan & Hotel</span><span>Rp ${baseRates.frontend.toLocaleString('id-ID')}</span></div>`;
      subtotal += baseRates.frontend;
      document.getElementById('label-cap-frontend').classList.add('checked');
    } else {
      document.getElementById('label-cap-frontend').classList.remove('checked');
    }

    if (capBackend.checked) {
      itemsHtml += `<div class="invoice-row"><span>Transportasi & Mobil</span><span>Rp ${baseRates.backend.toLocaleString('id-ID')}</span></div>`;
      subtotal += baseRates.backend;
      document.getElementById('label-cap-backend').classList.add('checked');
    } else {
      document.getElementById('label-cap-backend').classList.remove('checked');
    }

    if (capBrand.checked) {
      itemsHtml += `<div class="invoice-row"><span>Pemandu Wisata Lokal</span><span>Rp ${baseRates.brand.toLocaleString('id-ID')}</span></div>`;
      subtotal += baseRates.brand;
      document.getElementById('label-cap-brand').classList.add('checked');
    } else {
      document.getElementById('label-cap-brand').classList.remove('checked');
    }

    if (capAi.checked) {
      itemsHtml += `<div class="invoice-row"><span>Dokumentasi & Foto</span><span>Rp ${baseRates.ai.toLocaleString('id-ID')}</span></div>`;
      subtotal += baseRates.ai;
      document.getElementById('label-cap-ai').classList.add('checked');
    } else {
      document.getElementById('label-cap-ai').classList.remove('checked');
    }

    const pages = parseInt(paramPages.value);
    const pagesCost = pages * baseRates.page;
    rangeValPages.textContent = `${pages} Hari`;
    itemsHtml += `<div class="invoice-row"><span>Durasi Trip (${pages} Hari)</span><span>Rp ${pagesCost.toLocaleString('id-ID')}</span></div>`;
    subtotal += pagesCost;

    const complexityVal = parseInt(paramComplexity.value);
    let multiplier = 1.0;
    let complexityLabel = 'Standard (1.0x)';
    if (complexityVal === 2) {
      multiplier = 1.5;
      complexityLabel = 'Premium (1.5x)';
    } else if (complexityVal === 3) {
      multiplier = 2.0;
      complexityLabel = 'Luxury (2.0x)';
    }
    rangeValComplexity.textContent = complexityLabel;

    const total = subtotal * multiplier;

    itemsHtml += `<div class="invoice-row" style="color: var(--secondary); font-size: 11px;"><span>Subtotal</span><span>Rp ${subtotal.toLocaleString('id-ID')}</span></div>`;
    if (multiplier > 1.0) {
      itemsHtml += `<div class="invoice-row" style="color: var(--secondary);"><span>Pengali Kelas Fasilitas</span><span>${multiplier}x</span></div>`;
    }

    invoiceItems.innerHTML = itemsHtml;
    invoiceTotalAmount.textContent = `Rp ${Math.round(total).toLocaleString('id-ID')}`;
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
    if (capFrontend.checked) servicesList.push('Akomodasi');
    if (capBackend.checked) servicesList.push('Transportasi');
    if (capBrand.checked) servicesList.push('Pemandu Wisata');
    if (capAi.checked) servicesList.push('Dokumentasi');

    const totalCostRounded = Math.round(config.total);

    const formSubject = document.getElementById('f-subject');
    const formBudget = document.getElementById('f-budget');
    const formBudgetValue = document.getElementById('budget-value');
    const formMessage = document.getElementById('f-message');

    if (capFrontend.checked && capBackend.checked) formSubject.value = 'Paket Wisata Alam';
    else if (capBrand.checked) formSubject.value = 'Trip Kustom';
    else formSubject.value = 'Paket Wisata Alam'; // Fallback

    const clampedBudget = Math.min(Math.max(totalCostRounded, 1000000), 50000000);
    formBudget.value = clampedBudget;
    formBudgetValue.textContent = `Rp ${Math.round(clampedBudget/1000000)}jt`;

    formMessage.value = `Estimasi Rencana Perjalanan Disusun:\n- Layanan Terpilih: ${servicesList.join(' + ')}\n- Durasi Wisata: ${config.pages} Hari\n- Kelas Fasilitas: ${config.complexityLabel}\n- Perkiraan Anggaran: Rp ${totalCostRounded.toLocaleString('id-ID')}`;

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
    const inlineStyle = isProduction && item.image 
      ? `style="background-image: url('${item.image}'); background-size: cover; background-position: center; border-color: transparent;"` 
      : (isProduction ? `style="background: ${getCategoryGradient(item.category)}; border-color: transparent;"` : '');
    
    // In production mode, we hide the center label so it looks like a clean, high-fidelity gallery image card
    const labelHtml = isProduction ? '' : `<div class="center-label">${item.label}</div>`;

    return `
      <div class="gallery-item" data-id="${item.id}">
        <div class="wireframe-placeholder font-mono text-center" ${inlineStyle}>
          ${labelHtml}
          <div style="position: absolute; bottom: 8px; right: 8px; font-size: 8px; color: #ffffff; text-shadow: 0 1px 3px rgba(0,0,0,0.8); opacity: 0.9; font-weight: bold;">
            ${item.dim}
          </div>
        </div>
        <div class="gallery-meta">
          <span class="label-caps" style="font-size: 13px; font-weight: 600; color: var(--primary);">${item.title}</span>
          <span class="text-secondary" style="font-size: 11px; text-transform: capitalize;">Kategori: ${item.category}</span>
        </div>
      </div>
    `;
  }).join('');

  if (counter) {
    counter.textContent = `Menampilkan: ${displayed.length} / ${filtered.length} Destinasi`;
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
    });
  });

  document.getElementById('btn-load-more').addEventListener('click', () => {
    visibleCount += 6;
    renderGallery();
  });
}

// -------------------------------------------------------------
// DETAILS SIDE DRAWER SYSTEM
// -------------------------------------------------------------
function openProjectDrawer(projId) {
  const proj = PROJECTS_DATA.find(p => p.id === projId);
  if (!proj) return;

  const drawerImage = document.getElementById('drawer-image-placeholder');

  document.getElementById('drawer-title').textContent = proj.title;
  
  const coordsEl = document.getElementById('drawer-location-coords');
  if (coordsEl) {
    coordsEl.textContent = `${proj.tech[0]} (${proj.dim})`;
  }
  
  document.getElementById('drawer-desc').textContent = proj.desc;
  
  if (drawerImage && proj.image) {
    drawerImage.style.background = `url('${proj.image}') center/cover no-repeat`;
    drawerImage.style.borderColor = 'transparent';
  }

  const stackContainer = document.getElementById('drawer-stack');
  // Display only activities/tags, skipping the first element (province)
  stackContainer.innerHTML = proj.tech.slice(1).map(t => `<span class="tech-tag">${t}</span>`).join('');

  document.getElementById('side-drawer').classList.add('active');
  document.getElementById('drawer-backdrop').classList.add('active');
}

function initDrawer() {
  const closeBtn = document.getElementById('drawer-close');
  const backdrop = document.getElementById('drawer-backdrop');
  const inquireBtn = document.getElementById('btn-inquire-drawer');

  if (!closeBtn) return;

  function close() {
    document.getElementById('side-drawer').classList.remove('active');
    backdrop.classList.remove('active');
  }

  closeBtn.addEventListener('click', close);
  backdrop.addEventListener('click', close);
  if (inquireBtn) {
    inquireBtn.addEventListener('click', close);
  }
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
    budgetValue.textContent = `Rp ${Math.round(val / 1000000)}jt`;
  });

  submitBtn.addEventListener('click', () => {
    const name = document.getElementById('f-name').value.trim();
    const email = document.getElementById('f-email').value.trim();
    const subject = document.getElementById('f-subject').value;
    const budgetVal = budgetSlider.value;
    const msg = document.getElementById('f-message').value.trim();

    if (!name || !email || !msg) {
      alert("Harap lengkapi semua bidang isian wajib.");
      return;
    }

    alert(`Terima kasih ${name}, permintaan rencana perjalanan Anda telah kami terima! Kami akan segera menghubungi Anda melalui email ${email}.`);

    document.getElementById('f-name').value = '';
    document.getElementById('f-email').value = '';
    document.getElementById('f-message').value = '';
  });
}

// -------------------------------------------------------------
// TERMINAL SIMULATOR
// -------------------------------------------------------------
function printTerminalLine(text, colorClass = '') {
  console.log(`[Terminal Log]: ${text}`);
}

// -------------------------------------------------------------
// AI DESIGN PROMPTS PLAYGROUND HANDLERS
// -------------------------------------------------------------
function initPromptExplorer() {
  const tabShowcase = document.getElementById('tab-showcase');
  const tabPrompts = document.getElementById('tab-prompts');
  const sectionShowcases = document.getElementById('dashboard-section-showcases');
  const sectionPrompts = document.getElementById('dashboard-section-prompts');

  if (!tabShowcase || !tabPrompts || !sectionShowcases || !sectionPrompts) return;

  // 1. Tab Switching Listeners
  tabShowcase.addEventListener('click', () => {
    tabShowcase.classList.add('active');
    tabPrompts.classList.remove('active');
    sectionShowcases.style.display = 'block';
    sectionPrompts.style.display = 'none';
  });

  tabPrompts.addEventListener('click', () => {
    tabPrompts.classList.add('active');
    tabShowcase.classList.remove('active');
    sectionShowcases.style.display = 'none';
    sectionPrompts.style.display = 'block';
  });
}

// -------------------------------------------------------------
// FLOATING PROMO POPUP
// -------------------------------------------------------------
function initPromoPopup() {
  const popup = document.getElementById('promo-popup');
  const closeBtn = document.getElementById('promo-close');
  if (!popup || !closeBtn) return;

  // Show popup after 3 seconds
  setTimeout(() => {
    if (!sessionStorage.getItem('promo-dismissed')) {
      popup.classList.add('active');
    }
  }, 3000);

  closeBtn.addEventListener('click', () => {
    popup.classList.remove('active');
    sessionStorage.setItem('promo-dismissed', 'true');
  });
}

// -------------------------------------------------------------
// DESTINASI PILIHAN CAROUSEL
// -------------------------------------------------------------
function initCarousel() {
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  const track = document.getElementById('carousel-track');
  const indicators = document.querySelectorAll('.carousel-indicator');
  
  if (!track) return;
  
  let currentSlide = 0;
  const slideCount = document.querySelectorAll('.carousel-slide').length;
  
  function updateCarousel(index) {
    currentSlide = (index + slideCount) % slideCount;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    indicators.forEach((ind, i) => {
      if (i === currentSlide) {
        ind.classList.add('active');
      } else {
        ind.classList.remove('active');
      }
    });
  }
  
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      updateCarousel(currentSlide - 1);
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      updateCarousel(currentSlide + 1);
    });
  }
  
  indicators.forEach((ind, i) => {
    ind.addEventListener('click', () => {
      updateCarousel(i);
    });
  });
}

// -------------------------------------------------------------
// DYNAMIC CANVAS RAIN SIMULATION
// -------------------------------------------------------------
function initRainEffect() {
  const canvas = document.getElementById('hero-rain-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animationId;
  
  function resizeCanvas() {
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
  }
  
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  const particles = [];
  const maxParticles = 100;
  const splashes = [];
  
  class RainDrop {
    constructor() {
      this.reset();
      this.y = Math.random() * canvas.height;
    }
    
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = -20;
      this.length = Math.random() * 15 + 10;
      this.speed = Math.random() * 8 + 6;
      this.weight = Math.random() * 1 + 0.5;
      this.opacity = Math.random() * 0.4 + 0.15;
    }
    
    update() {
      this.y += this.speed;
      this.x += 0.5; // Wind angle
      
      if (this.y > canvas.height) {
        createSplash(this.x, canvas.height);
        this.reset();
      }
    }
    
    draw() {
      const isDark = document.documentElement.classList.contains('dark');
      const isProduction = document.documentElement.classList.contains('production-mode');
      
      let color;
      if (!isProduction) {
        // Wireframe / Blueprint mode: mono rain lines
        color = isDark ? `rgba(255, 255, 255, ${this.opacity})` : `rgba(0, 0, 0, ${this.opacity * 0.8})`;
      } else {
        // High-Fidelity / Production mode: glowing natural cyan/blue rain
        color = isDark ? `rgba(165, 243, 252, ${this.opacity * 1.2})` : `rgba(14, 165, 233, ${this.opacity})`;
      }
      
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = this.weight;
      ctx.lineCap = 'round';
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x + 1, this.y + this.length);
      ctx.stroke();
    }
  }
  
  class Splash {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.vx = Math.random() * 4 - 2;
      this.vy = Math.random() * -3 - 1;
      this.radius = Math.random() * 1.5 + 0.5;
      this.opacity = 0.8;
      this.gravity = 0.15;
    }
    
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vy += this.gravity;
      this.opacity -= 0.05;
    }
    
    draw() {
      const isDark = document.documentElement.classList.contains('dark');
      const isProduction = document.documentElement.classList.contains('production-mode');
      
      let color;
      if (!isProduction) {
        color = isDark ? `rgba(255, 255, 255, ${this.opacity})` : `rgba(0, 0, 0, ${this.opacity})`;
      } else {
        color = isDark ? `rgba(165, 243, 252, ${this.opacity})` : `rgba(14, 165, 233, ${this.opacity})`;
      }
      
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    }
  }
  
  function createSplash(x, y) {
    const count = Math.floor(Math.random() * 3) + 2;
    for (let i = 0; i < count; i++) {
      splashes.push(new Splash(x, y));
    }
  }
  
  for (let i = 0; i < maxParticles; i++) {
    particles.push(new RainDrop());
  }
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    
    for (let i = splashes.length - 1; i >= 0; i--) {
      const s = splashes[i];
      s.update();
      s.draw();
      
      if (s.opacity <= 0) {
        splashes.splice(i, 1);
      }
    }
    
    animationId = requestAnimationFrame(animate);
  }
  
  animate();
}

// -------------------------------------------------------------
// MODULE INITS
// -------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  initThemeAndGrid();
  initTypewriter();
  initEstimator();
  initFilters();
  initDrawer();
  initContactForm();
  initRouter();
  initConceptSwitcher();
  initMobileDrawer(); // Initialize slide-out mobile drawer listeners
  initPromptExplorer();
  initPromoPopup();
  initCarousel();
  initRainEffect();
  
  console.log("DRIPCODE: Core rendering sequence initiated.");
  console.log("MODE: Multi-view Routing Wireframe System (Travel Edition).");
});
