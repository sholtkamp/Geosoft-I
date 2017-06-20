//Initializing Leaflet map
var map = L.map('map', {drawControl: true});
var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
var osm = new L.TileLayer(osmUrl, {minZoom: 8, maxZoom: 12, attribution: osmAttrib})
map.setView([51.961, 7.618], 13);
map.addLayer(osm);

//adding specified marker to map
var dommarker = L.marker([51.962981, 7.625772]);
dommarker.addTo(map);
dommarker.bindPopup("Muenster Dom<br> Built in 13th century. <br/><img src='https://www.muenster-photos.de/cms/fileadmin/_processed_/csm_domplatz2_712f453299.jpg'/ width='100%'><br>Domplatz 28, 48143 Muenster");

/**
 * function used to locate user
 * this function is called from the #find_btn
 * located the user, sets a marker at his position and opens a popup
 */
function locateUser(){
    map.locate({setView: true, watch: true})
        .on('locationfound', function(e){
            var marker = L.marker([e.latitude, e.longitude]).bindPopup('Found you!');

    map.addLayer(marker);
    marker.openPopup();
})}

/**
 * function used to add external GeoJSON files to the map
 * uses Leaflet's L.geoJson method to add data to map
 * source is specified in the form and function called at click on the button
 * uses JQuery Ajax to load the data
 */
function loadGeoJSON(){
    var exGeoJSON = new L.geoJson();
    exGeoJSON.addTo(map);
    var JSON_src = document.getElementById("JSON_URL").value;

    $.ajax({
        dataType: "json",
        url: JSON_src,
        success: function(data) {
            $(data.features).each(function(key, data) {
                exGeoJSON.addData(data);
            });
        }
    }).error(function() {});
}

/**
 * Function used for resizing map
 */
$(map).on('map-container-resize', function () {
    map.invalidateSize(); // doesn't seem to do anything
});

/**
 * Functions used to active and deactivate the draggable property of JQueryUI
 */
function moveMap() {
    $(function () {
        $("#draggable, #draggable2").draggable();
    });
}

function snapMap() {
    $(function () {
        $("#draggable, #draggable2").draggable({
            disabled:true
        });
    });
}



