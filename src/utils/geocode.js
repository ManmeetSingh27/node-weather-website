const request =require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoibWFubWVldHNpbmdoMjciLCJhIjoiY2tta2hmbWdjMTB0eTJwdDQ5eXJrc216MCJ9.RfjJbtOwGLPQQvw772SeCQ'

    request({ url: url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to location service', undefined)
       } else if(!body.features.length) {
            callback('Unable to find location', undefined)
       } else{
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name,
            })
       }
    })
}

module.exports = geocode