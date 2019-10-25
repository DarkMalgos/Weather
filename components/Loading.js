import React from 'react'
import { StyleSheet, View, Text } from 'react-native';
import {ActivityIndicator} from "react-native-paper";
import PropTypes from 'prop-types';

class Loading extends React.Component {
    static propTypes = {
        color: PropTypes.string.isRequired
    };

    render()  {
        return (
            <View style={styles.topBlock}>
                <ActivityIndicator size='large' color={this.props.color}/>
                {this.props.children}
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

export default Loading