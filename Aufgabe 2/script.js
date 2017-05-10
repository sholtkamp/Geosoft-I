var coordArray; //initializing Array
var filecontent; //initializing String
var polylength;

/**
* @desc reads .txt File into an Array
* @see Learnweb
* @param event OpenFile event
*/
var ReadFile = function(event) {

	var input = event.target;
    var reader = new FileReader();

  reader.onload = function(){
	filecontent = reader.result; //coordinate data saved to this variable
      myBuildArray = new BuildArray(filecontent);
      myBuildArray.work();

      myPoint = new Point(coordArray[0], coordArray[1]);
      myPoint2 = new Point(coordArray[2], coordArray[3]);

      myLine = new Line(myPoint, myPoint2);
      myLine.buildLine();
      console.log(myLine.length);
	};

  reader.readAsText(input.files[0]);
};

/**
 * @desc transforms input String into Array
 * @param input .txt file
 */
function BuildArray(input) {

    //methods
    this.work = function(input) {
        filecontent = filecontent.replace(/^\D+/g, ''); //using regex to filter all leading non-numerals
        filecontent = filecontent.replace(/\n/g, " "); // using regex to change line breaks to whitespaces
        filecontent = filecontent.replace(/[^\d.\s]/g, ''); //using regex to filter everything non-numeric except whitespaces

        coordArray = filecontent.split(" "); // using the whitespaces to split String into an array
        coordArray = coordArray.filter(function(entry) { return entry.trim() != ''; }); // trimming the whitespaces from the array, after using them to split the String into the array
        console.log(filecontent);
        console.log(coordArray);

        if(coordArray.length < 2){ // error handling for empty .txt. files
            throw "File does not contain coordinates!";
        }

    }
}

/**
 * @param lat lattitude of given coordinate
 * @param long longitude of given coordinate
 * @constructor
 */
function Point(lat, long){

    //attributes
    this.lat = lat;
    this.long = long;
}

/**
 * @param pt1 first point constructed with coordinates
 * @param pt2 second point constructed with coordinates
 */
function Line(pt1, pt2){

    //attributes
    this.pt1  = pt1;
    this.pt2 = pt2;
    var length;

    //methods
    this.buildLine = function(pt1, pt2){

        // Computing data by using Haversine formula specified in linked documents
        var radius = 6371; //Radius of the earth in km
        var degreeLatitude = degree2radians(this.pt2.lat - this.pt1.lat);
        var degreeLongitude = degree2radians(this.pt2.long - this.pt1.long);
        var temp1 =
                Math.sin(degreeLatitude / 2) * Math.sin(degreeLatitude / 2) +
                Math.cos(degree2radians(this.pt1.lat)) * Math.cos(degree2radians(this.pt2.lat)) *
                Math.sin(degreeLongitude / 2) * Math.sin(degreeLongitude / 2)
            ;
        var temp2 = 2 * Math.atan2(Math.sqrt(temp1), Math.sqrt(1-temp1));
        var temp3 = radius * temp2; //temp3 = distance in km

        this.length = temp3;
    }


  }

// Auxiliary function used for Haversine formula
function degree2radians(degree){
    return degree * (Math.PI/180)
}


