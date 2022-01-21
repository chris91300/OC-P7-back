const Database = require('./Database')


class UsersDatabe extends Database{

    constructor(){
        super();
    }



    /**
     * create a new user 
     * pssword must be hashed
     * @param {object} informations about user
     */
    create({lastName, firstName, pseudo, email, password}){
        try{
            let values = [ lastName, firstName, pseudo, email, password];
            let query = "INSERT INTO users ";
            query += " ( last_name, first_name, pseudo, email, password ) ";
            query += "VALUES ";
            query += "(?, ?, ?, ?, ?)";

            let db = this.connect();

            db.query(query, values, ( err, results ) => {
                if( err ){
                    if ( err.errno === 1062){
                        if( /pseudo/.test(err.sqlMessage)) {
                            console.log("pseudo déjà pris")
                        }
                        if( /email/.test(err.sqlMessage)) {
                            console.log("email déjà pris")
                        }
                    } else {
                        throw err;
                    }
                    
                } else {
                    console.log("user created")
                }
            })

            db.end();


        } catch ( err ) {
            console.log(err)
        }
        

    }

    readForLogin(pseudo){
        try{

            let values = [ pseudo];
            let query = "SELECT * FROM users WHERE pseudo = ?";

            let db = this.connect();
            
            db.query(query, values, ( err, results ) => {
                if( err ){
                    throw err;
                }
                console.log("dans la fonction ")
                console.log(results);
                
            })
            

            db.end();

            return user;


        } catch ( err ) {
            console.log(err)
        }
    }


    /*getUserWithLogin(login) {
       this.readForLogin(login, this.returnValue)
    }

    returnValue = (value) =>{
        console.log("dans le callback")
        console.log(value)
        return value;
    }*/
    
}



module.exports = UsersDatabe;