const Currency = function (abbrev) {
	this.currencyAbbrev = abbrev;
	
	this.change = (arg)=> {
		$.post(
			'/json/currency/change', 
			{currency_choice: arg}, 
			(res)=> {
			console.log(res);
			if (res.status == true) {
				window.location.reload();
			}
		});
	}
}


const BiiriiCurrency = new Currency(CurrencyAbbrev);

function changeCurrency (arg) {
	BiiriiCurrency.change(arg);
}
