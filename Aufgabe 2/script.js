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
	var filecontent=reader.result; //coordinate data saved to this variable
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
