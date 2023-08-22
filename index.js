'use strict';
const express = require('express');
const { Pool, Client } = require('pg');

const db = require("./models");
require('dotenv').config();

const PORT = 3000;
const HOST = '0.0.0.0';

const app = express();
app.get('/', (req, res) => {
  res.send('Hello World App');
});

app.get('/db', async (req, res) => {    
    const test = await EdgeTable1.findAll();
    console.log(test);
  });

app.get('/fillDatabase', async (req, res) => {
  console.log(req.query.qtdSamples)
  var qtdSamples = req.query.qtdSamples;
  for(var i = 0; i < qtdSamples; i++){
    try{
      const sampleMainTable = await db.MainTable.create({ name: `sample ${qtdSamples}`});
      console.log(sampleMainTable.dataValues);      
    }catch(err){
      console.log(err);
    }    
  }  
  res.send(sampleMainTable.dataValues);
});

app.get('/dbCreate', async (req, res) => {
  const sampleMainTable = await db.MainTable.create({ name: "sample test"});
  res.send(sampleMainTable.dataValues);
});

db.sequelize.sync({ force: false }).then(function () {
  app.listen(process.env.DB_PORT, function () {
    console.log("server is successfully running!");
  });
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);