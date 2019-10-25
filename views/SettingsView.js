import React from 'react';
import {StyleSheet, Text, View} from "react-native";

class SettingsView extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Setting</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3A4149',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: '#fff',
    }
});

export default SettingsView;