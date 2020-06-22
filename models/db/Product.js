const { Sequelize, Model, DataTypes } = require('sequelize');
const db = require('../../database/config');
const sequelize = require('../../database/sequelizeConfig');

// Fetch All Products
module.exports.fetchBySuperCategories = (arg) => {
  return new Promise((resolve, reject)=> {
  		let result = [];

   		db.query("SELECT * FROM categories WHERE super_category = ? ",arg,(err, categories)=>{
 			if (err) reject(err);

 			db.query("SELECT * FROM products WHERE ORDER BY id DESC",(err, products)=> {
 				if (err) reject(err);

	 			db.query("SELECT * FROM sub_products WHERE ORDER BY id DESC",(err, subProducts)=> {
	 				if (err) reject(err);



	 				  products = products.map(product=> ({
			        		...product,
			        		sub : subProducts.filter(s => s.product_id == product.id) || []
			   		 	}));	



		 			if (categories.length > 0) {
			 			categories = categories.map(category=> ({
			        		...category,
			        		products: products || []
			   		 	}));	
		 			} 

		 			console.log(categories);

	 			});
 			});
 			
 		})

 	});
};


