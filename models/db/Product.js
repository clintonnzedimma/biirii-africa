const db = require('../../database/config');

const superCategories = ['men', 'women', 'accessories', 'kids'];

module.exports.superCategories = superCategories;



// Fetch All Products By Super categories
module.exports.fetchBySuperCategories = (sup, limit) => {
  return new Promise((resolve, reject)=> {
  		let result = {};

   		db.query("SELECT * FROM categories WHERE super_category = ? ",sup,(err, categories)=>{
 			if (err) reject(err);

 			if (categories.length == 0) reject("No category exists");


 			db.query(`SELECT * FROM products  ORDER BY RAND()  LIMIT ${limit}`,(err, products)=> {
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
module.exports.fetchAll = (orderBy = "id", limit = 1000) => {



  return new Promise((resolve, reject)=> {
  		let result = {};

   		db.query(`SELECT * FROM products ORDER BY ${orderBy} DESC LIMIT ${limit}`,(err, products)=>{
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

 	 				let brand_id = (product.brand_id) ? product.brand_id : 0;

 	 				db.query("SELECT * FROM brands WHERE id = ?", brand_id, (err, brands) => {

 	 					if (err) throw new Error(err);

		 				db.query("SELECT * FROM sub_products WHERE product_id = ?", product.id, (err, sp)=>{
			 	 			if (err) throw new Error(err);

			 	 				
			 	 			product.brand = (brands.length > 0) ? brands[0] : [];
			 	 				
			 	 			product.sub = sp;

			 	 			result = product;

			 	 			resolve(result);
			 	 		});	

 	 				});

 	 			}else {
 	 				reject("Product not found");
 	 			}

 	 	});
	});
}


// Fetch all sub products
module.exports.fetchSubProducts =  () => {
  return new Promise((resolve, reject)=> {
  		let result = {};

  		db.query("SELECT * FROM sub_products", (err, subs)=> {
  			if (err) {
  				reject(err);
  				throw new Error(err);
  			}

  			if (subs.length > 0) {
  				resolve(subs);			
  			}	
  		});	
   		
	});
}




// validate category slug by super category
module.exports.validateCategorySlugBySuper =  (arg) => {
  return new Promise((resolve, reject)=> {
  		let result = {};

  		db.query("SELECT * FROM categories WHERE super_category = ?", arg.super_category, (err, categories)=> {
  			if (err) {
  				reject(err);
  				throw new Error(err);
  			}

			if (categories.length > 0 
				&& 
				categories.map(obj => obj.slug).includes(arg.category_slug)) {
				resolve({status: true});
			}else {
				resolve({status: false});
			}	
  		});	
   		
	});
}



module.exports.fetchCategoryBySlug =  (slug) => {
  return new Promise((resolve, reject)=> {
  		let result = {};

  		db.query("SELECT * FROM categories WHERE slug = ?",slug ,(err, row)=> {
  			if (err) {
  				reject(err);
  				throw new Error(err);
  			}

  			if (row.length > 0) {
  				resolve(row[0]);			
  			}	
  		});	
   		
	});
}


module.exports.fetchByCategory = (category_id) => {

  return new Promise((resolve, reject)=> {
  			let result = [];

 			db.query("SELECT * FROM products WHERE category_id = ?  ORDER BY id DESC", category_id,(err, products)=> {
 				if (err) reject(err);

 				// if (products.length == 0) reject("No product exists");

	 			db.query("SELECT * FROM sub_products",(err, subProducts)=> {
	 				if (err) reject(err);

	 				if (subProducts.length == 0) reject("No sub product exists");


	 				if (products.length > 0) {
	 				  // adding associated sub product 
	 				  products = products.map(p=> ({
			        		...p,
			        		sub : subProducts.filter(s => s.product_id == p.id) || []
			   		  }));	

			 		  result =  products;
	 				}

			   		  resolve(result);

	 			});
 			});
 			
 		
 	});
};


module.exports.fetchMoreProductImages =  (pKey) => {
  return new Promise((resolve, reject)=> {
  		let result = {};

  		db.query("SELECT * FROM product_images WHERE pKey = ?", pKey ,(err, row)=> {
  			if (err) {
  				reject(err);
  				throw new Error(err);
  			}

  			if (row.length > 0) {
  				resolve(row);			
  			} else {
  				resolve([]);
  			}
  		});	
   		
	});
}



// Fetch All Products
module.exports.fetchByBrand = (brand_id) => {

  return new Promise((resolve, reject)=> {
      let result = {};

      db.query(`SELECT * FROM products WHERE brand_id = ? ORDER BY id DESC`, brand_id,(err, products)=>{
      if (err) throw new Error(err)

      db.query("SELECT * FROM sub_products", (err, sp)=>{
        if (err) throw new Error(err)
        
        if (products.length > 0 && sp.length > 0) {

          products = products.map(p=> ({
                ...p,
                sub: sp.filter(s=> s.product_id == p.id) 
            }));          

          resolve(products);
        } else {
          reject("Couldnt fetch products & sub products");
        }

      }); 

    });
  });
}
