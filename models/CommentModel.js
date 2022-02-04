const { Sequelize, DataTypes } = require('sequelize');

sequelize = new Sequelize('groupomaniaMichelChristophe', process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql'
  });


const Comment = sequelize.define('comment', {
       /* userId : {
            type : DataTypes.INTEGER,
            allowNull : false,
        },*/
       /* mediaId : {
            type : DataTypes.INTEGER,
            allowNull : false,
        },*/
        text : {
            type : DataTypes.TEXT,
            allowNull : true,
            validate:{
                is : /[^\<\>\\\/]/
            }
        },
        userLiked : {
            type : DataTypes.JSON,
            allowNull : false,
            defaultValue: []
        },
        reported : {
            type : DataTypes.BOOLEAN,
            defaultValue : '0'
        },
        userReported : {
            type : DataTypes.INTEGER,
            defaultValue: 0
        }
  })

 

    module.exports = Comment;
  
  

