import React, { Component } from 'react';
import { View, Text, Button as RNButton, StyleSheet, Image, KeyboardAvoidingView, ScrollView} from 'react-native';
import SimpleFormComponent from "../../components/SimpleFormComponent";
import { addTutorInfo } from "../../FirebaseManager";
import { Button } from 'react-native-elements';

class SignUpTutor extends Component {

    state={
        name: '',
        phone: '',
        subjects: '',
        exp: '',
        degree: '',
        city: ''

    }

    onPressSignUp() {
        this.state.frozen = true;
        addTutorInfo(this.state.name, this.state.phone, this.state.subjects, this.state.exp, this.state.degree, this.state.city);
        this.props.navigation.navigate("Home");
        // this.props.navigation.navigate("WaitingTutor");
        //addStudentInfo(this.state.name, this.state.phone, this.state.subject, this.state.grade, this.state.city); //automatically frozen
        //now should navigate to waiting screen
        //this.props.navigation.navigate("WaitingStudent");
    }

    render() {
        return(

                <KeyboardAvoidingView style={{ backgroundColor: 'white', height: '100%'}} behavior={"position"} keyboardVerticalOffset={-60}>

                    <ScrollView>
                    <View style={{ height: 50 }}></View>
                    <Text style={styles.title}>New Tutor Application</Text>
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
                        secure={false}
                        keyboard={'phone-pad'}
                    />
                    <SimpleFormComponent
                        title={"Subjects"}
                        onChangeText={(text) => this.setState({ subjects: text })}
                        secure={false}
                        keyboard={null}
                    />
                    <SimpleFormComponent
                        title={"Do you have tutoring experience?"}
                        onChangeText={(text) => this.setState({ exp: text })}
                        secure={false}
                        keyboard={'numeric'}
                    />
                    <SimpleFormComponent
                        title={"What is your highest degree obtained?"}
                        onChangeText={(text) => this.setState({ degree: text })}
                        secure={false}
                        keyboard={null}
                    />
                    <SimpleFormComponent
                        title={"City"}
                        onChangeText={(text) => this.setState({ city: text })}
                        secure={false}
                        keyboard={null}
                    />
                    <Button
                        buttonStyle={styles.button}
                        title={"Submit"}
                        onPress={() => this.onPressSignUp()}
                    />

                    </ScrollView>
                </KeyboardAvoidingView>

        );
    }
}

const styles= StyleSheet.create({
    button: {
        backgroundColor: '#0093ff',
        borderRadius: 20,
        marginBottom: 50,
    },
    title: {
        alignSelf: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        color: 'gray'
    }
});

export default SignUpTutor;
