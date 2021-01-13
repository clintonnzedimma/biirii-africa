const axios = require('axios');
const nodemailer = require('nodemailer');




module.exports = function Receipt(param) {
	this.param = param;

	this.sendToBuyer = () => {
		return new Promise((resolve, reject)=> {
			 axios({
			  method: 'get', //you can set what request you want to be
			  url: `${process.env.PHP_SERVICE_URL}/receipt_mail_send.php`,
			  params: {
				receiver_mail: this.param.email ,
				receiver_name: this.param.name ,
				order_key: this.param.key
			  }
			}).then(res => {
				resolve(res);	
			}).catch(err =>{
				reject(err);
			});

		});
	}

	this.sendToAdmin = () =>{
		return new Promise((resolve, reject)=> {
			axios({
			 method: 'get', //you can set what request you want to be
			 url: `${process.env.PHP_SERVICE_URL}/admin_email_send.php`,
			 params: {
			   receiver_mail: process.env.NOTIFICATION_MAIL,
			   customer_name: this.param.name ,
			   order_key: this.param.key
			 }
		   }).then(res => {
			   resolve(res);	
		   }).catch(err =>{
			   reject(err);
		   });

	   });
	}

}
