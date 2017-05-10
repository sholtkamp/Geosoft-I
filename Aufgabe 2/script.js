var coordArray; //initializing Array
var filecontent;

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
	};

  reader.readAsText(input.files[0]);
};


function BuildArray(input) {

    //methods
    this.work = function(input) {
        filecontent = filecontent.replace(/^\D+/g, ''); //using regex to filter all leading non-numerals
        filecontent = filecontent.replace(/\n/g, " "); // using regex to change linebreaks to whitespaces
        filecontent = filecontent.replace(/[^\d.\s]/g, ''); //using regex to filter everthing non-numeric except whitespaces

        var coordArray = filecontent.split(" "); // using the whitespaces to split String into an array
        coordArray = coordArray.filter(function(entry) { return entry.trim() != ''; }); // trimming the whitespaces from the array, after using them to split the String into the array
        console.log(filecontent);
        console.log(coordArray);

        if(coordArray.length < 2){ // error handling for empty .txt. files
            throw "File does not contain coordinates!";
        }

    }
}


function Point(lat, long){

    //attributes
    this.lat = lat;
    this.long = long;
}


function Line(pt1, pt2){

    //attributes
    this.pt1  = pt1;
    this.pt2 = pt2;
    //methods

  }



