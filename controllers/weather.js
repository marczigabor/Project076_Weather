var request = require('request');
var dateHelper = require('./../helper/date');
var apiKey = '6c4651c161e482495f5bef0a0cbe7684';

const weather = {

    async weather_get(req, res, next) {
        
        request('https://api.openweathermap.org/data/2.5/weather?units=metric&q=' + req.params.city + '&APPID=' + apiKey, (error, response, body)=>{

            try {

                if (response.statusCode == 200){
                    
                    res.send(getWeatherObject(JSON.parse(body)));
                  
                }else {
                    let errorObject = new Error(error || response.statusMessage);
                    next(errorObject);
                }
            }catch (err){
                next(err);
            }            
        });
    },

}

getWeatherObject = (body)=> {

    return {
        sunriseTime: dateHelper.getHourMinutes(dateHelper.convertUnixDate(body.sys.sunrise, body.timezone)),
        sunsetTime: dateHelper.getHourMinutes(dateHelper.convertUnixDate(body.sys.sunset, body.timezone)),    
        time: dateHelper.getHourMinutes(dateHelper.convertUnixDate(body.dt, body.timezone)),
        temp: body.main.temp,     
        city: body.name,
        main: body.weather[0].main,
        description: body.weather[0].description,
        timezone: body.timezone
    }
}

module.exports = weather;
