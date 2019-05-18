/**
  *
  * main() will be run when you invoke this action
  *
  * @param Cloud Functions actions accept a single parameter, which must be a JSON object.
  *
  * @return The output of this action, which must be a JSON object.
  *
  */

var moment = require('moment');

// Format timestamp
// input date string in format YYYY-MM-DDTHH:MM:SS e.g. 2008-07-20 T 20:30:00
// output custom formatted date + time e.g. Fri Jul 20 8:30PM
function formatTimestamp(timestampStr) {
    var timestamp = moment(timestampStr);
    
    return timestamp.format('ddd MMM Do, h:mm a');
}

// Converts restaurant cuisine type to full name and cuisine
// input cuisine type e.g. mexican
// output is full name and cuisine type e.g. our Mexican restaurant, La Mesa Rosa.
function restaurantName(cuisine) {
   var name;
   var suffix = 'Bon appetit.';
   
   switch (cuisine) {
		case "mexican":
			name = "our Mexican restaurant, La Mesa Rosa.";
			suffix = "Buen provecho.";
			break;
		case "american":
			name = "our American restaurant, Hemmingway's.";
			break;
		case "french":
			name = "our French restaurant, Le Cordon Bleu.";
			break;
		case "italian":
			name = "our Italian restaurant, Osteria.";
			suffix = "Buono appetito.";
			break;
		case "chinese":
			name = "our Chinese restaurant, Hao Hao.";
			break;
		default:
			name = "ERROR - invalid input - could not format";
			break;
   }
   
   return name + ' ' + suffix;
   
   
}

// Returns formatted confirmation message
function formatResponse(params) {
    var formattedName = restaurantName(params.cuisine);
    var formattedTimestamp = formatTimestamp(params.date + 'T' + params.time + '.000');
    
    return "Confirmed. I've booked a table for " + params.number + " people on " + formattedTimestamp + " at " + formattedName;
}

function main(params) {

    returnValue = { message: formatResponse(params)};

    return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: returnValue
    };
}


//module.exports.main = entryPoint;
