import * as cors from 'cors'

var createError = require('http-errors')
var express = require('express')
var logger = require('morgan')
var indexRouter = require('./routes/index')
var app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use('/', indexRouter)

app.use(function (req: any, res: any, next: any) {
    next(createError(404))
})

app.use(function (err: any, req: any, res: any, next: any) {
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render('error')
})

export default app
