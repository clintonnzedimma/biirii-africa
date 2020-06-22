const moment = require('moment');
const db = require('../../../database/config');
const Cart = require('../../../models/cart');

//db models
const Category = require('../../../models/db/Category');
const Product = require('../../../models/db/Product');

/*
* Static handlers below
*/


module.exports.IndexPage = (req, res)=> {
	res.render("main/index", {pageTitle: "Welcome to Biirii Africa"});
}

module.exports.SuperCategoryHomePage =  (req, res)=> {
 //  Product.fetchBySuperCategories('men').
	// then((r) => {
	// }).catch(e=>{
	// 	console.log(e)
	// });
	res.render("main/index", {pageTitle: "Welcome to Biirii Africa"});
}


