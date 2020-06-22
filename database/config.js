require('dotenv').config();
const mysql = require('mysql');
const util = require('util');
const pool = mysql.createPool({
  connectionLimit: 20,
  host     : process.env.DB_HOST,
  port     : process.env.DB_PORT,
  user     : process.env.DB_USER,
  password : process.env.DB_PW,
  //socket   : '/Applications/MAMP/tmp/mysql/mysql.sock',
  database : process.env.DB_NAME
})


const time = new Date();

              

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.')
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.')
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.')
        }
    }    
    if (connection)  {
        console.log(`DB connected :) @ ${time}`);
        connection.release()  
      }  
       
return {
         query(sql, args) {
             return util.promisify(pool.query)
                 .call(pool, sql, args);
         },
         beginTransaction() {
             return util.promisify(pool.beginTransaction)
                 .call(connection);
         },
         commit() {
             return util.promisify(pool.commit)

                 .call(pool);
         },
         rollback() {
             return util.promisify(pool.rollback)
                 .call(pool);
         },
         close() {
             return util.promisify(pool.end).call(pool);
         }
     };
})

module.exports = pool