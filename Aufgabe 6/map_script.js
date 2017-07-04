/**
 * @author Sebastian Holtkamp
 * @author Jan Michel Tebrügge
 */

//Initializing Leaflet map
var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';

var osm = new L.TileLayer(osmUrl, {minZoom: 8, maxZoom: 12, attribution: osmAttrib})
var drawnItems = new L.FeatureGroup();

var map = L.map('map');
map.setView([51.961, 7.618], 13);
map.addLayer(osm);
map.addLayer(drawnItems);

/**
 * Using Leaflet Draw to implement drawing on map
 * @source: https://github.com/Leaflet/Leaflet.draw
 */
var drawControl = new L.Control.Draw({
    edit: {
        featureGroup: drawnItems
    }
});
map.addControl(drawControl);

/**
 * Function used to export GeoJSON file of drawn features
 * @source: https://bl.ocks.org/danswick/d30c44b081be31aea483
 */
map.on('draw:created', function(e) {

    // Each time a feature is created, it's added to the over arching feature group
    drawnItems.addLayer(e.layer);
});

function exportGeoJSON(){

    document.getElementById('export').onclick = function(e) {


        // Extract GeoJson from featureGroup
        var data = drawnItems.toGeoJSON();

        // Stringify the GeoJson
        var convertedData = JSON.stringify(data);

        for (i = 0; i < convertedData.length; i++) {
            if (convertedData.search("{}") != -1) {
                var gJ_name = prompt("Please enter GeoJSON's name", "ichBinUnkreativ");
                var namedData = convertedData.slice(0, (convertedData.search("{}") + 1)) + "\"name\"" + ": " + "\"" + gJ_name + "\"" + convertedData.slice((convertedData.search("{}") + 1));
                console.log(namedData);
            }
            else break;
        }

        // Create export
       document.getElementById('export').setAttribute('href', 'data:' + namedData);
       document.getElementById('export').setAttribute('download','data.geojson');
    };
}

//adding specified marker to map
var dom_marker = L.marker([51.962981, 7.625772]);
dom_marker.addTo(map);
dom_marker.bindPopup("Muenster Dom<br> Built in 13th century. <br/><img src='https://www.muenster-photos.de/cms/fileadmin/_processed_/csm_domplatz2_712f453299.jpg'/ width='100%'><br>Domplatz 28, 48143 Muenster");

/**
 * function used to locate user
 * this function is called from the #find_btn
 * located the user, sets a marker at his position and opens a popup
 *
 * If user can't be found an alert is displayed
 */
function locateUser(){
    map.locate({setView: true, watch: true})
        .on('locationfound', function(e){
            var marker = L.marker([e.latitude, e.longitude]).bindPopup('Found you!');

            if (typeof marker == "undefined") {
                alert("Can't find you");
            }

    map.addLayer(marker);
    marker.openPopup();
})}

/**
 * function used to add external GeoJSON files to the map
 * uses Leaflet's L.geoJson method to add data to map
 * source is specified in the form and function called at click on the button
 * uses JQuery Ajax to load the data
 * @source: https://gis.stackexchange.com/questions/68489/how-to-load-external-geojson-file-into-leaflet-map
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
                console.log(data);
            });
        }
    }).error(function() {});
}

/**
 logging documents readiness
 */
$( document ).ready(function() {
    console.log( "ready!" );
});


