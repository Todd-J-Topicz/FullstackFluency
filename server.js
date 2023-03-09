'use strict';

const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 8000;
app.use(express.json());
app.use(cors());

const dbConn = require('./dbConn');
const pool = dbConn.getPool();

app.get('/api/userbase', (req, res, next) => {
    console.log('Made it inside .get');
    pool.query('SELECT * FROM userbase', (err, result) => {
        if (err){
            console.log("Error from app.get")
            return next();
        } else {
            const data = result.rows;
            console.log("data from .get", data);
            res.status(200).send(data);
        }
    })
})

app.get('/api/userbase/:id', (req, res, next) => {
    const id = Number.parseInt(req.params.id);

    pool.query(`SELECT * FROM userbase WHERE id=$1`, [id], (err, result) => {
        if (err){
            return next();
        }
        const singleUser = result.rows;
        console.log("individual user", singleUser)
        res.status(200).send(singleUser);
    })
})

// ERROR CATCHING:
app.get('/api/:word', (req, res) =>{
    const word = req.params.word;
    res.status(404).send(`NOT FOUND! - 404 Error - /${word}/ does not exist`)
})

app.post('/api/userbase', (req, res, next) => {
    const firstName = req.body.firstname;
    const lastName = req.body.lastname;
    const userName = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    if (!firstName || !lastName || !userName || !password || !email){
        return res.status(400).send('Error in post data, please resubmit information')
    }

    pool.query('INSERT INTO userbase (firstname, lastname, username, password, email) VALUES ($1, $2, $3, $4, $5) RETURNING *', [firstName, lastName, userName, password, email], (err, result) => {
        if (err){
            return next();
        }
        let userInfo = result.rows[0];
        res.send(userInfo);
    })
})

app.patch('/api/userbase/:id', (req, res, next) => {
    const id = Number.parseInt(req.params.id);
    const firstName = req.body.firstname;
    const lastName = req.body.lastname;
    const userName = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    pool.query('SELECT * FROM userbase WHERE id=$1', [id], (err, result, next) =>{
        if (err){
            return next();
        }

        let userInfo = result.rows[0];

        if (!userInfo){
            res.send('No user detected in database')
        }

        const updatedFirstName = firstName || userInfo.firstName;
        const updatedLastName = lastName || userInfo.lastName;
        const updatedUserName = userName || userInfo.userName;
        const updatedPassword = password || userInfo.password;
        const updatedEmail = email || userInfo.email;

        pool.query('UPDATE userbase SET firstname=$1, lastname=$2, username=$3, password=$4, email=$5 WHERE id=$6 RETURNING *', [updatedFirstName, updatedLastName, updatedUserName, updatedPassword, updatedEmail, id], (err, result) => {
            if (err){
                res.send('There was an error updating the database')
            }
            res.status(200).send("Data Updated")
        })
    })
})

app.delete('/api/userbase/:id', (req, res, next) => {
    console.log('query for DELETE worked, userbase is available');
    const id = Number.parseInt(req.params.id);

    pool.query('DELETE FROM userbase WHERE id=$1 RETURNING*', [id], (err, data) =>{
        if (err){
            res.status(404).send('There was an error with you SQL query for DELETION')
        }
        const deletedUser = data.rows[0];

        if (deletedUser){
            res.send(deletedUser);
        } else {
            res.send('This user ID has not been deleted.')
        }
    })
})

app.use((err, req, res, next) => {
    console.log("Inside middleware error handeling")
    res.status(404).send("ERROR 404 - PROBLEMS EXIST")
})

app.listen(port, () => {
    console.log(`Service is running, listening on ${port}`)
})