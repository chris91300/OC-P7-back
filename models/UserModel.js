const { Sequelize, DataTypes } = require('sequelize');

sequelize = new Sequelize('groupomaniaMichelChristophe', process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql'
  });


  sequelize.define('user', {
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
            validate:{
                is : /^[\w]*$/
            }
        },
        password : {
            type : DataTypes.STRING,
            allowNull : false            
        },
        createAt : {
            field : 'create_at',
            allowNull : false,
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
  })

