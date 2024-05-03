const express = require('express')
const mongoose = require('mongoose')
const setRoute = require('./routes/routes')
const setMiddlewares = require('./middleware/middlewares')

// set up view engine

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

// middleware

setMiddlewares(app)


// using route 
setRoute(app)

// setting 404 middleware

app.use((req, res, next) => {
    const error = {}
    error.status = 404
    next(error)
})

// we are passing error status via next method to the next middleware
// for internal server error above code won't execute

app.use((error, req, res, next) => {
    console.log(error)
    if (error.status === 404) {
        return res.render('pages/error/404', {flashMessage: {}})
    }
    
    res.render('pages/error/500', {flashMessage: {}})
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
});

// mongoose.connect( 'mongodb://root:example@mongo:27017', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })



