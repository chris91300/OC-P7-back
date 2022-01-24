const { Sequelize, DataTypes } = require('sequelize');
console.log(process.env.DB_USER)
sequelize = new Sequelize('groupomaniaMichelChristophe', process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql'
  });


const Comment = sequelize.define('comment', {
        userID : {
            type : DataTypes.INTEGER,
            allowNull : false,
        },
        mediaID : {
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

 
    /*Comment
    .sync()
    .then(()=>{
        console.log('table comments created')
    })
    .catch((err)=>{
        console.log('il y a une erreur de comment sync')
        console.log(err)
    })*/

    module.exports = Comment;
  
  

