import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

class HomePage extends React.Component{
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Accueil</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: '#fff',
    }
});

export default HomePage