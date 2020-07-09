const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
// Initialize express
const app = express();
// error controller
const errorController = require('./controllers/error')

// set the view engine EJS
app.set('view engine', 'ejs');
app.set('views', 'views');

// importing admin routes
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// parse request body 
app.use(bodyParser.urlencoded({extended: false}));

// allow read only of public files
app.use(express.static(path.join(__dirname, 'public')));

// use routes
app.use('/admin', adminRoutes);
app.use(shopRoutes);

// handle 404
// app.use((req,res) => {
//   // get current direc then ../ go up into views then shop.html
//   res.sendFile(path.join(__dirname, './', 'views', 'page-not-found.html'));
// });

app.use(errorController.get404);

// start server
app.listen(3000);
