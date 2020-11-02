

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());          // Cors middlware
app.use(express.json());  // Parsing json

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true  })
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});


const ordersRouter = require('./routes/orders');
app.use('/orders', ordersRouter);

const ingredientsRouter = require('./routes/ingredients');
app.use('/ingredients', ingredientsRouter);

app.listen(port, () => {
    console.log('Server is running on port: ' + port);
});

