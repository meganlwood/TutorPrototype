import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

const SettingsScreen = () => {
    return (
        <View style={styles.container}>
            <Image source={ require("../images/253pgj.jpg") } style={{ width: '100%', height: '100%'}} />
        </View>

    );
}

const styles= StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: '100%',
    }
});

export default SettingsScreen;
