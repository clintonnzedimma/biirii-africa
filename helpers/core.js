const db = require("../database/config");

module.exports.getTotalPriceOfOrder = async function (order_key) {
    const data = await db.query(" SELECT * FROM all_orders");
    return data;
}


let a = this.getTotalPriceOfOrder("CF4BF7A");

