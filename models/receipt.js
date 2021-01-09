const axios = require('axios');
const nodemailer = require('nodemailer');

const serviceURL = `${process.env.PHP_SERVICE_URL}/receipt_mail_send.php`;


module.exports = function Receipt(param) {
	this.param = param;

	this.send= () => {
		return new Promise((resolve, reject)=> {
			 axios({
			  method: 'get', //you can set what request you want to be
			  url: serviceURL,
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

}
