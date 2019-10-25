import {createMaterialBottomTabNavigator} from "react-navigation-material-bottom-tabs";
import Icon from 'react-native-vector-icons/Ionicons';
import React from "react";
import { createStackNavigator } from "react-navigation-stack";

import HomeView from "../views/HomeView";
import SettingsView from "../views/SettingsView";
import FavoriteView from "../views/FavoriteView";
import AddCityView from "../views/AddCityView";

const favoritesNavigator = createStackNavigator(
    {
        Favorites:{
            screen: FavoriteView
        },
        AddCity: {
            screen: AddCityView
        }
    },
    {
        initialRouteName:'Favorites',
        headerStyle: {
            backgroundColor: '#fff',
        },
        headerTintColor: 'blueLight',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    }
);

const tabNavigator = createMaterialBottomTabNavigator(
    {
        Home: {
            screen: HomeView,
            navigationOptions: {
                tabBarLabel: 'Accueil',
                tabBarIcon: ({tintColor}) => (
                    <Icon color={tintColor} size={25} name={'ios-home'}/>
                )
            }
        },
        Favorite: {
            screen: favoritesNavigator,
            navigationOptions: {
                tabBarIcon: ({tintColor}) => (
                    <Icon color={tintColor} size={25} name={'ios-heart'}/>
                )
            }
        },
        Settings: {
            screen: SettingsView,
            navigationOptions: {
                tabBarIcon: ({tintColor}) => (
                    <Icon color={tintColor} size={25} name={'ios-settings'}/>
                )
            }
        }
    },
    {
        initialRouteName: 'Home',
        activeColor: 'blue',
        inactiveColor: 'lightblue',
        barStyle: {
            backgroundColor: '#fff',
            opacity: 50
        }
    }
);




export default  tabNavigator