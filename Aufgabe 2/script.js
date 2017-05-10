var coordArray; //initializing Array

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

	if(coordArray.length < 1){
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

	/**
	desired way to use filters

	function filterInput(content){
		this.content = filecontent;
		filecontent = filecontent.....
	}
	**/
