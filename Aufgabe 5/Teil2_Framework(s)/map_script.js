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
 */
var drawControl = new L.Control.Draw({
    edit: {
        featureGroup: drawnItems
    }
});
map.addControl(drawControl);

/**
 * Function used to export GeoJSON file from
 * drawn features
 */
map.on('draw:created', function(e) {

    // Each time a feature is created, it's added to the over arching feature group
    drawnItems.addLayer(e.layer);
});

// on click, clear all layers
document.getElementById('delete').onclick = function(e) {
    drawnItems.clearLayers();
};

document.getElementById('export').onclick = function(e) {
    // Extract GeoJson from featureGroup
    var data = drawnItems.toGeoJSON();

    // Stringify the GeoJson
    var convertedData = 'text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data));

    // Create export
    document.getElementById('export').setAttribute('href', 'data:' + convertedData);
    document.getElementById('export').setAttribute('download','data.geojson');
};

//adding specified marker to map
var dom_marker = L.marker([51.962981, 7.625772]);
dom_marker.addTo(map);
dom_marker.bindPopup("Muenster Dom<br> Built in 13th century. <br/><img src='https://www.muenster-photos.de/cms/fileadmin/_processed_/csm_domplatz2_712f453299.jpg'/ width='100%'><br>Domplatz 28, 48143 Muenster");

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
 * Functions used to active and deactivate the draggable property of JQueryUI
 */
function moveMap() {
    $(function () {
        $("#draggable, #draggable2").draggable({
            disabled: false
        });
        $( "#map" ).resizable({
            disabled: false,
            alsoResizeReverse: "#draggable"
        });
    });
}

function snapMap() {
    $(function () {
        $("#draggable, #draggable2").draggable({
            disabled: true
        });
        $( "#map" ).resizable({
            disabled: true,
            alsoResizeReverse: false
        });
    });
}

/**
 * "gegeinander draggen" implementation
 * source: Simen Echholt, https://stackoverflow.com/questions/3369045/jquery-ui-resizable-alsoresize-reverse
 */
$.ui.plugin.add("resizable", "alsoResizeReverse", {

    start: function() {
        var that = $(this).resizable( "instance" ),
            o = that.options;

        $(o.alsoResizeReverse).each(function() {
            var el = $(this);
            el.data("ui-resizable-alsoresizeReverse", {
                width: parseInt(el.width(), 10), height: parseInt(el.height(), 10),
                left: parseInt(el.css("left"), 10), top: parseInt(el.css("top"), 10)
            });
        });
    },

    resize: function(event, ui) {
        var that = $(this).resizable( "instance" ),
            o = that.options,
            os = that.originalSize,
            op = that.originalPosition,
            delta = {
                height: (that.size.height - os.height) || 0,
                width: (that.size.width - os.width) || 0,
                top: (that.position.top - op.top) || 0,
                left: (that.position.left - op.left) || 0
            };

        $(o.alsoResizeReverse).each(function() {
            var el = $(this), start = $(this).data("ui-resizable-alsoresize-reverse"), style = {},
                css = el.parents(ui.originalElement[0]).length ?
                    [ "width", "height" ] :
                    [ "width", "height", "top", "left" ];

            $.each(css, function(i, prop) {
                var sum = (start[prop] || 0) - (delta[prop] || 0);
                if (sum && sum >= 0) {
                    style[prop] = sum || null;
                }
            });

            el.css(style);
        });
    },

    stop: function() {
        $(this).removeData("resizable-alsoresize-reverse");
    }
});