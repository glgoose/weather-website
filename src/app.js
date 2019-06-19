const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        welcomeText: 'Dit is mijn mooie webvagina',
        h1: 'weather app',
        name: 'Glenn'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        h1: 'it\'s all about',
        name: 'Glenn'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        h1: 'help..',
        name: 'Glenn'
    })
})

app.get('/weather', (req, res) => {
    searchLocation = req.query.loc
    if (!searchLocation) {
        return res.send({
            error: 'Location needs to be provided'
        })
    }

    geocode(searchLocation, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }

        forecast(latitude, longitude, (error, data) => {
            if (error) {
                return res.send({
                    error
                })
            }

            res.send({
                location,
                forecast: data
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        h1: '404',
        errorMessage: 'Help article not found',
        name: 'Glenn'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        h1: '404',
        errorMessage: 'Page not found',
        name: 'Glenn'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})