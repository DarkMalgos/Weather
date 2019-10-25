import React from 'react';
import {AsyncStorage, Button, StyleSheet, Text, View} from "react-native";

class SettingsView extends React.Component {
    onDeleteFavoritesPress() {
        AsyncStorage.removeItem('cities').then(() => alert('Favoris supprimés'));
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Setting</Text>
                <Button title="Supprimer les favoris" onPress={() => this.onDeleteFavoritesPress()} />
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
