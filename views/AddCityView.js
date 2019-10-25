import React from 'react';
import {Button, StyleSheet, TextInput, View, AsyncStorage, RefreshControl} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import WeatherService from "../services/weather-service";
import {NavigationEvents} from "react-navigation";

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

    canAdd() {
        AsyncStorage.getItem('cities').then(data => {
            if (data) {
                let jsonData = JSON.parse(data);
                if (jsonData.length >= 15) {
                    alert('vous avez atteind le maximum de favoris supprimez en pour en ajouter de nouveau');
                    this.props.navigation.goBack()
                }
            }
        });
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
                <NavigationEvents onDidFocus={() => this.canAdd()}/>
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

const styles = StyleSheet.create({
    title: {
        color: '#fff',
    }
});

export default AddCityView;