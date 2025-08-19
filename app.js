require('dotenv').config();
const { getNews } = require('./controllers/newsController');
const authenticationMiddleware = require('./middelware/authenticationMiddleware');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB', err);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const usersRouter = require('./routes/usersRout');

app.use("/users", usersRouter);
app.get('/news', [authenticationMiddleware], getNews);

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});


module.exports = app;