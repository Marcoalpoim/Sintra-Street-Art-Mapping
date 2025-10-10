
    /*===================================================
                      OSM  LAYER               
===================================================*/

var map = L.map('map').setView([33.84000, -9.35000], '8');


// ✅ Add this right after
const mapDiv = document.getElementById('map');
mapDiv.style.transformOrigin = 'center center';
mapDiv.style.transform = 'rotateX(5deg)';
mapDiv.style.transition = 'transform 0.8s ease';
mapDiv.style.perspective = '800px';
    document.getElementById("uno").addEventListener("click", function () {
        map.flyTo([38.84000, -9.35000], '11', {
            animate: true,
            duration: 5 // in seconds
        });
    });
    

/*===================================================
                      MARKER               
===================================================*/




/*===================================================
                     TILE LAYER               
===================================================*/

var CartoDB_DarkMatter = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
	attribution: '',
	subdomains: 'abcd',
	maxZoom: 20
});
CartoDB_DarkMatter.addTo(map);

/*
var CartoDB_DarkMatterNoLabels = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 20
});
CartoDB_DarkMatterNoLabels.addTo(map);



/*===================================================
                      GEOJSON               
===================================================*/

var pointdata = L.geoJSON(pointJSON , {
    pointToLayer: function (feature, latlng) {
        const icons = new L.Icon({
            iconUrl: "images/mainpage_icon.png",
            iconSize: [6, 6],
             
        });
        return L.marker(latlng, { icon: icons});
    },
    onEachFeature: onEachFeature,

    onEachFeature: function (feature, layer) {
        layer.on({
            click: onclick
        });
       var popupContent = '<img class="imgpopup" src="'+ feature.properties.imglink + '" />';
        layer.bindTooltip ( popupContent );
    }
    
}).addTo(map)





var Sintradata = L.geoJSON(mapdata, { style: style,  onEachFeature: onEachFeature}).addTo(map);


/*===================================================
                      LAYER CONTROL               
===================================================

var baseLayers = {
    "Sem Etiquetas":CartoDB_DarkMatterNoLabels,
    "Etiquetas":CartoDB_DarkMatter
    
};

var overlays = {
    "TagData": singleMarker,
    "PointData":pointdata,
   
    "Sintradata":Sintradata,
};

L.control.layers( baseLayers,overlays).addTo(map);*/


/*===================================================
                      SEARCH BUTTON               
===================================================*/

L.Control.geocoder().addTo(map);


/*===================================================
                      Choropleth Map               
===================================================*/


function getColor(d) {
    return d > 50 ? '#003d00' :
           d > 40  ? '#008f00' :
           d > 30  ? '#00e000' :
           d > 20  ? '#5cff5c' :
           d > 0   ? '#85ff85' :
                      '#85ff85';
}

function style(feature) {
    return {
        fillColor: getColor(feature.properties.density),
        weight: 2,
        opacity: 1,
        color: 'black',
        dashArray: '',
        fillOpacity: 0.6,
        
    };
}

/*
 L.geoJson(mapdata, {style: style}).addTo(map);             

  */




function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 2,
        color: 'white',
        dashArray: '',
        fillOpacity: 0.8,
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }

    info.update(layer.feature.properties);
}

function resetHighlight(e) {
    Sintradata.resetStyle(e.target);
    info.update();
}




function zoomToFeature(e) {
    // calcula os limites do polígono
    var bounds = e.target.getBounds();

    // faz o zoom para os limites
    map.fitBounds(bounds);

    // calcula o centro
    var center = bounds.getCenter();

    // converte para coordenadas do ecrã
    var point = map.latLngToContainerPoint(center);

    // desloca 100px para cima (assim o polígono vai ficar 100px mais abaixo no ecrã)
    point.y = point.y - 100;

    // converte de volta para coordenadas geográficas
    var newCenter = map.containerPointToLatLng(point);

    // aplica o pan suave para o novo centro
    map.panTo(newCenter, { animate: true });
}
function onclick(e) {
  const link = e.target.feature.properties.link;
  if (link) {
    window.location.href = link;
  }
}




function onEachFeature(feature, layer) {
    let lastClickTime = 0;

    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: function(e) {
            const now = Date.now();
            const timeSince = now - lastClickTime;

            // If the time between clicks is short, treat as double click
            if (timeSince < 350 && timeSince > 50) {
                const link = e.target.feature.properties.link;
                if (link) {
                    window.location.href = link;
                }
            } else {
                // Single click: highlight + zoom
                highlightFeature(e);
                zoomToFeature(e);
            }

            lastClickTime = now;

            // Stop click from bubbling up to the map background
            L.DomEvent.stopPropagation(e);
        }
    });
}

// Clear highlight when clicking outside polygons (on map background)
map.on("click", function() {
    Sintradata.resetStyle();
    info.update();
});



var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info2'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    // faz fade-out
    this._div.classList.add("updating");

    // espera um bocadinho e troca o conteúdo
    setTimeout(() => {
        this._div.innerHTML =
            '<h4>Freguesias do Concelho <br> de Sintra</h4>' +
            (props
                ? '<b class="legenda">'+ props.name + '<br><br>' +
                  props.graffiti + props.tag + props.throwup + props.lettering +
                  props.piece + props.wildstyle + props.sticker + props.stencil +
                  props.yarnbombing + props.poster + props.mosaico + props.mural +
                  props.instalações + props.tags +
                  '</b>'
                : 'Começa já a explorar o mapa!');

        // faz fade-in
        this._div.classList.remove("updating");
    }, 150); // deve ser menor que o tempo do CSS
};

info.addTo(map);


// Make the .info2 leaflet control draggable (desktop + mobile)
function makeLeafletControlDraggable(selector) {
  const el = document.querySelector(selector);
  if (!el) return;

  let isDragging = false;
  let startX, startY, initialX, initialY;

  // Disable dragging that might interfere with the map
  L.DomEvent.disableClickPropagation(el);
  L.DomEvent.disableScrollPropagation(el);

  el.addEventListener("mousedown", startDrag);
  el.addEventListener("touchstart", startDrag, { passive: true });

  function startDrag(e) {
    isDragging = true;
    el.style.transition = "none";

    const rect = el.getBoundingClientRect();
    startX = e.type === "touchstart" ? e.touches[0].clientX : e.clientX;
    startY = e.type === "touchstart" ? e.touches[0].clientY : e.clientY;
    initialX = rect.left;
    initialY = rect.top;

    document.addEventListener("mousemove", drag);
    document.addEventListener("mouseup", endDrag);
    document.addEventListener("touchmove", drag, { passive: false });
    document.addEventListener("touchend", endDrag);
  }

  function drag(e) {
    if (!isDragging) return;
    e.preventDefault();

    const x = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
    const y = e.type === "touchmove" ? e.touches[0].clientY : e.clientY;
    const dx = x - startX;
    const dy = y - startY;

    el.style.left = `${initialX + dx}px`;
    el.style.top = `${initialY + dy}px`;
    el.style.right = "auto";
  }

  function endDrag() {
    isDragging = false;
    el.style.transition = "";
    document.removeEventListener("mousemove", drag);
    document.removeEventListener("mouseup", endDrag);
    document.removeEventListener("touchmove", drag);
    document.removeEventListener("touchend", endDrag);
  }
}

// Apply to your Leaflet info control
setTimeout(() => makeLeafletControlDraggable(".info2.leaflet-control"), 500);
