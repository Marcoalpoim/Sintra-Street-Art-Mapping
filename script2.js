// ====== GLOBAL VARIABLES ======
let allProjects = [];
let index = 0;
const batchSize = 20;

// ====== GEOJSON POINTS ======
setTimeout(function () {
    window.dispatchEvent(new Event('resize'));
}, 1000);

var pointJSON = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "name": "Graffiti",
        "link": "arquivo.html?action=agualva-cacem",
        "iconurl": "images/throwup.png",
        "imglink": "fotosstreetart/ALGUALVA-CACEM/Area_de_Lazer_Abel_dos_Santos_agualva_cacem_2022.jpg"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [-9.30320, 38.77409]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Graffiti",
        "link": "arquivo.html?action=agualva-cacem",
        "iconurl": "images/throwup.png",
        "imglink": "fotosstreetart/ALGUALVA-CACEM/Area_de_Lazer_Abel_dos_Santos_agualva_cacem_2022_2.jpg"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [-9.30320, 38.77459]
      }
    }
  ]
};

// ====== LOAD PROJECTS.JSON ======
async function loadProjects() {
  const res = await fetch("projects.json");
  allProjects = await res.json();
  loadBatch(allProjects);
}

// ====== LOAD BATCH ======
function loadBatch(projects) {
  const container = document.querySelector(".grid.grid2");
  const slice = projects.slice(index, index + batchSize);

  slice.forEach((p, i) => {
    const uniqueId = index + i;

    const div = document.createElement("div");
    div.className = `filterDiv ${p.location.toLowerCase().replace(/\s+/g, "-")} ${p.tags.join(" ")}`;

    div.innerHTML = `
      ${p.hasComments ? `
  <div class="avisoicon">
    <img loading="lazy" src="avisoicon.png" alt="aviso" class="avisoiconimage">
    <div class="avisotext">
      <img loading="lazy" src="avisoicon.png" alt="aviso" class="avisotextimage">
      <p>Esta obra pode conter conteúdos sociopolíticos e culturais</p>
    </div>
  </div>
` : ''}

      <div class="sidebar" data-index="${uniqueId}" onclick="openPPI(${uniqueId})">
        <img loading="lazy" src="${p.image}" alt="${p.location}">
      </div>

      <br>

      <div class="tagscontainer">
        ${p.tags.map(tag => `
          <button class="tagbtn tag${tag}" onclick="filterSelection('${tag}')">${capitalize(tag)}</button>
        `).join('')}
      </div>

      <div class="nav-links" id="ppi-${uniqueId}">
        <div class="ppicontainer">
          <div class="ppi">
            <div class="imagensprojeto">
              <img loading="lazy" src="${p.image}" width="100%">
            </div>

            <div class="informaçaoobra">
              <p class="local">
                <b class="freguesiatitle">${p.location}</b>
                <b class="CloseBTN" onclick="closePPI(${uniqueId})">x</b>
              </p>
              <p class="autor"><b>Autor:</b> ${p.author}</p>
              <p class="sub-local"><b>Local:</b> ${p.place}</p>
              <p class="data"><b>Data:</b> ${p.date}</p>
              <p class="categoria"><b>Categoria:</b> ${p.category}</p>

              <div class="tags">
                <b>Tags:</b><br><br>
                <ul>
                  ${p.tags.map(t => `<li><a class="ppitags" href="#">${capitalize(t)}</a></li>`).join('')}
                </ul>
              </div>
            </div>
          </div>

          <div class="noiseppi"></div>

          <div class="localizaçao">
            <div class="textlocalizaçao">Localização</div>
            <div id="map-${uniqueId}" class="mapbox"></div>
          </div>

          ${p.hasComments ? `
          <div class="avisoppi">
            <img loading="lazy" src="avisoicon.png" alt="Aviso" class="avisoiconppi">
            <p class="contentavisoppi">
              Esta imagem contém conteúdo provocador, que não se reflete e serve apenas de exposição e demonstração histórica e cultural.
            </p>
          </div>

          <div class="coment-section">
            <p><b>user1923423:</b> Incrível!!!</p>
            <p><b>user1923823:</b> É vandalismo!</p>
            <p><b>user1923565:</b> Limpem isso!</p>
          </div>

          <div class="coment-section2">
            <input class="comentario" type="text" placeholder="Comentário..." id="coment-${uniqueId}">
            <span class="sendit" id="send-${uniqueId}">send</span>
          </div>
          ` : ''}
        </div>
      </div>
    `;

    container.appendChild(div);
  });

  index += batchSize;
}

// ====== SCROLL LOAD ======
window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
    loadBatch(allProjects);
  }
});

// ====== OPEN & CLOSE PPI ======
function openPPI(id) {
  const modal = document.getElementById(`ppi-${id}`);
  if (modal) modal.classList.add("active");

  const p = allProjects[id];
  if (!p) return;

  const match = pointJSON.features.find(f => f.properties.imglink === p.image);
  if (match) {
    const [lng, lat] = match.geometry.coordinates;
    initMapDark(`map-${id}`, lat, lng, match.properties.iconurl, p.image);
  }
}

function closePPI(id) {
  const modal = document.getElementById(`ppi-${id}`);
  if (modal) modal.classList.remove("active");
}

// ====== INITIALIZE LEAFLET DARK MAP ======
function initMapDark(mapId, lat, lng, iconUrl, imageUrl) {
  const map = L.map(mapId, {
    center: [lat, lng],
    zoom: 16,
    zoomControl: true,
    dragging: true,
    scrollWheelZoom: true,
    doubleClickZoom: true,
    boxZoom: true,
    keyboard: true,
    tap: true,
    inertia: true,
  });

  L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    subdomains: "abcd",
    maxZoom: 20
  }).addTo(map);

  const icons = new L.Icon({
    iconUrl: iconUrl || "images/throwup.png",
    iconSize: [10, 10],
  });

  L.marker([lat, lng], { icon: icons })
    .addTo(map)
    .bindPopup(`<img src="${imageUrl}" width="150" style="border-radius:8px;">`)
    .openPopup();
}

// ====== UTILITY ======
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// ====== INITIAL LOAD ======
// ====== INITIAL LOAD & FILTER SETUP ======
loadProjects().then(() => {
  filterSelection('all'); // default filter once projects are loaded
});

// ====== FILTER FUNCTION ======
function filterSelection(category) {
  const items = document.querySelectorAll('.filterDiv');
  const buttons = document.querySelectorAll('.freguesiatag');

  // Update button active state
  buttons.forEach(btn => btn.classList.remove('active'));
  const activeBtn = Array.from(buttons).find(btn => btn.getAttribute('onclick')?.includes(`'${category}'`));
  if (activeBtn) activeBtn.classList.add('active');

  // Show or hide items
  items.forEach(el => {
    if (category === 'all' || el.classList.contains(category)) {
      el.classList.add('show');
    } else {
      el.classList.remove('show');
    }
  });
}





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

