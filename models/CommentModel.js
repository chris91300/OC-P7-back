const { Sequelize, DataTypes } = require('sequelize');

sequelize = new Sequelize('groupomaniaMichelChristophe', process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql'
  });


  sequelize.define('comment', {
        userID : {
            type : DataTypes.INTEGER,
            allowNull : false,
        },
        userID : {
            type : DataTypes.INTEGER,
            allowNull : false,
        },
        text : {
            type : DataTypes.TEXT,
            allowNull : true,
            validate:{
                is : /[^\<\>\\\/]/
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

