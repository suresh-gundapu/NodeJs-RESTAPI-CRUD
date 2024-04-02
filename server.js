const express = require('express');
const app = express();
const appRoutes = require('./app/routes/routes');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use('/',appRoutes);

app.listen(7070,()=>{
    console.log('server started at 7070');
})




