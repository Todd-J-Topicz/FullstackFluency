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

// app.gets
// app.post
// app.patch
// app.delete

app.use(function(err, ))