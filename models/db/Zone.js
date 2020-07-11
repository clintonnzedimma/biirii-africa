const { Sequelize, Model, DataTypes } = require('sequelize');
const db = require('../../database/config');
const sequelize = require('../../database/sequelizeConfig');

// Fetch All Zones
module.exports.fetchAll = () => {

  return new Promise((resolve, reject)=> {
  		let result = {};

   		db.query(`SELECT * FROM zones`,(err, zones)=>{
 	 		if (err) throw new Error(err)
 	 		if (zones.length == 0 ) reject("No zone yet")
 	 		if (zones.length > 0) resolve(zones);	

 	 	});
	});
}
