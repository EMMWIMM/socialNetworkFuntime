const express = require('express');
const mongoose = require('mongoose');

const routes = require('./routes/index.js');

//connect to mongoDB
mongoose
    .connect("mongodb://localhost:27017/snf", { useNewUrlParser: true })
    .then(() => {
        const app = express()  
        app.use(express.json()); 
        app.use('/api', routes);     

        app.listen(8080, () =>{
            console.log('server has started');
        });
    });

const app = express();

//module.exports = router; //I don't think I need this