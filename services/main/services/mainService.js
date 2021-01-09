require('dotenv').config();
const moment = require('moment');
const validator = require('validator');
const { uuid } = require('uuidv4');
const Cryptr = require('cryptr');


const db = require('../../../database/config');
const Cart = require('../../../models/cart');
const Receipt = require('../../../models/receipt');
const utilOrder = require('../util/order')
const helpers = require('../../../helpers/helpers');
const paystackPayment = require('../../../helpers/paystackPayment');


const cryptr = new Cryptr(process.env.SESSION_SECRET);


module.exports.addToCart = (req, res)=> {

	// This module item to cart with the id of the product in the database

	let cart = new Cart(req.session.cart ? req.session.cart : {});	

	let qty = parseInt(req.body.qty);

	let size = req.body.size ? req.body.size : null;

	console.log(size);

	console.log(qty);

	let extrasId = [];



	db.query("SELECT * FROM sub_products WHERE id = ?", req.body.id, (err, sp)=> {
		
		db.query("SELECT * FROM products WHERE id = ?", sp[0].product_id, (err, product)=> {

			let spName = (sp[0].name === "*") ? "" : `(${sp[0].name})`;

				//if extras exists
				if (req.body.extras) {
					ordereredExtras = extras;
					if (product.length > 0 ) {
						cart.add(sp[0], product[0], qty, size);
						req.session.cart = cart;
						return res.json({
							status: true, 
							message: `${product[0].name} ${spName}  has been added to cart`, 
							product : product,
							cart : cart.getData()
						});
					}else { 
						res.json({status: false, product :  [] }); 
					}	
				}

				//if no extras
				if (!req.body.extras) {
					if (product.length > 0 ) {
						cart.add(sp[0], product[0], qty, size);
						req.session.cart = cart;
						return res.json({
							status: true, 
							message: `${product[0].name} ${spName}  has been added to cart`, 
							product : product,
							cart : cart.getData()
						});
					}else { 
						res.json({status: false, product :  [] }); 
					}						
				}

						
		});


	});
	
}

module.exports.getCart = (req, res) => {	
	let cart  = null;
	let data = null;

	let CurrencyHelper = new helpers.Currency(req.session.currencies);

	if (req.session.cart) {
		cart = new Cart(req.session.cart ? req.session.cart : {});
		data = cart.getData();


		data.currency = {
			totalPrice : CurrencyHelper.convert({
				to: req.session.currency_choice,
				value: data.totalPrice
				}).result,
			abbrev : req.session.currency_choice 
		}

		console.log(data);

	}
	return res.json({status: true, cart: data}); 
}


module.exports.getItemById = (req, res) => {	
	let cart  = null;
	let data = null;

	let CurrencyHelper = new helpers.Currency(req.session.currencies);

	if (req.session.cart) {
		cart = new Cart(req.session.cart ? req.session.cart : {});
		data = cart.getItemById(req.body.id);

		data.currency = {
			price : CurrencyHelper.convert({
				to: req.session.currency_choice,
				value: data.price
				}).result,
			abbrev : req.session.currency_choice 
		}

		
	}

	res.json({status: true, data: data}); 
}


module.exports.getItemTotalPrice = (req, res) => {	
	let cart  = null;
	let data = null;

	if (req.session.cart) {
		cart = new Cart(req.session.cart ? req.session.cart : {});
		data = cart.getItemTotalPrice(req.body.id);

	}

	console.trace("a=>"+data.item.price);

	res.json({status: true, data: data}); 
}



module.exports.removeCartItem = (req, res) => {	
	let cart  = null;
	let id = req.body.id; // product id in cart 

	if (req.session.cart) {
		cart = new Cart(req.session.cart ? req.session.cart : {});
		let productName = cart.getItemById(id).superItem.name;
		let spName = (cart.getItemById(id).item.name === "*") ? "" : `(${cart.getItemById(id).item.name})`;
		 res.json({
		 	status : true, 
		 	message : `${productName} - ${spName}  has been removed from cart`,
		 	totalItems :  cart.totalItems - cart.getItemById(id).qty,
		 	totalPrice :  cart.totalItems - cart.getItemById(id).price
		 });	
		 cart.remove(id);
		 req.session.save();
		 console.log(cart.totalItems);
		 return console.log(`removed from cart`);
	}

	res.json({status: false, message : `error occured`}); 
}


//Update item quantity
module.exports.updateQty = (req, res) => {
	let cart = new Cart(req.session.cart ? req.session.cart : {});
	cart.setQty(req.body.id, req.body.qty);
	res.json({status: true, message : `updated quantity`}); 
}




//Update item size
module.exports.updateSize = (req, res) => {
	let cart = new Cart(req.session.cart ? req.session.cart : {});
	cart.setSize(req.body.id, req.body.size);
	res.json({status: true, message : `updated quantity`}); 
}





	


module.exports.submitOrder = (req, res) => {
	let e = null;
	if (req.body.firstName.trim() == '' || req.body.firstName.length == 0) {
		e = "Your FIRST NAME should not be empty !";
	} else if(req.body.lastName.trim() == '' || req.body.lastName.length == 0) {
		e = "Your LAST NAME should not be empty !";
	} else if(!validator.isEmail(req.body.email)){
		e = "Please enter a valid EMAIL !";
	} else if(req.body.phone.trim() == '' || req.body.phone.trim().length == 0){
		e = "PHONE NUMBER is required !";
	}else if (req.body.phone.trim() && req.body.phone.trim().length <7) {
		e = "Please enter valid PHONE NUMBER";
	}else if (req.body.address.trim().length == 0) {
		e = "You must fill your RESIDENTIAL ADDRESS";
	} else if (req.body.zone_data == "null" || !req.body.zone_data) {
		e = "Please select location";
	}

	console.log(req.body);

	
	if (e == null) {
		let cart = new Cart(req.session.cart ? req.session.cart : {});

		let Order = module.exports = function(formData, session) {

			 //storing key
			 this.key = uuid().toUpperCase().slice(0, 7);

		     // storing new values
		     this.customer_name = `${formData.lastName.trim().toUpperCase()} ${formData.firstName.trim()}`;
		     this.customer_phone = formData.phone.trim();
		     this.customer_email = formData.email.trim();;
		     this.add_info  =  (formData.addInfo) ? formData.addInfo.trim() : null;
		     this.address = formData.address.trim();

			 //initializing zones
		     this.zone_name = null;
		     this.zone_desc = null;
		     this.zone_price = parseInt(req.body.zp); // getting zone data price for security

		     let z = formData.zone_data;

		     if (z) {
		     	console.log("Zone Condition met");

		     	 z =  cryptr.decrypt(z); //decrypting zone data
		     	 z = z.split(",");
		     	 console.log("=>zone"+z);
			     this.zone_name = z[0];
			     this.zone_desc = z[1];
		     }

		}; 

		/*console.log(Order);*/

			req.session.order = new Order(req.body, req.session);		
	 		req.session.save();

	 		/*console.log(req.session.order);*/

	 		if (req.session.order) {
	 			return res.json({status : true, message : "temporarily saved customer details" });	
	 		}

	}  else {
		console.log(e);
		return res.json({status : false, message : e });
	}

}



module.exports.pay = (req, res) => {
	let cart = new Cart(req.session.cart ? req.session.cart : {});

	let receipt = new Receipt({
		key : req.session.order.key,
		name : req.session.order.customer_name,
		email : req.session.order.customer_email
	});


	// checking if transaction refereence exists
	db.query("SELECT txn_ref FROM paid_orders WHERE txn_ref = ?", req.body.reference, (err,row)=> {
		if (err ) { throw new Error(err)}

		if (row.length > 0) {
			return res.json({status : false, message : "Transaction failed. Transaction reference exists" });
		}	
	});

	
	paystackPayment.init(req.body.reference, process.env.PAYSTACK_SK)
	.then(resp => {
		// success
		utilOrder.saveCustomerDetails(req.session, cart, req.body.reference)
		.then (()=>{


			//empty cart
			req.session.cart = null;
			req.session.save();


			// sending receipt to customer
			receipt.sendToBuyer()
			.then (res=> {
				console.log(res);
			}).catch(e => {
				console.log(`Receipt ${e}`);
			});


			// sending receipt to admin
			receipt.sendToAdmin()
			.then (res=> {
				console.log(res);
			}).catch(e => {
				console.log(`Receipt ${e}`);
			});
			
			return res.json({status : true, message : "Transaction successful" });
		}).catch((r)=>{
			console.log(r);
		});


	}).catch(resp => {
		res.json({status: false, message : `payment failed`});
	});
}


module.exports.changeCurrency= (req, res) => {
	const availableCurrencies = ['NGN','USD', 'GBP', 'EUR'];

	if (availableCurrencies.includes(req.body.currency_choice)) {
		req.session.currency_choice = req.body.currency_choice;
		req.session.save();

		req.app.locals.currencyChoice = req.session.currency_choice;

		return res.json({
			message: `Currency set to ${req.session.currency_choice}`,
			currency: req.session.currency_choice,
			status: true 
		});
	}

	req.session.currency_choice = 'NGN';
	req.session.save();
	req.app.locals.currencyChoice = req.session.currency_choice;
	return res.json({
		message: `Default currency set`,
		currency: 'NGN',
		status: true
	});
}



