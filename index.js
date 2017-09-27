const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive');
const port = 3000;
const { dbUser, database } = require('./config');
const connectionString = `postgres://${dbUser}@localhost/${database}`
const products_controller = require('./products_controller');
const app = express();
app.use( bodyParser.json() );
app.use( cors() );

app.use(bodyParser.json());
const massiveConnection = massive(connectionString)
    .then(db => {
        app.set('db', db);
    })
    .catch(err => {
        console.log(err);
    });




app.post( '/api/product', products_controller.create );
app.get( '/api/products', products_controller.getAll );
app.get( '/api/product/:id', products_controller.getOne );
app.put( '/api/product/:id', products_controller.update );
app.delete( '/api/product/:id', products_controller.delete );


app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
})
