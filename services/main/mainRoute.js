const express = require('express');
const route = express.Router();
const path = require("path");
const app = express();

const paystackPayment = require('../../helpers/paystackPayment');

const mainHandler = require("../main/services/mainHandler");

const mainService = require("../main/services/mainService");

const Cart = require('../../models/cart');


const Product = require('../../models/db/Product');


//setting custom public path for entry route
app.use("/online-store/products/",express.static(path.join(__dirname, "public/main")));

route.get("/test", mainHandler.test);
route.get("/see-cart", async (req, res)=> {
	let cart = new Cart(req.session.cart ? req.session.cart : {});
	let products = (req.session.cart) ? cart.getItems() :  [];
	let subs = await Product.fetchSubProducts();

	res.json(products[0]);	
});


route.get("/", mainHandler.IndexPage);

route.get("/store", mainHandler.GeneralStorePage);

route.get("/store/new-in", mainHandler.NewProducts);

route.get("/brands", mainHandler.AllBrandsPage);

route.get("/brands/:slug", mainHandler.BrandPage);

route.get("/cart", mainHandler.CartPage);

route.get("/checkout", mainHandler.CheckoutPage);

route.get("/checkout/success", mainHandler.PurchaseDetails);

route.get("/store/products/:slug", mainHandler.ProductPage);

route.get("/store/:super_category/", mainHandler.SuperCategoryHomePage);

route.get("/store/:super_category/categories/:category_slug", mainHandler.CategoryPage);


//static pages
route.get("/return-policy", mainHandler.ReturnPolicyPage);
route.get("/privacy-policy", mainHandler.PrivacyPolicyPage);
route.get("/impact", mainHandler.ImpactHomePage);
route.get("/about-us", mainHandler.AboutPage);
route.get("/how-to-sell", mainHandler.HowToSellPage);
route.get("/contact-us", mainHandler.ContactUs);



route.get('/*', (req, res) => {
	res.render("main/404" , {pageTitle : "Page not found "});
});



//service end points
route.post("/test", (req, res)=> {
	// paystackPayment.init(req.body.reference, process.env.PAYSTACK_SK)
	// .then(resp => {
	// 	// success
	// 	console.log(resp.data.status);

	// }).catch(resp => {
	// 	console.log("failed");
	// });

	let cart = new Cart (req.session.cart ? req.session.cart : {});
	console.log(cart);
	res.json({
		locals : res.app.locals.currency_choice, 
		session: req.session.currency_choice
	});
});



//currency
route.post("/json/currency/change", mainService.changeCurrency);

//cart
route.post("/json/cart/add", mainService.addToCart);
route.post("/json/cart/get", mainService.getCart);
route.post("/json/cart/get/item", mainService.getItemById);
route.post("/json/cart/update/qty", mainService.updateQty);
route.post("/json/cart/update/size", mainService.updateSize);
route.post("/json/cart/delete", mainService.removeCartItem);


//order
route.post("/json/order/submit", mainService.submitOrder);

//checkout
route.post("/json/checkout/pay", mainService.pay);

module.exports =  route;