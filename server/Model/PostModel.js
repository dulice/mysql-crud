const { DataTypes } = require("sequelize");
const db = require("../config");

// define new models as table in database
const Post = db.define('Post', {
    author: { type: DataTypes.STRING, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
},{ freezeTableName: true });

// add all model to database;
db.sync().then(() => {
  console.log('table created successfully!');
}).catch((error) => {
  console.error('Unable to create table : ', error);
});

module.exports = Post;