const request =require('request')

const forcast = (latitude, longitude, callback) => {
     // const url= 'https://data.climacell.co/v4/timelines?location='+ longitude +',' + latitude +'&fields=temperature&timesteps=1h&units=metric&apikey=DDdug4YWarZ2pdNPllD4qPEt0oVKAAX3'


    const url = 'http://api.weatherstack.com/current?access_key=b1f9b9d271093b162518976c6a399f59&query=' + longitude + ',' + latitude + ''

    request({ url: url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather service', undefined)
       } else if(body.error) {
            callback('Unable to find location', undefined)
       } else{
            callback(undefined, {
               description: body.current.weather_descriptions[0],
               temperature: body.current.temperature,
               feelslike: body.current.feelslike,
               datetime: body.location.localtime_epoch,
               windspeed: body.current.wind_speed,
               icon: body.current.weather_icons[0]
            })
       }
    })
}

module.exports = forcast