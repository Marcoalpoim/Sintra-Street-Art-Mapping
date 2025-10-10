
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
             <p class="local">
                <b class="freguesiatitle">${p.location || ''}</b>
                <b class="CloseBTN" onclick="closePPI(${i})">x</b>
              </p>
            <div class="imagensprojeto">
              <img loading="lazy" src="${p.image || ''}" width="100%">
            </div>
            <div class="informaçaoobra">
           
              <p class="autor"><b>Autor:</b> ${p.author || ''}</p>
              <p class="sub-local"><b>Local:</b> ${p.place || ''}</p>
              <p class="data"><b>Data:</b> ${p.date || ''}</p>
              <p class="categoria"><b>Categoria:</b> ${p.category || ''}</p>
              <div class="tags">
                <b>Tags:</b><br>
             <ul>
                ${(p.tags || [])
                  .map(t => {
                    const loc = p.location ? normalizeClassName(p.location) : 'geral';
                    return `<li><a class="ppitags" href="rede_${loc}.html">${capitalize(t)}</a></li>`;
                  })
                  .join('')}
</ul>
              </div>
                 <div class="localizaçao">
            <div class="textlocalizaçao">Localização</div>
            <div id="map-${i}" class="mapbox"></div>
          </div>
            </div>
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

  if (!pckry) {
    pckry = new Packery(gridElem, {
      itemSelector: '.filterDiv',
      gutter: 0,
      transitionDuration: '0.2s',
      
    });

    console.log("✅ Packery initialized with", pckry.items.length, "items");

    // Add shuffle prototype once
    if (!Packery.prototype.shuffle) {
      Packery.prototype.shuffle = function () {
        let m = this.items.length, t, i;
        while (m) {
          i = Math.floor(Math.random() * m--);
          t = this.items[m];
          this.items[m] = this.items[i];
          this.items[i] = t;
        }
        this.layout();
      };
    }

    // ✅ Wait a moment to attach shuffle button (in case DOM loads later)
    setTimeout(() => {
      const shuffleBtn = document.querySelector('.shuffle-button');
      if (shuffleBtn) {
        shuffleBtn.addEventListener('click', () => {
          if (pckry) pckry.shuffle();
        });
      }
    }, 1500);

    // Re-layout on filter or resize
    document.querySelectorAll('.btn, .tagbtn').forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        setTimeout(() => {
          pckry.reloadItems();
          pckry.layout();
        }, 200);
      });
    });

    window.addEventListener('resize', () => pckry.layout());
  } else {
    pckry.reloadItems();
    pckry.layout();
  }
}


// ====== FILTER FUNCTION ======
function filterSelection(category) {
  const catRaw = (category === undefined || category === null) ? 'all' : category;
  const cat = (String(catRaw) === 'all') ? 'all' : normalizeClassName(catRaw);

  // update active button(s)
  const buttons = document.querySelectorAll('.freguesiatag');
  buttons.forEach(btn => btn.classList.remove('active'));

  const activeBtn = Array.from(buttons).find(btn => {
    if (btn.id && normalizeClassName(btn.id.replace(/Button$/i, '')) === cat) return true;
    const onclick = btn.getAttribute('onclick') || '';
    if (onclick.includes(`'${category}'`) || onclick.includes(`"${category}"`)) return true;
    const txt = normalizeClassName(btn.textContent || btn.innerText || '');
    return txt === cat;
  });
  if (activeBtn) activeBtn.classList.add('active');

  // show/hide items
  const items = document.querySelectorAll('.filterDiv');
  items.forEach(el => {
    if (cat === 'all' || el.classList.contains(cat)) {
      el.classList.add('show');
    } else {
      el.classList.remove('show');
    }
  });

  // ✅ Scroll grid to top
  const gridContainer = document.querySelector('.grid2');
  if (gridContainer) {
    gridContainer.scrollTo({ top: 0, behavior: 'smooth' });
  }
  // also scroll the whole page (optional)
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // recalc Packery layout
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

// ====== MAP INIT ======
function initMapDark(mapId, lat, lng, iconUrl, imageUrl) {
  const map = L.map(mapId, { center: [lat, lng], zoom: 16 });
  L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
    attribution: '&copy; OpenStreetMap contributors', subdomains: "abcd", maxZoom: 20
  }).addTo(map);
  const icons = new L.Icon({ iconUrl: iconUrl || "images/throwup.png", iconSize: [10, 10] });
  L.marker([lat, lng], { icon: icons })
    .addTo(map)
    .bindPopup(`<img src="${imageUrl}" width="150" style="border-radius:8px;">`)
    .openPopup();
}



// ====== CAROUSEL INIT ======
function initCarousel() {
  const carousel = document.getElementById("carousel");
  const prev = document.getElementById("prev");
  const next = document.getElementById("next");

  if (!carousel || !prev || !next) {
    console.error("❌ Carousel elements missing");
    return;
  }

  console.log("✅ Carousel found:", carousel);
  const scrollAmount = 150;

  prev.addEventListener("click", () => {
    console.log("⬅️ prev clicked");
    carousel.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  });

  next.addEventListener("click", () => {
    console.log("➡️ next clicked");
    carousel.scrollBy({ left: scrollAmount, behavior: "smooth" });
  });

  carousel.addEventListener("scroll", () => {
    // Optional debug log:
    // console.log("scrollLeft:", carousel.scrollLeft);
  });
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

// ====== DOM READY ======
document.addEventListener('DOMContentLoaded', async () => {
  await loadProjects();
  initCarousel();

  const params = new URLSearchParams(window.location.search);
  const action = params.get('action');
  const ppi = params.get('ppi'); // optional project id

  if (action) {
    const normalized = normalizeClassName(action);
    filterSelection(normalized);

    // scroll carousel
    setTimeout(() => {
      const carousel = document.getElementById('carousel');
      if (!carousel) return;

      const btn = Array.from(document.querySelectorAll('.freguesiatag')).find(el =>
        normalizeClassName(el.textContent || '') === normalized
      );
      if (btn) {
        btn.classList.add('active');
        const li = btn.closest('li');
        if (li) {
          const center = li.offsetLeft + li.offsetWidth / 2;
          const scrollTo = Math.max(0, center - carousel.clientWidth / 2);
          carousel.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
      }
    }, 800);

    // ✅ Auto-open PPI if id provided
    if (ppi !== null) {
      setTimeout(() => openPPI(Number(ppi)), 1500);
    }
  }
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

