const mysql = require('mysql');
const inquirer = require('inquirer');
require('dotenv').config();

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: process.env.mysql_password,
      database: 'company_db'
    },
    console.log(`Connected to the company_db database.`)
  );