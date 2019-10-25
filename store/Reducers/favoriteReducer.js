import WeatherService from "../../services/weather-service";
import {AsyncStorage} from "react-native";

const initialState = {
  favoriteCities: []
}

async function toggleFavorite(state, action) {
  const serv = new WeatherService();
  let nextState
  let cityWeather = null
  let cities = []
  let set = null
  switch (action.type) {
    case 'ADD_FAVORITE':
      try {
        cityWeather = await serv.getWeatherHome(action.value)
      } catch (e) {
        alert('add favorite have an error', e)
        return state
      }

      try {
        cities = await AsyncStorage.getItem('cities')
      } catch (e) {
        alert('add favorite have an error', e)
        return state
      }

      if (cities)
        cities = JSON.parse(cities)

      cities.push({
        name: action.value,
        temp: cityWeather.data.main.temp,
        icon: cityWeather.data.weather[0].icon
      });

      try {
        set = await AsyncStorage.setItem('cities', JSON.stringify(cities))
      } catch (e) {
        alert('add favorite have an error', e)
        return state
      }
      state.favoriteCities = cities
      return state
    case 'REMOVE_FAVORITE':
      cities = action.value.cities
      if (cities.length > 1) {
        cities.splice(action.value.index, 1);
        try {
          set = await AsyncStorage.setItem('cities', JSON.stringify(cities))
        } catch (e) {
          alert('remove favorite have an error', e)
          return state
        }
        state.favoriteCities = cities
        return state
      } else {
        try {
          set = await AsyncStorage.removeItem('cities')
        } catch (e) {
          alert('remove favorite have an error', e)
          return state
        }
        state.favoriteCities = []
        return state
      }
    case 'UPDATE_FAVORITE':
      return nextState || state
    default:
      return state
  }
}

export default toggleFavorite