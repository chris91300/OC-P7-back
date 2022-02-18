const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../src/js/class/SequelizeDB')
const Comment = require('./CommentModel');


const Media = sequelize.define('media', {
        title : {
            type : DataTypes.STRING,
            allowNull : false,
            validate:{
                is : /[^\<\>\\\/]/
            }
        },
        text : {
            type : DataTypes.TEXT,
            allowNull : true,
            validate:{
                is : /[^\<\>\\\/]/
            }
        },
        fileName : {
            type : DataTypes.STRING,
            allowNull : false,
            validate:{
                is : /^[\w \-\_]*\.(jpg|jpeg|png|webp)$/
            }           
        },
        urlImage : {
            type : DataTypes.STRING,
            allowNull : false,
            validate:{
                is : /^http:\/\/localhost:3000\/[\w \-\_]*\.(jpg|jpeg|png|webp)$/
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
            allowNull : false,
            defaultValue: 0
        }
  }, { tableName : 'medias'})

  

  // Association with comment
  Media.hasOne(Comment, {
    foreignKey: {
        name : "mediaId",
        type : DataTypes.INTEGER,
        allowNull : false,
    },
  })
  Comment.belongsTo(Media);

  module.exports = Media;