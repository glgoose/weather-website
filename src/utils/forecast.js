const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const darkSkyKey = 'f976660a97c271cb6d3e384c05427070'

    const darkSkyUrl = `https://api.darksky.net/forecast/${darkSkyKey}/${latitude},${longitude}?units=si&lang=en`

    // console.log(darkSkyUrl)

    request({url: darkSkyUrl, json:true}, (error, {body}) => {
        if (error) {
            callback('unable to connect to weather service', undefined)
        } else if (body.error) {
            callback(body.error + ' (dark sky API)', undefined)
        } else {
            callback(undefined, {
                currently: body.currently.summary.toLowerCase(),
                temp: Number(body.currently.temperature).toFixed(1),
                tempMin: Number(body.daily.data[0].temperatureMin).toFixed(1),
                tempMax: Number(body.daily.data[0].temperatureMax).toFixed(1),
                chanceOfRain: Math.round(Number(body.currently.precipProbability*100))
            })
        }
    })
}

module.exports = forecast