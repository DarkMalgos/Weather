import React from 'react';
import {View, AsyncStorage, FlatList, RefreshControl, Text, Button, StyleSheet} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import WeatherService from '../services/weather-service'
import FavoriteItem from "../components/FavoriteItem";
import {SwipeRow} from "react-native-swipe-list-view";
import { NavigationEvents } from 'react-navigation';

class FavoriteView extends React.Component{
    static navigationOptions = ({ navigation }) => {

        return {
            title: 'Favoris',
            headerRight: (
                <Icon size={25} name={"ios-add-circle"} style={{paddingRight: 20}} onPress={ () => {
                    console.log(navigation.state.params.count)
                  if (navigation.state.params && navigation.state.params.count < 16) {
                    navigation.push('AddCity')
                  }
                  else
                  {
                    alert('vous avez atteind le maximum de favoris (16). Veuillez supprimer au moins un favoris pour pouvoir en rajouter')
                  }
                }}/>
            )
        }
    };

    serv = new WeatherService();

    state = {
        cities: [],
        refreshing: false,
        count:0,
    };



    componentDidMount(): void {
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            AsyncStorage.getItem("cities").then( data => {
              if (data) {
                this.props.navigation.setParams({count: JSON.parse(data).length});
                this.setState({
                  cities: JSON.parse(data)
                });


              }else{
                this.props.navigation.setParams({
                    count: 0
                });
              }
            })
        });
    };


    componentWillUnmount() {
        this.focusListener.remove();
    }

    deleteCity(index) {
        let cities = this.state.cities;
        if (cities.length > 1) {
            cities.splice(index, 1);
            AsyncStorage.setItem('cities', JSON.stringify(cities)).then(() => {
                this.setState({
                    cities: cities
                });

            }).catch(
                error => {
                    console.error('favorite view : ', error);
                }
            );
        } else {
            AsyncStorage.removeItem('cities').then(() => {
                this.setState({
                    cities: []
                })


            }).catch(
                error => {
                    console.error('favorite view : ', error);
                }
            );
        }
    }

    _refreshControl(){
        return (
            <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={()=>this._refreshListView()} />
        )
    }

    async _refreshListView() {
        //Start Rendering Spinner
        if (this.state.cities.length === 0)
            return;
        this.setState({refreshing: true});
        let cities = [];
        for (let i = 0; i < this.state.cities.length; i++) {
            let city = this.state.cities[i];
            let cityWeather = await this.serv.getWeatherHome(city.name);
            cities.push({
                name: city.name,
                temp: cityWeather.data.main.temp,
                icon: cityWeather.data.weather[0].icon
            })
        }
        AsyncStorage.setItem('cities', JSON.stringify(cities)).then(() => {
            this.setState({
                cities: cities,
                refreshing: false
            })
        })
    }

    render() {
        return(
            <View
                style={{flex: 1}}
            >
              <FlatList data={this.state.cities}
                        refreshControl={this._refreshControl()}
                        renderItem={(element) => (
                            <SwipeRow key={element.index} leftOpenValue={0} rightOpenValue={-75} style={{
                              backgroundColor: '#fff',
                              borderBottomColor: 'grey',
                              borderBottomWidth: 1
                            }}>
                              <View style={styles.standaloneRowBack}>
                                <View/>
                                <Button title="Suppr." onPress={() => this.deleteCity(element.index)} />
                              </View>
                              <View style={styles.standaloneRowFront}>
                                <FavoriteItem city={element.item}/>
                              </View>
                            </SwipeRow>

                        )}
                        style={{flex: 1, backgroundColor: '#fff'}}
              />
            </View>
        )
    }
}

const styles = StyleSheet.create({
  standaloneRowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    justifyContent: 'center',
    height: 80,
  },
  standaloneRowBack: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  }
});

export default FavoriteView
