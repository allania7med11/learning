var express = require('express');
var app = express();
// for debugging
app.use("",(req,res,next) => {
  next()
})
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(require('./routes'));
module.exports = app;