import React, { Component } from 'react';
import { View, Text, Button as RNButton, StyleSheet, Image, KeyboardAvoidingView } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements'
import SimpleFormComponent from "../../components/SimpleFormComponent";
import firebase from 'firebase';

class LoginScreen extends Component {

    state={
        email: '',
        password: '',
        errors: {
            email: '',
            password: ''
        },
        // loading: false,
    }



    onChangeEmail(text) {
        if (text.match(/.*@.*\..*.*/)) {
            this.state.errors.email = '';
        }
        else {
            this.state.errors.email = 'Invalid Email';
        }

        this.setState(this.state);
        this.setState({ email: text })
    }

    onPressLogin() {

        //call firebase
        this.props.navigation.navigate('SignedIn');
    }

    render() {
        return(
            <KeyboardAvoidingView style={{ backgroundColor: 'white', height: '100%'}} behavior={"position"} keyboardVerticalOffset={-60}>

                <View style={{ height: 50 }}></View>
                <Image
                    source={require('../../images/logo2.png')}
                    style={{ alignSelf: 'center' }}
                />
                <View style={{ height: 10 }}></View>
                <Text style={styles.title}>iTutorU</Text>
                <View style={{ height: 20 }}></View>

                <SimpleFormComponent
                    title={"Email"}
                    onChangeText={(text) => this.onChangeEmail(text)}
                    errorMessage={this.state.errors.email}
                    secure={false}
                    keyboard={'email-address'}
                    spellcheck={false}
                />
                <SimpleFormComponent
                    title={"Password"}
                    onChangeText={(text) => this.setState({ password: text })}
                    errorMessage={this.state.errors.password}
                    secure={true}
                    keyboard={null}
                />
                <Button
                    buttonStyle={styles.button}
                    title={"Sign in"}
                    onPress={() => this.onPressLogin()}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <RNButton
                        title={"Create Account"}
                        onPress={() => this.props.navigation.navigate('CreateAccount')}
                    />
                    <RNButton
                        title={"Forgot Password?"}
                        onPress={() => console.log("Forgot Pass")}
                    />

                </View>


            </KeyboardAvoidingView>
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
        fontSize: 30,
        fontWeight: 'bold',
        color: 'gray'
    }
});


export default LoginScreen;