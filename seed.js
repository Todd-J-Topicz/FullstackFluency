const { Pool } = require('pg');
const dbConn = require('./dbConn');
const pool = dbConn.getPool();


function runSeeder(pool, callback){
    pool.connect((err, done) =>{
        if (err) {
            console.log("Failed to connect to the database - seed.js file");
            console.log(err);
            return done();
        }
        
        pool.query(`INSERT INTO userbase (firstname, lastname, username, password, email) VALUES
            ('John', 'Doe', 'JDoe', '12ab34cd56ef', 'JohnDoe@aol.com'),
            ('Jane', 'Doe', 'JaneD', '98zy76xw54', 'JaneDoe@hotmail.com'),
            ('Maria', 'Lawson', 'MLaw', 'Orange&Apple', 'MariaLawson@gmail.com')`,
            (err) =>{
                if (err){
                    console.log("INSERT FAILED on userBase")
                    console.log(err);
                } else {
                    console.log("INSERT SUCCESSFUL")
                }
                done();
                callback();
            })    
    })
}

runSeeder(pool, () =>{
    pool.end();
})