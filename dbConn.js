const { Pool } = require('pg');

require('dotenv').config();

const POSTGRES_HOST = process.env.HOST || '127.0.0.1';
const POSTGRES_DB = process.env.POSTGRES_DB || 'database_name'
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || 'password'
const POSTGRES_USER = process.env.POSTGRES_USER || 'postgres'
const DATABASE_URL = process.env.DATABASE_URL;
const POSTGRES_PORT = process.env.POSTGRES_PORT || '5432';

function getPool(){

    const dbConfig = {
        user: POSTGRES_USER,
        host: POSTGRES_HOST,
        database: POSTGRES_DB,
        password: POSTGRES_PASSWORD,
        port: POSTGRES_PORT,
    }

    let pool = null;

    if (DATABASE_URL){
        pool = new Pool ({
            connectionString: process.env.DATABASE_URL,
            ssl: {
                rejectUnauthorized: false
            }
        })
    } else {
        pool = new Pool(dbConfig);
    }
    return pool;
}
module.exports = { getPool };