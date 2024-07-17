//1. Core
const express = require('express')
const app = express()

//2. Environment
const _ = require('module-alias/register');
const dotenv = require('dotenv')
dotenv.config();

//3.logger
const {setupLogging} = require("@middlewares/morgan.middleware");
setupLogging(app);

//3. Security
const cors   = require('cors')
const helmet = require('helmet')
app.use(helmet());
app.use(cors())

//limiter
const limiter = require('@middlewares/rateLimiter.middleware');
app.use(limiter);

//5. json url
app.use(express.urlencoded({ extended: true })); 
const bodyParser = require('body-parser');
app.use(express.json())
app.use(bodyParser.json());

//6. routes
const routes = require('./v1/routes');
app.use('/', routes);

//6. static & template engine
app.use(express.static('dist',{maxAge: 864000}))  
app.set('view engine', 'hbs');  // template engine: Handlebars
app.set('views', './hbs');    // template fodler

//7. middlewares
const errorHandler = require('./middlewares/error-handler');
const unknownEndpoint = (request, response) => {response.status(404).send({ error: 'unknown endpoint' });};
app.use(unknownEndpoint);  // Handle unknown routes first
app.use(errorHandler);     // Handle other errors last

//8. logger
const morgan = require('morgan');
app.use(morgan('combined'));

//8. Mongoose
const mongodb = require('./database/Mongo.database');
mongodb.connectToDatabase();

//9.listen
const PORT = process.env.EXPRESS_PORT 
app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running on port ${PORT}`);
})
