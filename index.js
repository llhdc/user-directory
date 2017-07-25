const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const userData = require('./data.js');


// SETUP MUSTACHE
const mustacheExpress = require('mustache-express');
app.engine('mustache', mustacheExpress()); //register file extension .mustache
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));
// DONE SETTING UP MUSTACHE

app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  // res.sendFile('./views/homepage.html', {root: __dirname});
  // RENDER the mustache template in views/
  res.render('homepage', userData);
})

app.get('/:id', function(req, res) {
  let foundUser = userData.users.find(function(user){
    return user.id == req.params.id;
  });
  res.render('homepage', { users: [foundUser]});
})

app.listen(3000, function(req, res){
  console.log('Successfully connected to http://localhost:3000');
  console.log(__dirname);
})
