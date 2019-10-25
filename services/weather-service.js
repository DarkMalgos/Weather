import axios from 'axios'

const  key = '42efe3dca162957761e371957ce717e8';
const url = `https://api.openweathermap.org/data/2.5/weather?appid=${key}`;

class WeatherService {
    getWeatherHome(city) {
        return axios.get(`${url}&q=${city},fr`)
    }
}

export default WeatherService