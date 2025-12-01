const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
global.vocab = require('./api/models/vocabModel');
const routes = require('./api/route/vocabRoute');

//mon connection string 
mongoose.set('strictQuery', true); // to suppress deprecation warning
mongoose.connect('mongodb+srv://duongquocanh990_db_user:sirfish12345@cluster0.fsatjal.mongodb.net/?appName=Cluster0');


const port = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);
app.listen(port);

app.use((req, res) => {
    res.status(404).send({ url: req.originalUrl + ' not found' });
});
console.log(`Server started on ${port}`);