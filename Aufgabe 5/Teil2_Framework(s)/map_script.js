//Initializing Leaflet map

var map = L.map('mapid');
var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
var osm = new L.TileLayer(osmUrl, {minZoom: 8, maxZoom: 12, attribution: osmAttrib})
map.setView([51.961, 7.618], 13);
map.addLayer(osm);

/**
 * initilaizing augmented marker
 */
var dommarker = L.marker([51.962981, 7.625772]);
dommarker.addTo(map);
dommarker.bindPopup("Muenster Dom<br> Built in 13th century. <br/><img src='https://www.muenster-photos.de/cms/fileadmin/_processed_/csm_domplatz2_712f453299.jpg'/ width='100%'><br>Domplatz 28, 48143 Muenster");


/**
 * function used to locate user
 */
function locateUser(){
    map.locate({setView: true, watch: true})
        .on('locationfound', function(e){
            var marker = L.marker([e.latitude, e.longitude]).bindPopup('Found you!');

    map.addLayer(marker);
    marker.openPopup();
})};

function loadGeoJSON(){

};

/**
 * Funtion used for resizing map
 */
$mapid.on('map-container-resize', function () {
    map.invalidateSize(); // doesn't seem to do anything
});