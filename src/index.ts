import { MongoClient } from "mongodb";

const express = require('express');
const body = require('body-parser');

async function start() {
    try {
        const app = express();
        const porta = process.env.PORT || 3000;

        const mongo = await MongoClient.connect('mongodb+srv://mtskaioken:*java%40312@cluster0.36ulyeg.mongodb.net/?retryWrites=true&w=majority');
        
        await mongo.connect();
       
        app.db = mongo.db();

        app.use(body.json({
            limit: '500kb'
        }));


        app.use('/create', require('./routes/customers'));
        app.use('/customers', require('./routes/customers'));


        app.listen(porta, () => {
            console.log(`Server is running on port ${porta}`);
        });

    } catch (error) {
        console.log(error);
    }
}

start();