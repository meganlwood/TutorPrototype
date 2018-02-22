import React from 'react';
import { Text, View, StyleSheet, Image, Button } from 'react-native';

const WaitingTutor = (props) => {
    return (
        <View style={styles.container}>
            <Text>Waiting Tutor</Text>
        </View>

    );
}

const styles= StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: '100%',
    }
});

export default WaitingTutor;
