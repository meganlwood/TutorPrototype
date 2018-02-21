import React, { Component } from 'react';
import { View, Text, Button as RNButton, StyleSheet, Image, KeyboardAvoidingView } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements'
import SimpleFormComponent from "./../components/SimpleFormComponent";
import firebase from 'firebase';

class LoginScreen extends Component {

    state={
        email: '',
        password: '',
        errors: {
            email: '',
            password: ''
        }
    }

    componentDidMount() {
        const config = {
            apiKey: "AIzaSyBsjlF4FNxju6ise_-PRyyD2ZhPVwyoev4",
            authDomain: "itutoru-ef7e2.firebaseapp.com",
            databaseURL: "https://itutoru-ef7e2.firebaseio.com",
            projectId: "itutoru-ef7e2",
            storageBucket: "itutoru-ef7e2.appspot.com",
            messagingSenderId: "115499384435"
        };

        firebase.initializeApp(config);
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

        if (this.state.email == '' || this.state.errors.email != '') {
            return;
        }
        if (this.state.password == '' || this.state.errors.password != '') {
            return;
        }

        const { email, password } = this.state;

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
            	console.log("logged in without error")
                var user = firebase.auth().currentUser.uid;
            	console.log(user);
            })

            .catch(() => {
                firebase.auth().createUserWithEmailAndPassword(email, password);
                console.log("created user");
                var userId = firebase.auth().currentUser.uid;
                firebase.database().ref('users/' + userId).set({
                    email: email,
                });
            });
        console.log("Logged in with: " + this.state.email + " and " + this.state.password);
        this.props.navigation.navigate('After');
    }

    render() {
        return(
            <KeyboardAvoidingView style={{ backgroundColor: 'white', height: '100%'}} behavior={"position"} keyboardVerticalOffset={-60}>

                <View style={{ height: 50 }}></View>
                <Image
                    source={require('./../images/logo2.png')}
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
                        onPress={() => console.log("Create Account")}
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