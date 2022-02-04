const { Sequelize, DataTypes } = require('sequelize');
const Comment = require('./CommentModel')

sequelize = new Sequelize('groupomaniaMichelChristophe', process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql'
  });


const Media = sequelize.define('media', {
       /* userId : {
            type : DataTypes.INTEGER,
            allowNull : false,
        },*/
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

  
  Media.hasOne(Comment, {
    foreignKey: {
        name : "mediaId",
        type : DataTypes.INTEGER,
        allowNull : false,
    },
  })
  Comment.belongsTo(Media);

  module.exports = Media;