const { Sequelize, Model, DataTypes } = require('sequelize');
const db = require('../../database/config');
const sequelize = require('../../database/sequelizeConfig');

// Fetch All Products
module.exports.fetchAll = () => {
  return new Promise((resolve, reject)=> {
    db.query("SELECT * FROM products ORDER BY id DESC",(err, products)=>{
      if (err) reject(err);


      // if (rows) resolve(rows);

      // db.query("SELECT * FROM sub_products")
    })

  });
};



