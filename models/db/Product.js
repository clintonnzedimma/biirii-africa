const { Sequelize, Model, DataTypes } = require('sequelize');
const db = require('../../database/config');
const sequelize = require('../../database/sequelizeConfig');

const superCategories = ['men', 'women', 'accessories'];

module.exports.superCategories = superCategories;



// Fetch All Products By Super categories
module.exports.fetchBySuperCategories = (arg) => {
  return new Promise((resolve, reject)=> {
  		let result = {};

   		db.query("SELECT * FROM categories WHERE super_category = ? ",arg,(err, categories)=>{
 			if (err) reject(err);

 			if (categories.length == 0) reject("No category exists");


 			db.query("SELECT * FROM products  ORDER BY id DESC",(err, products)=> {
 				if (err) reject(err);

 				if (products.length == 0) reject("No product exists");

	 			db.query("SELECT * FROM sub_products",(err, subProducts)=> {
	 				if (err) reject(err);

	 				if (subProducts.length == 0) reject("No sub product exists");

	 				// filtering products by checking if they are in the categories
	 				 products = products.filter(p=> {
	 				 	return categories.some(c => c.id == p.category_id);
	 				 });


	 				  // adding associated sub product 
	 				  products = products.map(p=> ({
			        		...p,
			        		sub : subProducts.filter(s => s.product_id == p.id) || []
			   		  }));	


	 				  result.categories = categories;
			 		  result.products =  products;	

			   		  resolve(result);

	 			});
 			});
 			
 		})

 	});
};




// Fetch All Products
module.exports.fetchAll = () => {
  return new Promise((resolve, reject)=> {
  		let result = {};

   		db.query("SELECT * FROM products ORDER BY id DESC " ,(err, products)=>{
 	 		if (err) throw new Error(err)

 	 		db.query("SELECT * FROM sub_products", (err, sp)=>{
 	 			if (err) throw new Error(err)
 	 			
 	 			if (products.length > 0 && sp.length > 0) {

	 				products = products.map(p=> ({
		        		...p,
		        		sub: sp.filter(s=> s.product_id == p.id) 
		   		 	}));	 	 			

 	 				resolve(products);
 	 			}	else {
 	 				reject("Couldnt fetch products & sub products");
 	 			}

 	 		});	

 	 	});
	});
}



// Fetch One By object argument
module.exports.fetchOne = (arg) => {
  return new Promise((resolve, reject)=> {
  		let result = {};

   		db.query("SELECT * FROM products WHERE ?", [arg] ,(err, product)=>{
 	 		if (err) throw new Error(err);

 	 			if (product.length > 0) {
 	 				product = product[0];

		 	 		db.query("SELECT * FROM sub_products WHERE product_id = ?", product.id, (err, sp)=>{
		 	 			if (err) throw new Error(err)


		 	 			product.sub = sp;

		 	 			result = product;

		 	 			resolve(result);
		 	 		});	

 	 			}else {
 	 				reject("Product not found");
 	 			}

 	 	});
	});
}








