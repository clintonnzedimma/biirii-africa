const moment = require('moment');
const db = require('../../../database/config');
const Cart = require('../../../models/cart');

//db models
const Category = require('../../../models/db/Category');
const Product = require('../../../models/db/Product');

//helper
const helpers = require('../../../helpers/helpers');

/*
* Static handlers below
*/


module.exports.IndexPage = (req, res)=> {
	res.render("main/index", {
		 pageTitle: "Welcome to Biirii Africa",
		 superCategory: null
	 });
}


module.exports.ReturnPolicyPage = (req, res)=> {
	res.render("main/return_policy", {
		 pageTitle: "Return Policy - Biirii Africa",
		 superCategory: null
	 });
}


module.exports.PrivacyPolicyPage = (req, res)=> {
	res.render("main/impact_home", {
		 pageTitle: "Priacy policy - Biirii Africa",
		 superCategory: null
	 });
}




module.exports.AboutPage = (req, res)=> {
	res.render("main/about_page", {
		 pageTitle: "About Us - Biirii Africa",
		 superCategory: null
	 });
}


module.exports.ImpactHomePage = (req, res)=> {
	res.render("main/BOILERPLATE", {
		 pageTitle: "Impact - Biirii Africa",
		 superCategory: null
	 });
}



//Generated Pages
module.exports.SystemReceiptPage = (req, res)=> {
	let orderKey = req.params.key;
	let name = req.params.name;  

	return res.render("main/generate_receipt_page", {
		 pageTitle: "Receipt",
		 orderKey: orderKey,
		 superCategory: null
	 });
}




module.exports.SuperCategoryHomePage =  async (req, res)=> {	
	let superCategory = req.params.super_category.toLowerCase();


	if (!Product.superCategories.includes(superCategory)) {
		res.redirect("/404");
	}	

	let fetchProductDataBySuperCategories = await Product.fetchBySuperCategories(superCategory);
	let fetchedProducts = fetchProductDataBySuperCategories.products;
	let fetchedCategories = fetchProductDataBySuperCategories.categories;

	let latestProducts =  await Product.fetchAll();

	res.render("main/home_page", 
		{
			pageTitle: `${helpers.ucwords(superCategory)} - Biirii Africa`,
			superCategory: superCategory,
			latestProducts: latestProducts,
			products: fetchedProducts,
			categories :fetchedCategories,
		});	


}


module.exports.GeneralStorePage = async (req, res)=> {

	let products = await Product.fetchAll("RAND()");

	let latestProducts =  await Product.fetchAll();

	res.render("main/general_store", {
		 pageTitle: `Online store - BiiriiAfrica`,
		 products: products,
		 superCategory: null,
		 categories: [],
		 latestProducts: latestProducts
	 });
}



module.exports.ProductPage = async (req, res)=> {

	let product = await Product.fetchOne({slug : req.params.slug});

	let moreImages = await Product.fetchMoreProductImages(product.pKey);

	console.log(product.name);


	res.render("main/product", {
		 pageTitle: `${product.name} - Biirii Africa`,
		 product: product,
		 moreImages : moreImages,
		 superCategory: null
	 });
}



module.exports.CartPage = async(req, res)=> {
	let cart = new Cart(req.session.cart ? req.session.cart : {});
	let products = (cart) ? cart.getItems() :  [];
	let subs = await Product.fetchSubProducts();

	console.log(cart.getItems());	

	res.render("main/cart", {
		 pageTitle: `Cart - BiiriiAfrica`,
		 products: products,
		 subs : subs,
		 superCategory: null,
		 totalPrice : cart.totalPrice,
		 categories: []
	 });
}



module.exports.	CheckoutPage = async(req, res)=> {
	let cart = new Cart(req.session.cart ? req.session.cart : {});
	let products = (cart) ? cart.getItems() :  [];
	let subs = await Product.fetchSubProducts();

	console.log(cart.getItems());	

	res.render("main/checkout", {
		 pageTitle: `Checkout - Biirii Africa`,
		 products: products,
		 subs : subs,
		 superCategory: null,
		 totalPrice : cart.totalPrice,
		 categories: []
	 });
}



module.exports.PurchaseDetails = (req, res)=> {
	/*NB: Validate order key later*/
	let orderKey = req.session.order.key;  


	if (orderKey) {
		return res.render("main/purchase_details", 
			{
				pageTitle: ` ${orderKey} - Purchase sucessful - Biirii Africa.`,
				orderKey : orderKey
			});		
	} else {
		return res.redirect("/404");
	}

}



module.exports.CategoryPage = async (req, res)=> {

	let superCategory = req.params.super_category.toLowerCase();
	let category_slug = req.params.category_slug.toLowerCase();

	if (!Product.superCategories.includes(superCategory)) {
		 return res.redirect("/404");
	}	

	let validateCategorySlugBySuper = await Product.validateCategorySlugBySuper({
		super_category: superCategory,
		category_slug: category_slug
	});

	if (validateCategorySlugBySuper.status == false){
		 return res.redirect("/404");
	} 

	let category = await Product.fetchCategoryBySlug(category_slug);

	let fetchedProducts = await Product.fetchByCategory(category.id);

	let latestProducts =  await Product.fetchAll();

	return res.render("main/category", 
		{
			pageTitle: `${helpers.ucwords(category.name)} | ${helpers.ucwords(superCategory)} - Biirii Africa`,
			products: fetchedProducts,
			superCategory: superCategory,
			latestProducts: latestProducts,
			category : category,
			categories : []
		});	

}
