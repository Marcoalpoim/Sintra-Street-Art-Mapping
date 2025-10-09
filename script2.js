
// ====== GLOBAL ======
let allProjects = [];
let pckry = null;

// ====== HELPERS ======
function normalizeClassName(str) {
  if (!str && str !== 0) return '';
  return String(str)
    .normalize('NFD')                       // remove accents
    .replace(/[\u0300-\u036f]/g, '')        // strip diacritics
    .toLowerCase()
    .replace(/\s+/g, '-')                   // spaces -> dashes
    .replace(/[^a-z0-9-]/g, '');            // only safe chars
}
function capitalize(s) {
  if (!s) return '';
  s = String(s);
  return s.charAt(0).toUpperCase() + s.slice(1);
}
function waitForImagesIn(elements, timeout = 7000) {
  const imgs = [];
  elements.forEach(el => {
    imgs.push(...Array.from(el.querySelectorAll('img')));
    if (el.tagName === 'IMG') imgs.push(el);
  });
  if (imgs.length === 0) return Promise.resolve();
  const promises = imgs.map(img => new Promise(res => {
    if (img.complete && img.naturalWidth !== 0) return res();
    const done = () => { img.removeEventListener('load', done); img.removeEventListener('error', done); res(); };
    img.addEventListener('load', done);
    img.addEventListener('error', done);
    setTimeout(res, timeout); // fallback
  }));
  return Promise.all(promises);
}

// ====== BUILD DOM FROM projects.json (LOAD ALL) ======
async function loadProjects() {
  try {
    const res = await fetch('projects.json');
    allProjects = await res.json();
  } catch (err) {
    console.error('Failed to load projects.json', err);
    return;
  }

  buildAllProjectItems(allProjects);

  // Wait images for all items, then init Packery
  const grid = document.querySelector('.grid.grid2');
  if (!grid) {
    console.warn('No .grid.grid2 element found.');
    return;
  }

  const items = Array.from(grid.querySelectorAll('.filterDiv'));
  await waitForImagesIn(items);          // wait for images to avoid layout glitches
  initPackery();

  // ensure initial view shows everything and packery is laid out
  filterSelection('all');
}

// create and append all items
function buildAllProjectItems(projects) {
  const container = document.querySelector('.grid.grid2');
  if (!container) return;
  container.innerHTML = '';

  projects.forEach((p, i) => {
    const locationClass = p.location ? normalizeClassName(p.location) : '';
    const tagClasses = (p.tags || []).map(t => normalizeClassName(t)).join(' ');

    const div = document.createElement('div');
    div.className = `filterDiv ${locationClass} ${tagClasses}`.trim();

    div.innerHTML = `
      ${p.hasComments ? `
        <div class="avisoicon">
          <img loading="lazy" src="avisoicon.png" alt="aviso" class="avisoiconimage">
          <div class="avisotext">
            <img loading="lazy" src="avisoicon.png" alt="aviso" class="avisotextimage">
            <p>Esta obra pode conter conteúdos sociopolíticos e culturais</p>
          </div>
        </div>` : ''}

      <div class="sidebar" data-index="${i}" onclick="openPPI(${i})">
        <img loading="lazy" src="${p.image || ''}" alt="${p.location || ''}">
      </div>

      <div class="tagscontainer">
        ${(p.tags || []).map(tag => {
          const nc = normalizeClassName(tag);
          return `<button class="tagbtn tag${nc}" onclick="filterSelection('${nc}')">${capitalize(tag)}</button>`;
        }).join('')}
      </div>

      <div class="nav-links" id="ppi-${i}">
        <div class="ppicontainer">
          <div class="ppi">
            <div class="imagensprojeto">
              <img loading="lazy" src="${p.image || ''}" width="100%">
            </div>
            <div class="informaçaoobra">
              <p class="local">
                <b class="freguesiatitle">${p.location || ''}</b>
                <b class="CloseBTN" onclick="closePPI(${i})">x</b>
              </p>
              <p class="autor"><b>Autor:</b> ${p.author || ''}</p>
              <p class="sub-local"><b>Local:</b> ${p.place || ''}</p>
              <p class="data"><b>Data:</b> ${p.date || ''}</p>
              <p class="categoria"><b>Categoria:</b> ${p.category || ''}</p>
              <div class="tags">
                <b>Tags:</b><br><br>
                <ul>${(p.tags || []).map(t => `<li><a class="ppitags" href="#">${capitalize(t)}</a></li>`).join('')}</ul>
              </div>
            </div>
          </div>

          <div class="localizaçao">
            <div class="textlocalizaçao">Localização</div>
            <div id="map-${i}" class="mapbox"></div>
          </div>
        </div>
      </div>
    `;

    container.appendChild(div);
  });

  // attach global onclicks (freguesia carousel may use inline onclick already)
  attachFreguesiaClicks();
}

// ====== PACKERY INIT & HELPERS ======
function initPackery() {
  const gridElem = document.querySelector('.grid2');
  if (!gridElem) return;

  // if already initialized, reload items & layout
  if (pckry) {
    pckry.reloadItems();
    pckry.layout();
    return;
  }

  // Ensure Packery exists (Packery script must be loaded before this script)
  if (typeof Packery === 'undefined') {
    console.error('Packery is not loaded. Include Packery script before this script.');
    return;
  }

  pckry = new Packery(gridElem, {
    itemSelector: '.filterDiv',
    gutter: 0,
    transitionDuration: '0.2s'
  });

  // add shuffle method if needed
  Packery.prototype.shuffle = function() {
    let m = this.items.length, t, i;
    while (m) {
      i = Math.floor(Math.random() * m--);
      t = this.items[m];
      this.items[m] = this.items[i];
      this.items[i] = t;
    }
    this.layout();
  };

  // when any filter/tag button is clicked, re-layout after short delay
  document.querySelectorAll('.btn, .tagbtn, .freguesiatag').forEach(btn => {
    btn.addEventListener('click', (e) => {
      // let filterSelection handle show/hide and active classes;
      // here we only ensure Packery recalculates afterwards.
      setTimeout(() => {
        if (pckry) {
          pckry.reloadItems();
          pckry.layout();
        }
      }, 120);
    });
  });

  window.addEventListener('resize', () => {
    if (pckry) pckry.layout();
  });

  // final layout call
  setTimeout(() => {
    if (pckry) pckry.reloadItems(), pckry.layout();
  }, 100);
}

// ====== FILTER FUNCTION ======
function filterSelection(category) {
  // category might be a normalized class (kebab-case) OR original string from inline onclick.
  // Normalize:
  const catRaw = (category === undefined || category === null) ? 'all' : category;
  const cat = (String(catRaw) === 'all') ? 'all' : normalizeClassName(catRaw);

  // update active button(s) in the freguesia carousel
  const buttons = document.querySelectorAll('.freguesiatag');
  buttons.forEach(btn => btn.classList.remove('active'));

  // try to find button by id OR onclick content
  const activeBtn = Array.from(buttons).find(btn => {
    // id like "agualva-cacemButton"
    if (btn.id && normalizeClassName(btn.id.replace(/Button$/i, '')) === cat) return true;
    // onclick content like filterSelection('agualva-cacem')
    const onclick = btn.getAttribute('onclick') || '';
    if (onclick.includes(`'${category}'`) || onclick.includes(`"${category}"`)) return true;
    // also check label text normalized
    const txt = normalizeClassName(btn.textContent || btn.innerText || '');
    if (txt === cat) return true;
    return false;
  });
  if (activeBtn) activeBtn.classList.add('active');

  // show/hide items
  const items = document.querySelectorAll('.filterDiv');
  items.forEach(el => {
    if (cat === 'all') {
      el.classList.add('show');
    } else if (el.classList.contains(cat)) {
      el.classList.add('show');
    } else {
      el.classList.remove('show');
    }
  });

  // recalc Packery
  if (pckry) {
    setTimeout(() => {
      pckry.reloadItems();
      pckry.layout();
    }, 120);
  }
}

// ====== PPI (modal) open/close ======
function openPPI(id) {
  const modal = document.getElementById(`ppi-${id}`);
  if (modal) modal.classList.add('active');

  const p = allProjects[id];
  if (!p) return;

  // find matching pointJSON feature (if present) and init map
  setTimeout(() => {
    try {
      const match = (window.pointJSON && pointJSON.features)
        ? pointJSON.features.find(f => f.properties.imglink === p.image)
        : null;
      if (match) {
        const [lng, lat] = match.geometry.coordinates;
        initMapDark(`map-${id}`, lat, lng, match.properties.iconurl, p.image);
      }
    } catch (err) {
      console.warn('Map init skipped (no pointJSON)', err);
    }
  }, 300);
}
function closePPI(id) {
  const modal = document.getElementById(`ppi-${id}`);
  if (modal) modal.classList.remove('active');
}

// ====== MAP helper (Leaflet) ======
function initMapDark(mapId, lat, lng, iconUrl, imageUrl) {
  const container = document.getElementById(mapId);
  if (!container) {
    console.warn('Map container not available yet:', mapId);
    return;
  }
  try {
    const map = L.map(mapId, { center: [lat, lng], zoom: 16 });
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 20
    }).addTo(map);
    const icon = new L.Icon({ iconUrl: iconUrl || 'images/throwup.png', iconSize: [30, 30] });
    L.marker([lat, lng], { icon }).addTo(map).bindPopup(`<img src="${imageUrl}" width="150" style="border-radius:8px;">`);
  } catch (err) {
    console.error('Leaflet init error', err);
  }
}

// attach click handlers for freguesia carousel buttons to smooth-center (optional)
function attachFreguesiaClicks() {
  const carousel = document.getElementById('carousel');
  if (!carousel) return;
  document.querySelectorAll('.freguesiatag').forEach(btn => {
    btn.addEventListener('click', () => {
      // center clicked button in carousel (non-critical)
      setTimeout(() => {
        const active = carousel.querySelector('.freguesiatag.active') || btn;
        const li = active.closest('li');
        if (!li) return;
        const center = li.offsetLeft + li.offsetWidth / 2;
        const scrollTo = Math.max(0, center - carousel.clientWidth / 2);
        carousel.scrollTo({ left: scrollTo, behavior: 'smooth' });
      }, 10);
    });
  });
}

// ====== START ======
document.addEventListener('DOMContentLoaded', () => {
  // Kick it off
  loadProjects();
});

///////////////////////////////////////////////////////////////////////////////////////
{
let svg = document.querySelector("svg");
let as = document.querySelectorAll("#popup");

as.forEach(popup => {
  popup.addEventListener("mouseenter", e => {
    svg.appendChild(popup);
  });
});
}



// Utility function to handle open/close actions
function togglePanel(openSelector, closeSelector, targetSelector, property, openValue, closeValue) {
  const openEl = document.querySelector(openSelector);
  const closeEl = document.querySelector(closeSelector);
  const targetEl = document.querySelector(targetSelector);

  if (openEl && targetEl) {
    openEl.addEventListener("click", () => {
      targetEl.style[property] = openValue;
    });
  }

  if (closeEl && targetEl) {
    closeEl.addEventListener("click", () => {
      targetEl.style[property] = closeValue;
    });
  }
}
// All 355 sidebars
for (let i = 1; i <= 355; i++) {
  togglePanel(`.sidebar${i}`, `.CloseBTN${i}`, `.nav-links${i}`, "height", "100%", "0%");
}

const title = document.querySelector(".title");
const aboutBar = document.querySelector(".about-bar");
const closeAbout = document.querySelector(".CloseBTNlexicon1");

if (title && aboutBar) {
  title.addEventListener("click", () => {
    // Toggle between open and closed states
    if (aboutBar.style.height === "100%") {
      aboutBar.style.height = "0";
       aboutBar.style.opacity = "0";
    } else {
      aboutBar.style.height = "100%";
       aboutBar.style.opacity = "1";
    }
  });
}

if (closeAbout && aboutBar) {
  closeAbout.addEventListener("click", () => {
    aboutBar.style.height = "0";
    aboutBar.style.opacity = "0";
  });
}


// burgerMenuBtn
const burgerMenuBtn = document.querySelector(".burguermenu");
const burgerMenuBar = document.querySelector(".burguermenu-bar");
const closeBurgerMenu = document.querySelector(".CloseBTNburguermenu");

if (burgerMenuBtn && burgerMenuBar) {
  burgerMenuBtn.addEventListener("click", () => {
    // Toggle open/close
    if (burgerMenuBar.style.height === "100%") {
      burgerMenuBar.style.height = "0";
    } else {
      burgerMenuBar.style.height = "100%";
    }
  });
}

if (closeBurgerMenu && burgerMenuBar) {
  closeBurgerMenu.addEventListener("click", () => {
    burgerMenuBar.style.height = "0";
  });
}

