import React from 'react'
import {Button, TextInput, View, AsyncStorage} from "react-native"
import {LinearGradient} from "expo-linear-gradient"
import WeatherService from "../services/weather-service"
import { connect } from 'react-redux'

class AddCityView extends React.Component{
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Add city',
        }
    };

    serv = new WeatherService();
    state = {
        city: ''
    };

    componentDidMount(): void {
        this.canAdd()
    }

    onChangeText(text) {
        this.setState({
            city: text
        })
    }

    addCity() {
        this.serv.getWeatherHome(this.state.city).then((cityWeather) => {
            AsyncStorage.getItem('cities').then(data => {
                let tab = [];
                if (data !== null)
                    tab = JSON.parse(data);

                tab.push({
                    name: this.state.city,
                    temp: cityWeather.data.main.temp,
                    icon: cityWeather.data.weather[0].icon
                });

                AsyncStorage.setItem('cities', JSON.stringify(tab)).then(() => {
                    this.props.navigation.goBack()
                }).catch(
                    error => {
                        console.error('add city view : ', error);
                    }
                );
            })
        })
    }

    render(): React.ReactNode {
        return (
            <LinearGradient
                colors={['#000', '#3A4149']}
                style={{ flex: 1, alignItems: 'stretch' }}
            >
                <View
                    style={{flex: 1, flexDirection: 'row', alignItems: 'flex-start'}}
                >
                    <TextInput
                        style={{ backgroundColor: '#fff', borderWidth: 1, width: 300,  }}
                        onChangeText={text => this.onChangeText(text)}
                        value={this.state.city}
                    />
                    <Button title='Add' onPress={() => this.addCity()}/>
                </View>
            </LinearGradient>
        )
    }
}

export default connect()(AddCityView)