/**
 * Created by Basti on 04.07.2017.
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

function exportGeoJSON(){

    document.getElementById('export').onclick = function(e) {


        // Extract GeoJson from featureGroup
        var data = drawnItems.toGeoJSON();

        // Stringify the GeoJson
        var convertedData = JSON.stringify(data);

        /**
         for (i = 0; i < convertedData.length; i++) {
            if (convertedData.search("{}") != -1) {
                var gJ_name = prompt("Please enter GeoJSON's name", "ichBinUnkreativ");
                var namedData = convertedData.slice(0, (convertedData.search("{}") + 1)) + "\"name\"" + ": " + "\"" + gJ_name + "\"" + convertedData.slice((convertedData.search("{}") + 1));
                console.log(namedData);
            }
            else break;
        }

         **/
        // Create export
        document.getElementById('export').setAttribute('href', 'data:' + convertedData);
        document.getElementById('export').setAttribute('download','data.geojson');
    };
}

// Post the geoJSON layer to DB
document.getElementById('post2db').onclick = function (e) {

    // Extract GeoJson from editableLayer
    var data = editableLayers.toGeoJSON();

    // Add a name to the layer
    data.name = $("#jsonname").val();

    var senddata = JSON.stringify(data);

    // Post to local mongodb via nodejs using our own POST
    $.ajax({
        type: "POST",
        url: "http://localhost:3000/postjson",
        dataType: 'json',
        contentType: 'application/json',
        data: senddata,
        traditional: true,
        cache: false,
        processData: false,
        success: function () {
            alert($("#jsonname").val() + " added to DB");
            // JSNLog
            logger.info("Post successful!");
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Failed!");
            // JSNLog
            logger.error("Posting failed!");
        }
    });
};

// Get the geoJSON layers from DB
document.getElementById('loaddb').onclick = function (e) {

    // Get all GeoJSON from our DB using our GET
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/getjson",
        success: function (response) {
            // JSNLog
            logger.info('Get successful!', response);

            // Using a forEach method iterating over the array of nested objects
            response.forEach(function (entry) {
                // JSNLog
                logger.info('JSON.stringify(entry.geojson)', JSON.stringify(entry.geojson));

                // Adding each geojson feature to the jsonLayers
                L.geoJSON(entry.geojson).addTo(jsonLayers);
            });
        }


    })
};