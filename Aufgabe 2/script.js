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
	var filecontent = reader.result; //coordinate data saved to this variable
  //filecontent.filterInput(filecontent);  SIEHE UNTEN
	filecontent = filecontent.replace( /^\D+/g, ''); //using regex to filter all leading non-numerals
  filecontent = filecontent.replace( /\n/g, " " ); // using regex to change linebreaks to whitespaces
	filecontent = filecontent.replace( /[^\d.\s]/g, ''); //using regex to filter everthing non-numeric except whitespaces

	var coordArray = filecontent.split(" "); // using the whitespaces to split String into an array
	coordArray = coordArray.filter(function(entry) { return entry.trim() != ''; }); // trimming the whitespaces from the array, after using them to split the String into the array
	console.log(filecontent);
	console.log(coordArray);

	if(coordArray.length < 2){ // error handling for empty .txt. files
		throw "File does not contain coordinates!";
	  }

	};

  reader.readAsText(input.files[0]);
};


/**
function Line(lat1, long1, lat2, long2){

    //attributes
    this.lat1  = coordArray[0];
    this.long1 = coordArray[1];
		this.lat2  = coordArray[2];
		this.long2 = coordArray[3];
    var length;
    //methods

  }
**/
//------------------------------------------------------------------

function TxtToArray(filecontent){

	//attributes
	var txtInput = filecontent;
	var txtOutput = txtInput.buildArray;

	// methods
	function buildArray(input){
		this.input = filecontent;
		filecontent = filecontent.replace( /^\D+/g, ''); //using regex to filter all leading non-numerals
	  filecontent = filecontent.replace( /\n/g, " " ); // using regex to change linebreaks to whitespaces
		filecontent = filecontent.replace( /[^\d.\s]/g, ''); //using regex to filter everthing non-numeric except whitespaces

		var coordArray = filecontent.split(" "); // using the whitespaces to split String into an array
		coordArray = coordArray.filter(function(entry) { return entry.trim() != ''; }); // trimming the whitespaces from the array, after using them to split the String into the array
		console.log(filecontent);
		console.log(coordArray);

		if(coordArray.length < 2){ // error handling for empty .txt. files
			throw "File does not contain coordinates!";
		  }
	}
}
