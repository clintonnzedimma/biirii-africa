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

route.get("/test", (req, res)=> {
	Product.findAll().then(products => {
	  console.log(products);
	});
});



//static routes
route.get("/", mainHandler.SuperCategoryHomePage);

route.get("/:super_category/", mainHandler.SuperCategoryHomePage);







route.get('/*' ,(req, res) => {
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
	res.json(cart.totalPrice);
});

//cart
route.post("/json/cart/add", mainService.addToCart);
route.post("/json/cart/get", mainService.getCart);
route.post("/json/cart/get/item", mainService.getItemById);
route.post("/json/cart/update/qty", mainService.updateQty);
route.post("/json/cart/delete", mainService.removeCartItem);


//order
route.post("/json/order/init", mainService.initOrder);
route.post("/json/order/submit", mainService.submitOrder);
route.post("/json/order/meal-plan/submit", mainService.submitMealPlanOrder);

//checkout
route.post("/json/checkout/pay", mainService.pay);
route.post("/json/checkout/meal-plan/pay", mainService.payMealPlan);

module.exports =  route;