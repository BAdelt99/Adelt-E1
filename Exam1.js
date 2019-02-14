var http = require('http');
var server = http.createServer(requestHandler); 
server.listen(process.env.PORT, process.env.IP, startHandler);

function startHandler()
{
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
}
function requestHandler(req,res)
{
try
  {
    var url = require('url');
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    
    res.writeHead(200, {'Content-Type': 'application/json'});
    
    if (query['cmd'] == undefined)
      throw Error("A command must be specified");
      
      if(query['mpg'] == undefined || parseInt(query['mpg']) < 0)
          throw Error("Invalid miles per gallon");
          
      if(query['fuelCost'] == undefined || parseInt(query['fuelCost']) < 0)
          throw Error("Invalid fuel cost");
          
        
      
      var result = {};
      if(query['cmd'] == 'calcDistance')
      {
          result = calcDistance(query);
      }
      else if(query['cmd'] == 'calcCost')
      {
          result = calcCost(query);
      }
      else
      {
          throw Error("Invalid command:" + query['cmd']);
      }
      
      res.write(JSON.stringify(result));
    res.end('');
  }
  catch(e)
  {
     var error = {'error' : e.message};
    res.write(JSON.stringify(error));
    res.end(''); 
  }
  
  function calcDistance(query)
  
  {
        if(query['budget'] == undefined || parseInt(query['budget']) < 0)
          throw Error("Invalid budget");
          
      var fuelCost = parseInt(query['fuelCost']);
      var mpg = parseInt(query['mpg']);
      var budget = parseInt(query['budget']);
     var result = {'Distance' : (budget/fuelCost)*mpg };
      return result;
  }
  
  function calcCost(query)
  {
        if(query['distance'] == undefined || parseInt(query['distance']) < 0)
          throw Error("Invalid distance");
          
      var fuelCost = parseInt(query['fuelCost']);
      var mpg = parseInt(query['mpg']);
      var distance = parseInt(query['distance']);
       var result = {'Cost' : (distance/mpg)*fuelCost };
      return result;
  }
}
