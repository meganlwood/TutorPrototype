import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, Image, KeyboardAvoidingView} from 'react-native';
import { userIsFrozen } from "../../FirebaseManager";

class WaitingStudent extends Component {

    state={
        signedUp: true,
        appReceived: '',
        Matched: '',
        frozen: null,
    };

    /*
    renderFrozen() {
        userIsFrozen().then(res => {
            // if (res === true) {
            //     return <View><Text>☑Frozen</Text></View>
            // }
            // else {
            //     return <View><Text>☑Not Frozen</Text></View>
            // }
            this.setState({ frozen: res });
        });

        if (this.state.frozen) {
            return <View><Text>☑Frozen</Text></View>
        }
        else {
            return <View><Text>☑Not Frozen</Text></View>
        }


    }
    */

    render() {
        return(
            <View style={{ backgroundColor: 'white', height: '100%', padding: 20 }} >

                <View style={{ height: 50 }}></View>
                <Text style={styles.title}>Your application has been sent!</Text>
                <View style={{ height: 50 }}></View>
                <Image
                    source={require('../../images/logo2.png')}
                    style={{ alignSelf: 'center', width: 150, height: 150 }}
                />
                <View style={{ height: 40 }}></View>
                <Text style={styles.paragraph}>We'll send you an email once you have been matched with a tutor.</Text>



            </View>
        );
    }
}

const styles= StyleSheet.create({
    button: {
        backgroundColor: '#0093ff',
        borderRadius: 20,
    },
    title: {
        alignSelf: 'center',
        fontSize: 26,
        fontWeight: 'bold',
        color: 'gray',
        textAlign: 'center'
    },
    paragraph: {
        textAlign: 'center',
        color: 'gray',
        fontSize: 24,
    }
});

export default WaitingStudent;