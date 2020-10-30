const moment = require('moment');
const slug = require('slug');
const db = require('../../../database/config');
const Cart = require('../../../models/cart');

//db models
const Category = require('../../../models/db/Category');
const Product = require('../../../models/db/Product');
const Zone = require('../../../models/db/Zone');
const Brand = require('../../../models/db/Brand');
const Promotion = require('../../../models/db/Promotion');

//helper
const helpers = require('../../../helpers/helpers');


module.exports.test = async(req,res) => {

	let brands  = await Brand.fetchAll();

	for (var i = 0; i < brands.length; i++) {
			db.query("UPDATE brands SET slug = ? WHERE id = ?",[slug(brands[i].name.toLowerCase()),brands[i].id],(err, worked)=> {

			});
	}
}



/*
* Static handlers below
*/

module.exports.IndexPage = async (req, res)=> {
	let promo = await Promotion.fetchOneActive();

	return res.render("main/index", {
		 pageTitle: "Welcome to Biirii Africa",
		 superCategory: null,
		 promo : promo[0] || null
	 });
}


module.exports.ReturnPolicyPage = (req, res)=> {
	return res.render("main/return_policy", {
		 pageTitle: "Return Policy - Biirii Africa",
		 superCategory: null
	 });
}


module.exports.PrivacyPolicyPage = (req, res)=> {
	return res.render("main/privacy_policy", {
		 pageTitle: "Privacy policy - Biirii Africa",
		 superCategory: null
	 });
}

module.exports.HowToSellPage = (req, res)=> {
	return res.render("main/how_to_sell", {
		pageTitle: "How to sell - Biirii Africa",
		superCategory: null
	 });
}

module.exports.ContactUs = (req,res)=> {
	return res.render("main/contact_us", {
		pageTitle: "Contact Us - Biirii Africa",
		superCategory: null
	});
}

module.exports.AboutPage = (req, res)=> {
	return res.render("main/about_page", {
		 pageTitle: "About Us - Biirii Africa",
		 superCategory: null
	 });
}


module.exports.ImpactHomePage = (req, res)=> {
	return res.render("main/impact_home", {
		 pageTitle: "Impact - Biirii Africa",
		 superCategory: null
	 });
}



module.exports.SuperCategoryHomePage =  async (req, res)=> {	
	let superCategory = req.params.super_category.toLowerCase();


	if (!Product.superCategories.includes(superCategory)) {
		res.redirect("/404");
	}	

	let fetchProductDataBySuperCategories = await Product.fetchBySuperCategories(superCategory,40);
	let fetchedProducts = fetchProductDataBySuperCategories.products;
	let fetchedCategories = fetchProductDataBySuperCategories.categories;

	let latestProducts =  await Product.fetchAll('id',10);

	return res.render("main/home_page", 
		{
			pageTitle: `${helpers.ucwords(superCategory)} - Biirii Africa`,
			superCategory: superCategory,
			latestProducts: latestProducts,
			products: fetchedProducts,
			categories :fetchedCategories,
		});	


}


module.exports.GeneralStorePage = async (req, res)=> {

	let products = await Product.fetchAll("RAND()", limit = 40);

	let promo = await Promotion.fetchOneActive();

	let latestProducts =  await Product.fetchAll('id', limit = 12);

	//currencies
	let Currency = new helpers.Currency(req.session.currencies);


	return res.render("main/general_store", {
		 pageTitle: `Online store - BiiriiAfrica`,
		 products: products,
		 superCategory: null,
		 categories: [],
		 latestProducts: latestProducts,
		 promo: promo[0] || null
	 });
}




module.exports.NewProducts = async (req, res)=> {

	let products = await Product.fetchAll();

	//currencies
	let Currency = new helpers.Currency(req.session.currencies);

	return res.render("main/new_products", {
		 pageTitle: `New in - Biirii Africa`,
		 products: products,
		 superCategory: null,
		 categories: []
	 });
}



module.exports.ProductPage = async (req, res)=> {

	let product = await Product.fetchOne({slug : req.params.slug});

	let moreImages = await Product.fetchMoreProductImages(product.pKey);

	let discountPrice = product.sub[0].price - ((product.discount_percent/100) * product.sub[0].price)


	return res.render("main/product", {
		 pageTitle: `${product.name} - Biirii Africa`,
		 product: product,
		 discountPrice : discountPrice,
		 moreImages : moreImages,
		 superCategory: null
	 });
}



module.exports.CartPage = async(req, res)=> {
	let cart = new Cart(req.session.cart ? req.session.cart : {});
	let products = (cart) ? cart.getItems() :  [];
	let subs = await Product.fetchSubProducts();

	console.log(cart.getItems());	

	return res.render("main/cart", {
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
	let zones = await Zone.fetchAll() || [];

	if (products.length == 0) {
		return res.redirect("/cart");
	}


	return res.render("main/checkout", {
		 pageTitle: `Checkout - Biirii Africa`,
		 products: products,
		 subs : subs,
		 zones : zones,
		 superCategory: null,
		 totalPrice : cart.totalPrice,
		 categories: []
	 });
}



module.exports.PurchaseDetails = (req, res)=> {
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

	let latestProducts =  await Product.fetchAll('id',10);

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


module.exports.AllBrandsPage = async (req, res)=> {
	let brands  = await Brand.fetchAll();

	return res.render("main/all_brands", 
		{
			pageTitle: `Shop by Brands - Biirii Africa`,
			brands : brands,
			superCategory: null
		});	
}


module.exports.BrandPage = async (req, res)=> {
	let brand  = await Brand.fetchBySlug(req.params.slug);

	if (brand.length == 0) {
		return res.redirect("/404");
	} 

	brand = brand[0];

	let products = await Product.fetchByBrand(brand.id);

	return res.render("main/brand_page", 
		{
			pageTitle: `${brand.name} - Biirii Africa`,
			brand : brand,
			products : products,
			superCategory: null,
			categories : []
		});	
}