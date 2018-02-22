import React from 'react';
import { Text, View, StyleSheet, Image, Button } from 'react-native';

const SignUpStudent = (props) => {
    return (
        <View style={styles.container}>
            <Button title={"Finish Student"} onPress={() => props.navigation.navigate('WaitingStudent')}/>
        </View>

    );
}

const styles= StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: '100%',
    }
});

export default SignUpStudent;
