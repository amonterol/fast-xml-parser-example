var express = require('express');

var router = express.Router();

var fs = require('fs');

var fastXmlParser = require('fast-xml-parser');

var he = require('he');


var options = {
  attributeNamePrefix: "",
  attrNodeName: false, //default is 'false'
  textNodeName: "#text",
  ignoreAttributes: true,
  ignoreNameSpace: false,
  allowBooleanAttributes: false,
  parseNodeValue: true,
  parseAttributeValue: false,
  trimValues: true,
  cdataTagName: false, //default is 'false'
  cdataPositionChar: "\\c",
  localeRange: "", //To support non english character in tag/attribute values.
  parseTrueNumberOnly: false,
  // attrValueProcessor: a => he.decode(a, { isAttributeValue: true }),//default is a=>a
  //tagValueProcessor: a => he.decode(a) //default is a=>a
};






/* GET home page. */

router.get('/', function (req, res, next) {
  var xmlFile = __dirname + "/../public/xmlfiles/factura.xml";
  var xmlData;
  var jsonObj;
  var result;
  console.log('este es el documento');
  console.log(xmlFile);


  fs.readFile(xmlFile, "utf-8", function (error, text) {

    if (error) {

      throw error;

    } else {

      xmlData = text;
      console.log('este es el resultado del if');
      console.log(fastXmlParser.validate(xmlData));
      // Intermediate obj
      var tObj = fastXmlParser.getTraversalObj(xmlData, options);
      jsonObj = fastXmlParser.convertToJson(tObj, options);

      result = JSON.stringify(jsonObj);
      
      fs.writeFile("factura.json", result, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }
        // mongoimport --host <host_name> --username <user_name> --password <password> --db <database_name> --collection <collection_name> --file <input_file>
        console.log("JSON file has been saved.");
    });
      
      
      
      
      //console.log(result);
      res.render('index', { result: result });


      console.log(jsonObj);

      //res.render('index', { jsonObj: jsonObj });
    }

  });

});
/*
      if (fastXmlParser.validate(xmlData) === true) { //optional (it'll return an object in case it's not valid)
        var jsonObj = fastXmlParser.parse(xmlData, options);
        
      }

      console.log('este es el resultado del if');
      console.log(fastXmlParser.validate(xmlData));
      // Intermediate obj
      var tObj = fastXmlParser.getTraversalObj(xmlData, options);
      var jsonObj = fastXmlParser.convertToJson(tObj, options);

      var result = JSON.stringify(jsonObj);
      console.log(result);
      res.render('index', { result: result });
      
      
      //console.log(jsonObj);
      
      //res.render('index', { jsonObj: jsonObj });

    

  });

*/
module.exports = router;
