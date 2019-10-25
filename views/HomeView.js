import React from 'react'
import {StyleSheet, View, Text, AsyncStorage} from 'react-native'
import WeatherService from '../services/weather-service'
import Loading from '../components/Loading'
import { LinearGradient } from 'expo-linear-gradient';

class HomeView extends React.Component {
    serv = new WeatherService();
    state = {
        wea: null
    };

    componentDidMount() {
        this.serv.getWeatherHome('nanterre').then(response => {
            this.setState({
                wea: response.data
            })
        })
    }

    render() {
        return (
            <LinearGradient
                colors={['#000', '#3A4149']}
                style={{ flex: 1, alignItems: 'center' }}
            >
                {
                    this.state.wea != null ? (
                        <View style={styles.container}>
                            <View style={styles.topBlock}>
                                <View>
                                    <Text style={styles.title}>Vendredi 11 Octobre 2019</Text>
                                </View>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={styles.title}>{this.state.wea.name} :</Text>
                                    <Text style={styles.title}>{Math.floor(this.state.wea.main.temp - 273.15)} °C</Text>
                                </View>
                            </View>
                            <View style={styles.middleBlock}>
                                <View style={{marginBottom: 20}}>
                                    <Text style={styles.title}>Détails :</Text>
                                </View>
                                <View style={{marginBottom: 20}}>
                                    <Text style={styles.title}>{this.state.wea.weather[0].description}</Text>
                                </View>
                                <View style={{flexDirection: 'row'}}>
                                    <View style={{marginRight: 20}}>
                                        <Text style={styles.title}>Température: {Math.floor(this.state.wea.main.temp - 273.15)} °C</Text>
                                        <Text style={styles.title}>Température minimum: {Math.floor(this.state.wea.main.temp_min - 273.15)} °C</Text>
                                        <Text style={styles.title}>Température maximum: {Math.floor(this.state.wea.main.temp_max - 273.15)} °C</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.title}>Vitesse du vent: {this.state.wea.wind.speed * 3.6} Km/h</Text>
                                        <Text style={styles.title}>Préssion: {this.state.wea.main.pressure} hPa</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    ) : (
                        <Loading color='lightblue'>
                            <Text style={styles.title}>Chargement...</Text>
                        </Loading>
                    )
                }
            </LinearGradient>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topBlock: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: '#fff',
    },
    middleBlock : {
        flex: 2,
        paddingHorizontal: 20
    },
    bottomBlock: {
        flex: 3,
    }
});

export default HomeView