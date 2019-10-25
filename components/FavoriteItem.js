import React from 'react'
import {StyleSheet, View, Text, Image} from 'react-native';
import PropTypes from "prop-types";

class FavoriteItem extends React.Component {
    static propTypes = {
        city: PropTypes.any.isRequired
    };

    static ImgWeather(icon) {
        return(
            <Image style={{width:80,height:80}} source={{uri:`https://openweathermap.org/img/wn/${icon}@2x.png`}}/>
        )
    };
    
    render()  {
      console.log('favorite item', this.props);
      return (
        <View
            style={{
              flex: 1,
              justifyContent: "space-between",
              flexDirection: 'row',
              textAlign: 'justify',
              padding: 20,
              alignItems: 'center',
            }}
        >

            <Text>{this.props.city.name}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text>{Math.round(this.props.city.temp -273.15)}°C </Text>
                {FavoriteItem.ImgWeather(this.props.city.icon)}
            </View>

        </View>
      );
    };
}

const styles = StyleSheet.create({
    topBlock: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

});

export default FavoriteItem