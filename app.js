const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
const adminRoutes = require('./routes/admin'); 
const userRoutes = require('./routes/user');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');

// Section
app.use(session({
    secret: 'N#A@72',
    resave: true,
    saveUninitialized: true
}));

// Body Parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Handlebars
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
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

// Routes
app.use('/admin', adminRoutes);
app.use('/users', userRoutes);

// Css and JS files
app.use(express.static(path.join(__dirname, 'public')));

//Server
const PORT = 9001;
app.listen(PORT,() => {
    console.log('Server is running');
})