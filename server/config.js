const { Sequelize } = require("sequelize");

const db = new Sequelize('blog', 'root', '', {
    host: 'localhost',
    dialect: "mysql"
});

// connect to database
db.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });
 
module.exports = db;