var express = require('express')
var app = express()

const db = require('../database/config');
const helpers = require('../helpers/helpers');

const fetchCurrencies = ()=> {
	return new Promise((resolve, reject)=> {
		db.query("SELECT * FROM currencies", (err, rows)=> {
				if (err) reject(err);
				if (rows.length > 0 ) resolve(rows);
		});
	});
}

const checkIfCurrencyExists = (abbrev) => {
		return new Promise((resolve, reject)=> {
		db.query("SELECT * FROM currencies WHERE abbrev = ?", abbrev, (err, rows)=> {
				if (err) reject(err);
				
				if (rows.length > 0 ){
					resolve({status:true});		
				}else {
					resolve({status: false});
				}
				
		});
	});
}	


const store = function (currencies){
	this.data = [];
	if (currencies.length > 0) this.data = currencies;
}


module.exports = async function (req, res, next) {
	try{
		let CurrencyStore =  new store(await fetchCurrencies());	
		req.session.currencies = CurrencyStore.data; 
		req.session.save();
		let CurrencyHelper = new helpers.Currency(req.session.currencies);
		req.app.locals.currencyConvert = CurrencyHelper.convert;

		if (req.session.currency_choice != 'NGN') {
			req.app.locals.currencyChoice = req.session.currency_choice;	
		}else {
			req.app.locals.currencyChoice = 'NGN';
		}
		
	} catch(e){
			console.log("CURRENCY MIDDLEWARE: Could not save currency data ")
	}
	next();
}