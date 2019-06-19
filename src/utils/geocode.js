const request = require('request')

const geocode = (location, callback) => {
    const openCageKey = 'b5b012127d764a669a4fadc5b522b637'
    
    const geoCodeURL = `https://api.opencagedata.com/geocode/v1/geojson?q=${encodeURIComponent(location)}&key=${openCageKey}&abbrv=1&pretty=1`

    request({url: geoCodeURL, json: true}, (error,{body}) => {
        if (error) {
            callback('Unable to connect to geocoding service', undefined)
        } else if (body.status.code != 200) {
            callback(body.status.message + '(geocoding API)', undefined)
        } else if (body.features.length === 0) {
            callback('Location not found', undefined)
        } else {
            callback(undefined, {
            longitude: body.features[0].geometry.coordinates[0],
            latitude: body.features[0].geometry.coordinates[1],
            location: body.features[0].properties.formatted
            })
        }
    })
}

module.exports = geocode


// mapboxToken = 'pk.eyJ1IjoibWVybGluYWNjIiwiYSI6ImNqdGhrbmk0bTBjYTY0NHF6ZXFpbXd0MGcifQ.VoC0DQPSni1Ulwj7rKbwaw'
// const mapboxURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${mapboxToken}&limit=1`

// request({url:mapboxURL, json:true}, (error, response) => {
//     const long = body.features[0].center[0]
//     const lat = body.features[0].center[1]
//     console.log(lat + ',' + long)
// })