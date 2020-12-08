const db = require('../../database/config');
const sequelize = require('../../database/sequelizeConfig');

// Fetch All
module.exports.fetchAll = () => {

  return new Promise((resolve, reject)=> {
  		let result = {};

   		db.query(`SELECT * FROM brands`,(err, brands)=>{
 	 		if (err) throw new Error(err)
 	 		if (brands.length == 0 ) reject("No brands yet")
 	 		if (brands.length > 0) resolve(brands);	

 	 	});
	});
}


module.exports.fetchBySlug = (slug) => {

  return new Promise((resolve, reject)=> {
  		let result = {};

   		db.query(`SELECT * FROM brands WHERE slug = ?`, slug,(err, brands)=>{
 	 		if (err) throw new Error(err)
 	 		if (brands.length == 0 ) reject("No brand with this slug");
 	 		if (brands.length > 0) resolve(brands);	

 	 	});
	});
}



module.exports.fetchWithImages = () => {

	return new Promise((resolve, reject)=> {
			let result = {};
  
			 db.query(`SELECT * FROM brands WHERE main_img IS NOT NULL ORDER BY RAND() LIMIT 8`,(err, brands)=>{
				if (err) throw new Error(err)
				if (brands.length == 0 ) reject("No brand with image");
				if (brands.length > 0) resolve(brands);	
  
			});
	  });
  }