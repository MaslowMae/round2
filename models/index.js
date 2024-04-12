const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect: 'mysql',
    }
)

const User = require('./user');
const Post = require('./post');

User.hasMany(Post, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

module.exports = {sequelize, User};

module.exports = { User, Post };