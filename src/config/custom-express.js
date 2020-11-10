const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')

app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine', 'ejs')
app.use(express.static('./views/public'))
app.use(expressValidator())

const rotas = require('../app/rotas')
rotas(app)

module.exports = app