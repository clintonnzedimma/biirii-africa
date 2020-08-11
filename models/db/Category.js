const db = require('../../database/config');

// Fetch All Products
module.exports.getAllBySuperCategories = (arg) => {
  return new Promise((resolve, reject)=> {
   		db.query("SELECT * FROM categories WHERE super_category = ? ",arg,(err, rows)=>{
 			if (err) reject(err);
 			

 			rows = rows.map(row=> ({
        		...row,
        		x: "clcl"
   		 	}));

 			console.log(rows);
 			if (rows) resolve(rows);
 		})

 	});
};



