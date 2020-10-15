const db = require('../../database/config');


// Fetch Active
module.exports.fetchOneActive = () => {

  return new Promise((resolve, reject)=> {
  		let result = {};

   		db.query(`SELECT * FROM promotions WHERE id = 1 and status = 1`,(err, row)=>{
 	 		if (err) throw new Error(err)
 	 		if (row.length == 0 ) resolve([]);
 	 		if (row.length > 0) resolve(row);	

 	 	});
	});
}


