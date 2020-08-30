const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// defines path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//set up handle bars engine
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Set up static documentation to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title:'Weather',
        name: 'Raphael'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Raphael'
    })
})

app.get('/help', (req, res)=> {
    res.render('help', {
        title:'Help',
        msg: 'This is the help page',
        name:'Raphael'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Please provide an address'
        })
    }
        geocode(req.query.address, (error, {lat, long, location} = {}) => {
            if(error){
                return res.send({error})
            }
    
            forecast(lat, long, (error, forecastData) => {
                if(error){
                    return res.send({error})
                }
                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })                
            })
        })
    
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error:'you must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
            products: []
        }
    )
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        title:'404',
        errMsg:'Help article not found',
        name:'Raphael'
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        title:'404',
        errMsg:'my 404 page',
        name:'Raphael'
    })
})

app.listen(3000, () => {
    console.log('server is up on port 3000.')
})         