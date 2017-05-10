/**
desired way to use filters

function filterInput(content){
	this.content = filecontent;
	filecontent = filecontent.replace( /^\D+/g, ''); //using regex to filter all leading non-numerals
  filecontent = filecontent.replace( /[^\d.\s]/g, ''); //using regex to filter everthing non-numeric except whitespaces
	filecontent = filecontent.replace( /(\r\n|\n|\r)/gm,""); // using regex filter to filter all linebreaks
}
**/


/**
* @desc Create a polyline, add lines read from a given
        file and insert the full length in the HTML document
* @see Learnweb
* @param event OpenFile event
*/
var ReadPolyline = function(event) {

	var input = event.target;
  var reader = new FileReader();

  reader.onload = function(){
	var filecontent = reader.result; //coordinate data saved to this variable
  //filecontent.filterInput(filecontent);  SO
	filecontent = filecontent.replace( /^\D+/g, ''); //using regex to filter all leading non-numerals
  filecontent = filecontent.replace( /[^\d.\s]/g, ''); //using regex to filter everthing non-numeric except whitespaces
	filecontent = filecontent.replace( /(\r\n|\n|\r)/gm,""); // using regex filter to filter all linebreaks

	var coordArray = filecontent.split(" "); // using the whitespaces to split String into an array
	coordArray = coordArray.filter(function(entry) { return entry.trim() != ''; }); // trimming the whitespaces from the array, after using them to split the String into the array
	console.log(filecontent);
	console.log(coordArray);
	};

  reader.readAsText(input.files[0]);
  };

function Line(start, end){

    //attributes
    this.start = filecontent[0];
    this.end = filecontent[1];
    console.log(line);
    //methods

  }
