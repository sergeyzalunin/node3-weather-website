const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views/')
const partialsPath = path.join(__dirname, '../templates//parties')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to server
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Robot'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Weather App',
        message: 'Mr. Robot said you hello!',
        name: 'Robot'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Weather App',
        name: 'Robot'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.status(404).send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, locationData} = {}) => {
        if (error) {
            return res.status(404).send({ error })        
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.status(404).send({ error })
            }

            return res.status(200).send({
                forecast: forecastData,
                location: locationData,
                address:  req.query.address
            })
        })
    })
})



app.get('/products', (req, res) => {
    if (!req.query.search) {            
        return res.status(404).send({
            error: 'You must provide search text'
        })   
    }
    res.status(200).send({
        products: []
    })
})

app.get('/help/*', (req, res) =>{
    res.status(404).render('404', {
        title: '404',
        errorMessage: 'Help article not found',
        name: 'Robot'
    })
})

app.get('*', (req, res) => {
    res.status(404).render('404', {
        title: '404',
        errorMessage: 'Page not found',
        name: 'Robot'
    })
})

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
    console.log(`http://localhost:${port}/help`)
    console.log(`http://localhost:${port}/about`)
    console.log(`http://localhost:${port}/weather`)
})