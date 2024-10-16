require('dotenv').config();
const express = require('express');
const methodOverride = require('method-override');
const { authSuivi } = require('../middlewares/auth');
const expressFileUpload = require('express-fileupload');
const cors = require('cors');
const path = require('path');


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(methodOverride());
app.use(expressFileUpload())
app.use(express.static(path.join(__dirname, '../public')));
app.use('*', authSuivi);

app.use('/', require('../routes/routes'));

module.exports = app;