const { Sequelize, DataTypes } = require('sequelize');
const Comment = require('./CommentModel');
const Media = require('./MediaModel');

sequelize = new Sequelize('groupomaniaMichelChristophe', process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql'
  });


const User = sequelize.define('user', {
        firstName : {
            type : DataTypes.STRING,
            allowNull : false,
            validate:{
                is : /^[a-zA-Z]*(( |-)[a-zA-Z]*)?$/
            }
        },
        lastName : {
            type : DataTypes.STRING,
            allowNull : false,
            validate:{
                is : /^[a-zA-Z]*(( |-)[a-zA-Z]*)?$/
            }
        },
        pseudo : {
            type : DataTypes.STRING,
            allowNull : false,
            unique : true,
            validate:{
                is : /^[\w]*$/
            }
        },
        password : {
            type : DataTypes.STRING,
            allowNull : false
        },
        email : {
            type : DataTypes.STRING,
            allowNull : false,
            unique : true,
            validate:{
                is : /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            }
        },
        urlProfil : {
            type : DataTypes.STRING,
            allowNull : false
        },
        admin : {
            type : DataTypes.BOOLEAN,
            defaultValue: false
        }
  });


  User.hasOne(Media, {
    foreignKey: {
        name : "userId",
        type : DataTypes.INTEGER,
        allowNull : false,
    },
  })
  Media.belongsTo(User);


  User.hasOne(Comment, {
    foreignKey: {
        name : "userId",
        type : DataTypes.INTEGER,
        allowNull : false,
    },
  })
  Comment.belongsTo(User);

  module.exports = User;

