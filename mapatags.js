
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
    
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight, 
        click: zoomToFeature,
        dblclick: onclick
    });
}




var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info2'); // create a div with a class "info"
    this.update();
    return this._div;
};

info.update = function (props) {
    this._div.innerHTML = '<h4>Freguesias do Concelho <br> de Sintra</h4>' +  (props ?
        '<b class="legenda">'+ '<br>' + props.name + '<br>' + '<br>' + props.graffiti + props.tag + props.throwup + props.lettering + props.piece + props.wildstyle + props.sticker + props.stencil + props.yarnbombing + props.poster + props.mosaico + props.mural + props.instalações + props.tags + '</b> ' : 'Hover sobre uma freguesia' );




    };

info.addTo(map);



