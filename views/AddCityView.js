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


    state = {
        city: ''
    };

    onChangeText(text) {
        this.setState({
            city: text
        })
    }

    addCity() {
      const action = { type: "ADD_FAVORITE", value: this.state.city }
      this.props.dispatch(action)
      this.props.navigation.goBack()
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