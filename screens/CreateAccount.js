import React, { Component } from 'react';
import { View, Text, Button as RNButton, StyleSheet, Image, KeyboardAvoidingView} from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements'
import SimpleFormComponent from "../SimpleFormComponent";
import { createStudent, createTutor } from "../FirebaseManager";
import { SignUpStudent } from './SignUpStudent';

class CreateAccount extends Component {

    state={
        email: '',
        errors: {
            email: '',
            password: ''
        },
        type: ''
    }

    /*
    onPressLogin() {
        createUser(this.state.email, this.state.password, this.state.type).then(res => {
            if (res == true) {
                this.props.navigation.navigate("SignedIn");

            }
            else {
                this.state.errors.password = res;
            }
        })
    }
    */

    onPressStudent() {
        console.log("in press student");
        createStudent(this.state.email, this.state.password).then(res => {
            if (res == true) {
                console.log("successfully made student");
                this.props.navigation.navigate("SignUpStudent");

            }
            else {
                this.state.errors.password = res;
                console.log("did not work, the error is " + this.state.errors.password);
            }
        })
    }

    onPressTutor() {
        createTutor(this.state.email, this.state.password).then(res => {
            if (res == true) {
                this.props.navigation.navigate("SignUpTutor");

            }
            else {
                this.state.errors.password = res;
            }
        })
    }


    render() {
        return(
            <KeyboardAvoidingView style={{ backgroundColor: 'white', height: '100%'}} behavior={"position"} keyboardVerticalOffset={-60}>

                <View style={{ height: 50 }}></View>
                <Text style={styles.title}>Sign Up</Text>
                <View style={{ height: 20 }}></View>

                <SimpleFormComponent
                    title={"Email"}
                    onChangeText={(text) => this.setState({ email: text })}
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
                <SimpleFormComponent
                    title={"Confirm Password"}
                    onChangeText={(text) => this.setState({ password: text })}
                    errorMessage={this.state.errors.password}
                    secure={true}
                    keyboard={null}
                />
                <Button
                    buttonStyle={styles.button}
                    title={"Sign up as Student"}
                    onPress={() => this.onPressStudent()}
                />
                <Button
                    buttonStyle={styles.button}
                    title={"Sign up as Tutor"}
                    onPress={() => this.onPressTutor()}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <RNButton
                        title={"Already have an account? Sign in"}
                        onPress={() => this.props.navigation.goBack()}
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
        marginBottom: 20,
    },
    title: {
        alignSelf: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        color: 'gray'
    }
});


export default CreateAccount;
