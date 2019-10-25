import React from 'react'
import {StyleSheet, View, Text, Alert, RefreshControl, ScrollView, SafeAreaView, Image} from 'react-native'
import WeatherService from '../services/weather-service'
import Loading from '../components/Loading'
import { LinearGradient } from 'expo-linear-gradient';
import Icon from "react-native-vector-icons/Ionicons";

class HomeView extends React.Component {
    serv = new WeatherService();
    state = {
        wea: null,
        location: null,
        refreshing: false,
    };

    findCoordinates = () => {
        navigator.geolocation.getCurrentPosition(
            position => {
                const location = JSON.stringify(position);

                this.setState({ location });
            },
            error => Alert.alert(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    };
    getLocationWeather(){
        navigator.geolocation.getCurrentPosition(
            position => {
                const location = JSON.stringify(position);
                console.log(position)
                this.serv.getWeatherCoord(position.coords.latitude,position.coords.longitude).then(response => {
                    this.setState({
                        wea: response.data,
                        refreshing: false
                    })

                    console.log(this.state.wea,'test')
                })

            },
            error => Alert.alert(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    }

    onRefresh(){
        this.setState({refreshing: true});
        this.getLocationWeather();
    }

    _refreshControl(){
        return (
            <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={()=>this.onRefresh()} />
        )
    }

    componentDidMount() {
        this.getLocationWeather()
    }
render() {
        return (
            <LinearGradient
                colors={['#2C0487', '#A86ED8']}
                style={{ flex: 1 }}
            >
                <SafeAreaView style={{flex: 1}}>
                    {
                        this.state.wea != null ? (
                            <ScrollView contentContainerStyle={styles.container}
                                  refreshControl={this._refreshControl()}>
                                <View style={styles.topBlock}>
                                    <View style={{flexDirection: 'row'}}>
                                        <Text style={styles.title}>{this.state.wea.name}</Text>
                                        {/*<Text style={styles.title}>{Math.floor(this.state.wea.main.temp - 273.15)} °C</Text>*/}
                                    </View>
                                </View>
                                <View style={styles.middleBlock}>
                                    <Image style={{width:200,height:200}} source={{uri:`https://openweathermap.org/img/wn/${this.state.wea.weather[0].icon}@2x.png`}}/>
                                    <View style={{marginBottom: 20}}>
                                        <Text style={styles.title}>{Math.floor(this.state.wea.main.temp - 273.15)} °C</Text>
                                        <Text style={styles.p}>{this.state.wea.weather[0].main}</Text>
                                        <Text style={styles.p}>{this.state.wea.name}</Text>
                                    </View>
                                </View>
                                <View style={styles.bottomBlock}>
                                    <View style={{marginRight: 20}}>
                                        <Icon style={styles.p} color={'#fff'} size={100} name={'ios-sunny'}/>
                                        <Sunrise time={this.state.wea.sys.sunrise} />
                                    </View>
                                    <View style={{marginRight: 20}}>
                                        <Icon style={styles.p} color={'#fff'} size={100} name={'ios-flag'}/>
                                        <Text style={styles.p}>{this.state.wea.wind.speed * 3.6} Km/h</Text>
                                    </View>
                                    <View style={{marginRight: 20}}>
                                        <Icon style={styles.p} color={'#fff'} size={100} name={'ios-thermometer'}/>
                                        <Text style={styles.p}>{Math.floor(this.state.wea.main.temp - 273.15)} °C</Text>
                                    </View>
                                </View>
                            </ScrollView>

                        ) : (
                            <Loading color='lightblue'>
                                <Text style={styles.title}>Chargement...</Text>
                            </Loading>
                        )
                    }
                </SafeAreaView>
            </LinearGradient>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        color: '#fff',
        marginHorizontal: 0,
        justifyContent: 'space-between'
    },
    topBlock: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    middleBlock : {
        flex: 8,
        justifyContent:'center',
        alignItems:'center',
    },
    bottomBlock: {
        flex: 3,
        flexDirection: 'row',
        alignItems:'center',
        textAlign:'center',
        justifyContent:'space-around'
    },
    title: {
        color: '#fff',
        fontWeight:'bold',
        fontSize: 23,
        textAlign: "center",
    },
    p: {
        color: '#fff',
        fontSize: 15,
        textAlign: "center",
    },
    img: {
        flex:2,
    },
    welcome: {
        fontSize: 20,
        textAlign: "center",
        margin: 10
    },
    instructions: {
        textAlign: "center",
        color: "#333333",
        marginBottom: 5
    },
    scrollView: {
        flex: 1,
        backgroundColor: 'pink',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
const Sunrise = (props) => {
    const dt = new Date(props.time * 1000);
    return (
        < Text style={styles.p}> {`${dt.getHours()}:${dt.getMinutes()}`}</Text>
    );
}
export default HomeView