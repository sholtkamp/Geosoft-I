//Initializing Leaflet map
var map = L.map('map');
var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
var osm = new L.TileLayer(osmUrl, {minZoom: 8, maxZoom: 12, attribution: osmAttrib})
map.setView([51.961, 7.618], 13);
map.addLayer(osm);
var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);
var drawControl = new L.Control.Draw({
    edit: {
        featureGroup: drawnItems
    }
});
map.addControl(drawControl);
map.on(L.Draw.Event.CREATED, function (e) {
    var type = e.layerType
    var layer = e.layer;

//insert layer to geojson

    drawnItems.addLayer(layer);
});



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