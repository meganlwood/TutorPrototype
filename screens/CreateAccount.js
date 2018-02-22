import React from 'react';
import { Text, View, StyleSheet, Image, Button } from 'react-native';

const CreateAccount = (props) => {
    return (
        <View style={styles.container}>
            <Button title={"Sign up as Student"} onPress={() => props.navigation.navigate('SignUpStudent')}/>
            <Button title={"Sign up as Tutor"} onPress={() => props.navigation.navigate('SignUpTutor')} />
        </View>

    );
}

const styles= StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: '100%',
    }
});

export default CreateAccount;
