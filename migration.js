const { Pool } = require('pg');
const dbConn = require('./dbConn');
const pool = dbConn.getPool();

function runMigrations(pool, callback){
    pool.connect((err, done) => {
        if (err){
            console.log("Failed to connect to the database - migration.js file")
            console.log(err);
            return done();
        }
        console.log('Connected to database');
        pool.query('DROP TABLE IF EXISTS userbase', (err) => {
            if (err){
                console.log(err);
            } else{
                pool.query(`CREATE TABLE  (id SERIAL PRIMARY KEY, firstName VARCHAR (100), lastName VARCHAR (100), userName VARCHAR (100), password VARCHAR (100), email VARCHAR (100))`, (err) => {
                        if (err){
                            console.log('CREATE TABLE FAILED');
                            console.log(err);
                        } else {
                            console.log('CREATE TABLE SUCCESSFUL')  
                        }
                        done();
                        callback();
                           
                });
            }            
        })
        
    })

}

runMigrations(pool, () => {
    pool.end()
});