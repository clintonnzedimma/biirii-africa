const auto = new SequelizeAuto('database', 'user', 'pass', {
    host: 'localhost',
    dialect: 'mysql',
    directory: false, // prevents the program from writing to disk
    // port: 'port',
    additional: {
        timestamps: false
        //...
    },
    tables: ['products', 'categories',]
    //...
})