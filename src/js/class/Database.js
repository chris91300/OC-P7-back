const mysql = require('mysql');


/**
 * @class Database
 * manage the connection with mysql database
 */
class Database{
    
    constructor(){
        this.host = process.env.DB_HOST;
        this.user = process.env.DB_USER;
        this.password = process.env.DB_PASSWORD;
        this.database = 'groupomaniaMichelChristophe';

    }


    /**
     * connection with the database
     * @param {boolean} createDatabase true if we create the database else false
     * @returns database connected
     */
    connect(createDatabase=false){   

        let connectionData = {
            host: this.host,
            user : this.user,
            password: this.password
        }

        if (!createDatabase) {
            connectionData.database = this.database;
        }
        
        let db = mysql.createConnection(connectionData);
            
        db.connect(function(err) {
            if (err) throw err;
            console.log("Database MYSQL connected!");
        
        });
        
        return db;       
        
    }



    /**
     * create the database if it not exist
     * then create the tables user, media and comment
     */
    createDatabase(){
        let db = this.connect(true);
        let queryCreate = "CREATE DATABASE IF NOT EXISTS "+this.database;  

        db.query(queryCreate, (err, result, fields)=>{
            if (err){ console.log(err)}
                console.log("base de donnée créé.")
                db.end();
                //this.createTables();

        });
       
    }


    /**
     * defined the tables and create each table
     */
    createTables(){
        
        let  createUsers = "CREATE TABLE users (";
        createUsers += "id INT AUTO_INCREMENT PRIMARY KEY NOT NULL, ";
        createUsers += "last_name VARCHAR(50) NOT NULL, ";
        createUsers += "first_name VARCHAR(50) NOT NULL, ";
        createUsers += "pseudo VARCHAR(50) NOT NULL UNIQUE, ";
        createUsers += "email VARCHAR(50) NOT NULL UNIQUE, ";
        createUsers += "password VARCHAR(255) NOT NULL, ";
        createUsers += "create_at DATETIME DEFAULT NOW()) ";

        let  createMedias = "CREATE TABLE medias (";
        createMedias += "id INT PRIMARY KEY NOT NULL, ";
        createMedias += "user_id INT NOT NULL, ";
        createMedias += "title VARCHAR(255) NOT NULL, ";
        createMedias += "text TEXT, ";
        createMedias += "file_name VARCHAR(255) NOT NULL UNIQUE, ";
        createMedias += "users_liked JSON , ";
        createMedias += "users_disliked JSON ) ";

        let  createComments = "CREATE TABLE comments (";
        createComments += "id INT PRIMARY KEY NOT NULL, ";
        createComments += "user_id INT NOT NULL, ";
        createComments += "media_id INT NOT NULL, ";
        createComments += "text TEXT, ";
        createComments += "reported BOOLEAN DEFAULT false, ";
        createComments += "users_reported JSON ) ";

        let db = this.connect();

        this.createTable(db, createUsers, "users");
        this.createTable(db, createMedias, "medias");
        this.createTable(db, createComments, "comments");

        db.end();
    }


    /**
     * 
     * @param {object} db the connected database
     * @param {object} createTable the table to create
     * @param {string} tableName the table name
     */
    createTable(db, createTable, tableName){
        try{
            db.query(createTable, (err, result, fields)=>{
                if ( err ) {
                    
                    if ( err.errno == 1050) {

                        console.log(`La table ${tableName} existe déjà`);

                    } else {

                        throw err;

                    }

                } else {

                    console.log(`table ${tableName} créée`);

                }                
                
            });


        } catch ( err ) {
            console.log("il y a eu une erreur lors de la création de la table "+tableName);
        }
        
    }




}

module.exports = Database;