const { Sequelize, DataTypes } = require('sequelize');

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
        createAt : {
            field : 'create_at',
            allowNull : false,
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
  })


  module.exports = User;

