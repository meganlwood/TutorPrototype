import React, { Component } from 'react';
import { View, Text, Button as RNButton, StyleSheet, Image, KeyboardAvoidingView, ActivityIndicator, ScrollView } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements'
import SimpleFormComponent from "../../components/SimpleFormComponent";
import { createStudent, createTutor } from "../../FirebaseManager";
import { SignUpStudent } from './SignUpStudent';
import {
    BallIndicator,
    BarIndicator,
    DotIndicator,
    MaterialIndicator,
    PacmanIndicator,
    PulseIndicator,
    SkypeIndicator,
    UIActivityIndicator,
    WaveIndicator,
} from 'react-native-indicators';

class CreateAccount extends Component {

    state={
        email: '',
        errors: {
            email: '',
            password: ''
        },
        type: '',
        loading: false,
    }


    onPressStudent() {
        console.log("in press student");
        this.setState({ loading: true });

        createStudent(this.state.email, this.state.password).then(res => {
            if (res == true) {
                this.setState({ loading: false })
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
        this.setState({ loading: true });

        createTutor(this.state.email, this.state.password).then(res => {
            console.log("CREATED TUTOR: " + res);
            if (res == true) {
                this.setState({ loading: false })
                this.props.navigation.navigate("SignUpTutor");
            }
            else {
                this.state.errors.password = res;
            }
        })
    }


    render() {
        return(
            <KeyboardAvoidingView style={{ backgroundColor: 'white', height: '100%'}} behavior={"position"} keyboardVerticalOffset={-150}>
                <ScrollView>
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


                <View style={{ height: 40, opacity: this.state.loading? 1 : 0, paddingBotton: 20 }}>

                <DotIndicator
                    animating={this.state.loading}
                    // hidden={!this.state.loading}
                    // size={"large"}
                    size={15}
                    color={'#0093ff'}
                />
                    <View style={{ height: 20 }}></View>

                </View>

                <Button
                    buttonStyle={styles.button}
                    title={"Sign up new Student"}
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
                <View style={{ height: 30 }}></View>



                </ScrollView>



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
