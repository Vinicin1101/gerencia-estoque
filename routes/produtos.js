const json = require('body-parser/lib/types/json');
var express = require('express');
var router = express.Router();

// dotenv
require("dotenv").config();
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

const PRODCOLLECTION = process.env.PRODCOLLECTION;

// MongoDB
const { MongoClient, ObjectId } = require("mongodb");
const DB_URL = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.dff1c.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

// mongodb connection
async function connectDB() {
    const client = await MongoClient.connect(DB_URL);
    const db = client.db(DB_NAME);

    const prodCollection = db.collection(PRODCOLLECTION);

    // router POST type JSON only
    router.post('/produtos/insert', async (req, res, next) => {

        // CORS headers
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

        const prod = req.body;
        // insert json data into mongodb
        prodCollection.insertOne(prod);

        // regex finder
        const result = await prodCollection.find({ prod: { $regex: prod.prod } }).toArray();

        res.status(200).json(result);
    });

    router.get('/produtos/list', async (req, res, next) => {
        if (req.query.prod_name) {
            const prod_name = req.query.prod_name;
            const result = await prodCollection.find({ prod: { $regex: new RegExp(prod_name, "gi") } }).toArray().then(result => {
                if (result.length > 0) {
                    res.status(200).render('list', { title: `Produtos`, produtos: result });
                } else {
                    res.status(206).render('list', { title: `Nada encontrado`, produtos: [] });
                }
            });

        } else {
            res.render('list', { title: 'Termo inválido', produtos: [] });
        }
    });
}

connectDB();
module.exports = router;

// teste
// TESTE
// Teste
// testE