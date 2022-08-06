var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: 'youfly API',
            description: 'Youfly is a travel booking web application that allows users to create a personalized profile by answering a series of questions. This API is for our users, destinations and survey questions',
        },
        servers: [
            {
                url: "http://wixhub-server.herokuapp.com"
            },
            {
                url: "http://localhost:3001/"
            }]
    },
    apis: ["./routes/*.js"]
}

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var destinationsRouter = require('./routes/destinations');
var questionsRouter = require('./routes/questions');
const swaggerDocs = swaggerJsDoc(swaggerOptions);
const dbSetup = require("./models/dbSetUp");
dbSetup().then();

var app = express();

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://wixhub-server.herokuapp.com/"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter.router);
app.use('/destinations', destinationsRouter.router);
app.use('/questions', questionsRouter.router);

module.exports = app;
