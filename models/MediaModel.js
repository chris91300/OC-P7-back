const { Sequelize, DataTypes } = require('sequelize');

sequelize = new Sequelize('groupomaniaMichelChristophe', process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql'
  });


  sequelize.define('media', {
        userID : {
            type : DataTypes.INTEGER,
            allowNull : false,
        },
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
        userLiked : {
            type : DataTypes.ARRAY,
            allowNull : false,
            defaultValue: []
        },
        reported : {
            type : DataTypes.BOOLEAN,
            defaultValue : false
        },
        userReported : {
            type : DataTypes.INTEGER,
            allowNull : false,
            defaultValue: 0
        }
  })

