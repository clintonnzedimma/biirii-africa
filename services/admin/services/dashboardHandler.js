/*
*This service handles each page route
*/



const db = require('../../../database/config');

const Category = require('../../../models/db/Category');

//Dashboard entry point
module.exports.Index = (req, res) => {
	return res.render("dashboard/login");
}



/*
* All handler methods below are protected if user is logged in
*/


// Home page
module.exports.Home = (req, res) => {

	let orderIsDelivered = false;

	db.query("SELECT * FROM all_orders WHERE is_delivered IS NULL ORDER BY time_added DESC LIMIT 7" , (err, allOrders)=>{	
		db.query("SELECT * FROM product_orders" , (err, productOrders)=>{
			if (err) { throw new Error (err);}

			return res.render("dashboard/index",
			 {
			 	pageTitle:`Home - Dashboard (${req.session.adminUsername})`,
			 	orders : (allOrders.length > 0) ? allOrders : null,
			 	productOrders : productOrders
			 });
		});
				
	});

}



// Orders page 
module.exports.OrderList = (req, res) => {
	return res.render("dashboard/order_list", {pageTitle:`Orders`});
}

module.exports.OrderMenu = (req, res) => {
	return res.render("dashboard/order_menu", {pageTitle:`Order menu`});
}



// Products page  
module.exports.ProductList = (req, res) => {

	db.query('SELECT * FROM products ORDER BY id DESC', (err, row)=> {
		db.query('SELECT * FROM categories ORDER BY id ASC', (err, categories)=> {
			return res.render("dashboard/products", 
				{
					pageTitle:`Products`, 
					products: row, 
					categories : categories
				}
			); 
		});
	  	
	});	
	
}

// Add product page  
module.exports.AddProduct = (req, res) => {
	db.query('SELECT * FROM brands ORDER BY id DESC', (err, brands)=> { 
		db.query('SELECT * FROM categories ORDER BY id DESC', (err, categories)=> {
		  	return res.render("dashboard/create_product", 
		  		{
		  			pageTitle :`Add product`, 
		  			categories : (categories.length > 0) ? categories : [],
		  			brands : (brands.length > 0) ? brands : []
		  		});
		});
	});
}



// Edit product page  
module.exports.EditProduct = (req, res) => {
	pKey = req.params.key;
	

	db.query('SELECT * FROM products WHERE pKey = ? ORDER BY id DESC', [pKey],(err, product)=> {
		if (product.length > 0) {
			
			db.query('SELECT * FROM categories ORDER BY id ASC', (err, categories)=> {
					db.query('SELECT * FROM sub_products WHERE product_key = ?', [pKey], (err, subProducts)=> {

						db.query('SELECT * FROM brands ORDER BY id DESC', (err, brands)=> { 
							if (categories.length > 0) {
								return res.render("dashboard/edit_product", 
									{
										pageTitle:`Edit products - ${product[0].name}`, 
										product: product[0],
										categories : categories,
										brands : brands,
										hasDiscount : (product[0].discount_percent > 0) ? true :false,
										subProducts : (subProducts.length > 0) ? subProducts : []
								});
							}

						});			

					});				


				
			});
		} else {
	  		 res.redirect("/dashboard/404");
		}
	});

}


//Add sub product or variety
module.exports.AddSubProduct = (req, res) => {
	db.query('SELECT * FROM products WHERE pKey = ?', [req.params.pKey], (err, row)=> {
		if (err) throw new Error(err);
		if (!row) res.status(400).send("Not found");


	  	return res.render("dashboard/add_sub_product", 
	  		{
	  			pageTitle:`Add variety - ${row[0].name}`,
	  			product : row[0]
	  		});
	});
}


//Add sub product or variety
module.exports.EditSubProduct = (req, res) => {
	let id = req.params.key; // sub product id in the db

	db.query('SELECT * FROM sub_products WHERE id = ?', [id], (err, row)=> {
		if (err) throw new Error(err);
		if (!row) res.status(400).send("Not found");

		let sp = row[0];


		db.query("SELECT * FROM products WHERE pKey = ?", [sp.product_key], (err, row)=>{
			if (err) throw new Error(err);

			let p = row[0];


			return res.render("dashboard/edit_sub_product", 
				{
					pageTitle : `Edit variety - ${p.name} - ${sp.name}`,
					subProduct : sp,
					product : p
				});
		});
	});
}




// Categories page  
module.exports.Categories = (req, res) => {
	db.query('SELECT * FROM categories ORDER BY id DESC', (err, row)=> {
	  	return res.render("dashboard/categories", {pageTitle:`Categories`, categories : row});
	});
}

// Add Category page  
module.exports.AddCategory = (req, res) => {
	db.query("SELECT * FROM super_categories",(err, superCategories)=> {

		return res.render("dashboard/create_category", 
			{
				pageTitle:`Add category`,
				superCategories : superCategories
			});

	});
	;
}


// Edit Category page  
module.exports.EditCategory = (req, res) => {
	let id = req.params.key;
	db.query('SELECT * FROM categories WHERE id = ?', id, (err, row)=> {

		if (row.length > 0) {
			return res.render("dashboard/edit_category", 
				{
					pageTitle:`Edit category - ${row[0].name}`,
					category : row[0]
			});
		} else {
			res.redirect("/dashboard/404");
		}
	});

}


// Customer Order page  
module.exports.CustomerOrder = (req, res) => {
	db.query("SELECT * FROM products", (err, products)=> {
		db.query("SELECT * FROM all_orders WHERE order_key = ?", req.params.order_key, (err, allOrders)=> {
			db.query("SELECT * FROM product_orders WHERE order_key = ?", req.params.order_key, (err, productOrders)=> {


				db.query("SELECT * FROM delivered_orders WHERE order_key = ?", req.params.order_key, (err, deliveredOrders)=> { 

					let order = allOrders[0];
					let timeDelivered = null;

					if (deliveredOrders.length > 0) {
						timeDelivered = deliveredOrders[0].time_added;
					}

					return res.render("dashboard/order", 
						{
							pageTitle : `Order - ${req.params.order_key} - Dashboard`, 
							order : order,
							key : req.params.order_key,
							productOrders : productOrders,
							timeDelivered : timeDelivered,
							products : products
						});
			});
					 

				
			});	
		})
	});
}




// New orders
module.exports.NewOrders = (req, res) => {


	db.query("SELECT * FROM all_orders WHERE is_delivered IS NULL ORDER BY time_added DESC" , (err, allOrders)=>{	
		db.query("SELECT * FROM product_orders" , (err, productOrders)=>{
			if (err) { throw new Error (err);}

			return res.render("dashboard/new_orders_list",
			 {
			 	pageTitle:`New orders`,
			 	orders : (allOrders.length > 0) ? allOrders : null,
			 	productOrders : productOrders
			 });
		});
				
	});

}



// Delivered orders
module.exports.DeliveredOrders = (req, res) => {

	let orderIsDelivered = false;

	db.query("SELECT * FROM all_orders WHERE is_delivered = 1 ORDER BY time_added DESC" , (err, allOrders)=>{	
		db.query("SELECT * FROM delivered_orders" , (err, deliveredOrders)=>{
			if (err) { throw new Error (err);}

			return res.render("dashboard/delivered_order_list",
			 {
			 	pageTitle:`Delivered orders`,
			 	orders : (allOrders.length > 0) ? allOrders : null,
			 	deliveredOrders : deliveredOrders
			 });
		});
				
	});

}



module.exports.BrandList = (req, res) => {

	db.query("SELECT * FROM brands ORDER BY id DESC", (err, brands)=>{

		if (err) { throw new Error (err);}

		return res.render("dashboard/all_brands", {
			pageTitle:`Brands`, 
			brands : brands
		});

	});	
}



module.exports.AddBrand = (req, res) => {
		return res.render("dashboard/create_brand", {
			pageTitle:`Create Brand`, 
		});
}


module.exports.EditBrand = (req, res) => {
		db.query("SELECT * FROM brands WHERE id = ?",req.params.id,(err, brands)=> {

			return res.render("dashboard/edit_brand", {
				pageTitle:`Modify Brand - ${brands[0].name} `,
				brand : brands[0] 
			});
		});
}



/**
* # The following modules below are CONTENT MANAGEMENT #
*/


module.exports.ContentMgtHome = (req, res) => {
	return res.render("dashboard/content_mgt", {
		pageTitle : `Content Management`
	});
}


module.exports.Promotion = (req, res) => {
	db.query("SELECT * FROM promotions WHERE id = 1",(err, promotion)=> {
		promotion = promotion[0];

		return res.render("dashboard/promotion_page", {
			pageTitle : `Promotion`,
			promotion : promotion
		});	
	});
}