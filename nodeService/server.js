/*eslint no-console: 0*/
"use strict";

// testing CI/CD

// Define libraries
const fs = require('fs');
const readline = require('readline');
var http = require("http");


// Variables
let filePath = './I030201908271802.dat';
var port = process.env.PORT || 3000;

var data = '';
var line = 0;
var result = [];
var lines = [];


// Create Read Stream
var readStream = fs.createReadStream(filePath, 'utf8');

const rl = readline.createInterface({
  input: readStream,
  crlfDelay: Infinity
});

// Read Lines by line and push line Data to Array
rl.on('line', (input) => {
  lines.push(input);
}).on('close', () => {
  // on finish call funciton to process data
  operateFile();
});



function operateFile()
{

  var len = lines.length;
  var str = lines[2].toString();
  var strLen = str.length;

  console.log("total lines", len);
  console.log("String Length", strLen);
  // console.log("\n", lines[2]);

  lines.forEach(function (lineData) {
    
    var strData = lineData.toString();
    result.push({
        flight_No: strData.substring(0,4),
        menu_Code: strData.substring(175,183),
        Date: strData.substring(187,195),
        ingredient1: strData.substring(203,214),
        ingredient2: strData.substring(214,240),
        ingredient3: strData.substring(241,266),
        Area: strData.substring(913,920),
        Code2: strData.substring(1092,1102),
        Code3: strData.substring(1105,1116),
        Quanity: strData.substring(1416,1423)
      });   
  });

  //  var r1 = JSON.stringify(result);
  //  console.log(r1);

  console.log("Finished Processing- Producing Ouput");

   http.createServer(function (req, res) {
   res.writeHead(200, {"Content-Type": "text/plain"});
     res.end(JSON.stringify(result));     
       }).listen(port);    
   console.log("Server listening on port %d", port);
}