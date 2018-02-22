import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, Image, KeyboardAvoidingView} from 'react-native';
import SimpleFormComponent from "../SimpleFormComponent";
import { addStudentInfo } from "../FirebaseManager";

class SignUpStudent extends Component {

    state={
        name: '',
        phone: '',
        subject: '',
        grade: '',
        city: '',

    }

    onPressSignUp() {
        this.state.frozen = true;
        addStudentInfo(this.state.name, this.state.phone, this.state.subject, this.state.grade, this.state.city); //automatically frozen
        //now should navigate to waiting screen
        this.props.navigation.navigate("WaitingStudent");
    }

    render() {
        return(
            <KeyboardAvoidingView style={{ backgroundColor: 'white', height: '100%'}} behavior={"position"} keyboardVerticalOffset={-60}>

                <View style={{ height: 50 }}></View>
                <Text style={styles.title}>New Student Sign Up</Text>
                <View style={{ height: 20 }}></View>

                <SimpleFormComponent
                    title={"Full Name"}
                    onChangeText={(text) => this.setState({ name: text })}
                    secure={false}
                    keyboard={null}
                />
                <SimpleFormComponent
                    title={"Phone Number"}
                    onChangeText={(text) => this.setState({ phone: text })}
                    secure={true}
                    keyboard={'phone-pad'}
                />
                <SimpleFormComponent
                    title={"Subject"}
                    onChangeText={(text) => this.setState({ subject: text })}
                    secure={true}
                    keyboard={null}
                />
                <SimpleFormComponent
                    title={"Grade"}
                    onChangeText={(text) => this.setState({ grade: text })}
                    secure={true}
                    keyboard={'numeric'}
                />
                <SimpleFormComponent
                    title={"City"}
                    onChangeText={(text) => this.setState({ city: text })}
                    secure={true}
                    keyboard={null}
                />
                <Button
                    buttonStyle={styles.button}
                    title={"Submit"}
                    onPress={() => this.onPressSignUp()}
                />


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

export default SignUpStudent;
