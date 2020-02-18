const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
        + encodeURIComponent(address) //exchange special characters 
        + '.json?limit=1&access_token=pk.eyJ1IjoibmluamExOTg2IiwiYSI6ImNrNmxyd2gwMTBnbGgzbHA3Y2phZndvdDIifQ._ipt-m14TEq8F1u2YgIQZg'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services', undefined)
        } else  if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            let feature = body.features[0];
            callback(undefined, {
                latitude: feature.center[1],
                longitude: feature.center[0],
                locationData: feature.place_name
            })
        }
    })
}

module.exports = geocode