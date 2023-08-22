'use strict';
const express = require('express');
const { Pool, Client } = require('pg');

const db = require("./models");
require('dotenv').config();

const PORT = 3000;
const HOST = '0.0.0.0';

const app = express();

let fillingDatabase = false;

app.get('/', (req, res) => {
  res.send('Hello World App');
});

app.get('/getSample', async (req, res) => {    
    const value = await db.EdgeTable1.findAll(
      {
        limit:1,
      }
    );
    console.log(value);    
    res.send(value);
  });

app.get('/fillDatabase', async (req, res) => {
  console.log(req.query.qtdSamples)
  var qtdSamples = parseInt(req.query.qtdSamples, 10);

  fillingDatabase = true;
  let sampleMainTable;

  for (let sample = 0; sample < qtdSamples; sample++) {
    if (fillingDatabase == false) {
      return;
    }

    try{
      sampleMainTable = await db.MainTable.create({ name: `sample ${sample}`});
      console.log(sampleMainTable.dataValues);      
    }catch(err){
      console.log(err);
    }    
  }  
  res.send(sampleMainTable.dataValues);
});

app.get('/stopDatabase', async (req, res) => {
  fillingDatabase = false;
  res.send({status: "stopped"});
});


app.get('/createSample', async (req, res) => {
  const sampleMainTable = await db.MainTable.create({ name: "sample test"});
  res.send(sampleMainTable.dataValues);
});

app.post('/eval', async (req, res) => {
  /*
    THIS IS NOT RECOMENDED FOR PRODUCTION.
    THE GOAL HERE IS MAINLY FOR TESTING PURPOSES.
  */
  const result = await eval(req.body.query);
  res.json({ status: "running" });
});


db.sequelize.sync({ force: false }).then(function () {
  app.listen(process.env.DB_PORT, function () {
    console.log("server is successfully running!");
  });
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);