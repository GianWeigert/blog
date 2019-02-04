const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');

const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');

// Body Parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Routes
const adminRoutes = require('./src/routes/admin');
const userRoutes = require('./src/routes/user');

app.use('/admin', adminRoutes);
app.use('/users', userRoutes);

// Section
app.use(session({
    secret: 'N#A@72',
    resave: true,
    saveUninitialized: true
}));

// Handlebars
app.set('views', __dirname + '/src/views');
app.engine('handlebars', handlebars({
    defaultLayout: 'main',
    layoutsDir: __dirname + '/src/views/layouts',
    partialsDir  : [
        __dirname + '/src/views/partials',
    ]
}));
app.set('view engine', 'handlebars');

// MongoDB
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/blog', {
    useNewUrlParser: true
}).then(() => {
    console.log('Conection with database is success');
}).catch((error) => {
    console.log('Can not possible connect with the database, error: ' + error);
});

// Css and JS files
app.use(express.static(path.join(__dirname, '/public')));

module.exports = app;