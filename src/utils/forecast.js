const request = require('postman-request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=9910e401e1ee38414855e817216a2f19&query=' + lat +','+ long +'&units=m'

    request({url, json:true}, (error, { body}) =>{
        if(error){
            callback('cannot connect to weather app', undefined)
        }else if(body.error){
            callback('unable to find location',undefined)
        }else{
            const current = body.current
            const temperature = current.temperature
            const feelLike = current.feelslike
            const humidity = current.humidity

            callback(undefined, current.weather_descriptions[0] + '. It is currently ' + temperature + ' degrees but it feels like its ' + feelLike + " degrees. The humidity is " + humidity)
        }
    })
}
module.exports = forecast