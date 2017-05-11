var coordArray; //initializing Array
var filecontent; //initializing String
var lengthArray = [];

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
      myBuildArray.work(); //using self defined work function; see below

      for (i=0; i < coordArray.length; i = i+4) { //iterating over array length...

          myPoint = new Point(coordArray[i], coordArray[i + 1]); //... to build points ....
          myPoint2 = new Point(coordArray[i + 2], coordArray[i + 3]);

          myLine = new Line(myPoint, myPoint2); //... and merge those to lines...
          myLine.buildLine(); // using self defined build function; see below
          lengthArray.push(myLine.length);
          console.log(lengthArray);
      }

      myPolyLine = new Polyline(lengthArray);
      myPolyLine.partialSum();

      // Changes the results paragraph in the HTML doc to display the calculated length
      document.getElementById("results").innerHTML ="The length of the polyline is is: " + myPolyLine.sum + "km";
      lengthArray.length = 0;


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
            alert("Not enough coordinates given!");
            document.getElementById("results").innerHTML ="The given file does not contain enough points to construct a polyline!";
            lengthArray.length = 0;
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

/**
 * @desc This is the constructor for a Polyline object.
 *       Keep in mind: Polylines can contain 0..n lines. So the constructor does not need parameters
 * @constructor Builds an Object with some parameters, e.g. length, arrayOfLinesInPolyline, sum...
 *              and a number of methods, e.g.:
 *              addLineToArray // addLineLength, depending on approach
 *              sumLineLengths, getLength, ...
 * @method sumOfPartialLengths
 */
function Polyline(lengthArray){

    //attributes
    this.lenghtArray = lengthArray;
    this.sum = 0;

    //methods
    this.partialSum = function(){

        //this.lengthArray = lengthArray;

        for (i = 0; i < lengthArray.length; i++){
            this.sum = this.sum + lengthArray[i];
        }
        console.log(this.sum);
    }


}
