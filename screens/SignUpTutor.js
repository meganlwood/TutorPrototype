import React from 'react';
import { Text, View, StyleSheet, Image, Button } from 'react-native';

const SignUpTutor = (props) => {
    return (
        <View style={styles.container}>
            <Button title={"Finish Tutor"} onPress={() => props.navigation.navigate('WaitingTutor')}/>
        </View>

    );
}

const styles= StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: '100%',
    }
});

export default SignUpTutor;
