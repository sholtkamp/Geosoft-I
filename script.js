/**
 * Created by Basti on 24.04.2017.
 */

var lat1, long1, lat2, long2 = 0;

/**
 *
 * @param lat1 First points latitude
 * @param long1 First points longitude
 * @param lat2 Second points latitude
 * @param long2 Second points longitude
 * @source http://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula
 */
function CalculateCoords(lat1, long1, lat2, long2) {
    alert("Fickdich!");
    var radius = 6371; //Radius of the earth in km
    var degreeLatitude = degree2radians(lat2 - lat1);
    var degreeLongitude = degree2radians(long2 - long1);
    var temp1 =
            Math.sin(degreeLatitude / 2) * Math.sin(degreeLatitude / 2) +
            Math.cos(degree2radians(lat1)) * Math.cos(degree2radians(lat2)) *
            Math.sin(degreeLongitude / 2) * Math.sin(degreeLongitude / 2)
            ;
    var temp2 = 2 * Math.atan2(Math.sqrt(temp1), Math.sqrt(1-temp1));
    var temp3 = radius * temp2;
    console.log(lat1, long1, lat2, long2);
    return temp3;
}


function degree2radians(degree){
    return degree * (Math.PI/180)
}

function submitter(){
    lat1 = document.getElementById("lat1");
    long1 = document.getElementById("long1");
    lat2 = document.getElementById("lat2");
    long2 = document.getElementById("long2");
}