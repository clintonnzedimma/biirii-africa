const db = require('../../database/config');


// Fetch All Zones
module.exports.fetchAll = () => {

  return new Promise((resolve, reject)=> {
  		let result = {};

   		db.query(`SELECT * FROM zones`,(err, zones)=>{
 	 		if (err) throw new Error(err)
 	 		if (zones.length == 0 ) reject("No zone yet")
 	 		if (zones.length > 0) resolve(zones);	

 	 	});
	});
}


