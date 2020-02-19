const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/635cfa83c9dcecbf5836616f8f53498d/'
        + latitude + ','
        + longitude
        +'?units=ca' //&lang=ru

    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            let currently = body.currently;
            let daily = body.daily.data[0];

            console.log(daily)

            let forecast = daily.summary.toLowerCase()
                + ` It is currently ${currently.temperature} degrees out.`
                + ` This high today is ${daily.temperatureHigh}` 
                + ` with a low of ${daily.temperatureLow}.`
                + ` There is a ${currently.precipProbability}% chance of rain`
            callback(undefined, forecast)
        }
    })        
}

module.exports = forecast