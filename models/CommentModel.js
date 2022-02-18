const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../src/js/class/SequelizeDB')



const Comment = sequelize.define('comment', {
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
  
  

