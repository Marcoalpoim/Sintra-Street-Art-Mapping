
    /*===================================================
                      OSM  LAYER               
===================================================*/

var map = L.map('map').setView([38.84000, -9.35000], '11');


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






/*===================================================
                      GEOJSON               
===================================================*/


var pointdata = L.geoJSON(pointJSON , {
    pointToLayer: function (feature, latlng) {
        const icons = new L.Icon({
            iconUrl: `${feature.properties.iconurl }`,
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





var Sintradata = L.geoJSON(mapdata2, { style: style,  onEachFeature: onEachFeature}).addTo(map);

// LayerGroup to hold preview markers
const imagePreviewLayer = L.layerGroup().addTo(map);

function showImagePreviews() {
  imagePreviewLayer.clearLayers();

  if (map.getZoom() < 14) return; // only show when zoomed in

  pointdata.eachLayer(function (layer) {
    const { imglink, name, link } = layer.feature.properties || {};
    if (!imglink) return;

    const latlng = layer.getLatLng();

    // Create a small clickable image preview
    const html = `
      <div class="img-preview" title="${name || ''}">
        <img src="${imglink}" alt="${name || ''}" />
      </div>
    `;

    const imgMarker = L.marker(latlng, {
      icon: L.divIcon({
        html,
        className: "preview-icon",
        iconSize: [80, 80],
        iconAnchor: [40, 40],
      }),
      interactive: !!link, // allow clicks if there’s a link
    });

    // 🔗 If there's a link, make the preview clickable
    if (link) {
      imgMarker.on("click", () => {
        window.location.href = link;
      });
    }

    imagePreviewLayer.addLayer(imgMarker);
  });
}


// Listen for zoom changes
map.on("zoomend", showImagePreviews);


/*===================================================
                      LAYER CONTROL               
===================================================*/



/*===================================================
                      SEARCH BUTTON               
===================================================*/

L.Control.geocoder().addTo(map);




/*===================================================
                      Choropleth Map               
===================================================*/


function getColor(d) {
    return d > 1000 ? '#000000' :
           d > 500  ? '#000000'  :
           d > 200  ? '#000000'  :
           d > 100  ? '#000000'  :
           d > 50   ? '#000000'  :
           d > 20   ? '#000000'  :
           d > 10   ? '#000000'  :
           '#000000' ;
}

function style(feature) {
    return {
        fillColor: 'black',
        weight: 1,
        opacity: 1,
        color: 'white',
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
        fillColor: 'white',
        weight: 1,
        color: 'white',
        dashArray: '',
        fillOpacity: 0.2,
    
       
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
      // location.href = 'arquivo.html';
    
      map.fitBounds(e.target.getBounds());

}

function onclick(e) {
    window.open(e.target.feature.properties.link);
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

info.update = function (props) {
  // faz fade-out
  this._div.classList.add("updating");

  setTimeout(() => {
    this._div.innerHTML = `
      <h4>Freguesias do Concelho de Sintra</h4>
      ${
        props
          ? `<b class="legenda">
              ${props.name}<br>
              ${props.graffiti}${props.tag}${props.throwup}${props.lettering}
              ${props.piece}${props.wildstyle}${props.sticker}${props.stencil}
              ${props.yarnbombing}${props.poster}${props.mosaico}${props.mural}
              ${props.instalações}${props.tags}
            </b>`
          : 'Começa a explorar o mapa!'
      }
 
      <div class="drag-hint">
        <span class="drag-icon"><i class="fa-solid fa-hand"></i></span>
      
        <span class="drag-text"></span>
      </div>
    `;

    this._div.classList.remove("updating");
  }, 150);
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



