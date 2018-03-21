import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, KeyboardAvoidingView, ScrollView} from 'react-native';
import SimpleFormComponent from "../../components/SimpleFormComponent";
import { addStudentInfo } from "../../FirebaseManager";
import { Button } from 'react-native-elements';

class SignUpStudent extends Component {

    state={
        studentName: '',
        parentName: '',
        phone: '',
        subject: '',
        grade: '',
        city: '',
        newParent: true

    };

    componentWillMount() {
        if (this.props.navigation.state.params != null && this.props.navigation.state.params.parentName != null) {
            this.setState({parentName: this.props.navigation.state.params.parentName, newParent: false});
        }
    }

    onPressSignUp() {
        this.state.frozen = true;
        addStudentInfo(this.state.studentName, this.state.parentName, this.state.phone, this.state.subject, this.state.grade, this.state.city, this.state.newParent); //automatically frozen
        //now should navigate to waiting screen
        // this.props.navigation.navigate("WaitingStudent");
        this.props.navigation.navigate("Home");
    }

    onPressNewStudent() {

    }

    render() {
        return(
            <KeyboardAvoidingView style={{ backgroundColor: 'white', height: '100%'}} behavior={"position"} keyboardVerticalOffset={-60}>
                <ScrollView>
                    <View style={{ height: 50 }}></View>
                    <Text style={styles.title}>New Student Sign Up</Text>
                    <View style={{ height: 20 }}></View>

                    {this.state.newParent ?
                    <SimpleFormComponent
                        title={"Full Name (Parent)"}
                        onChangeText={(text) => this.setState({ parentName: text })}
                        secure={false}
                        keyboard={null}
                    /> : null}
                    <SimpleFormComponent
                        title={"Full Name (Student)"}
                        onChangeText={(text) => this.setState({ studentName: text })}
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
                        title={"Subject(s)"}
                        onChangeText={(text) => this.setState({ subject: text })}
                        secure={false}
                        keyboard={null}
                    />
                    <SimpleFormComponent
                        title={"Student's Grade"}
                        onChangeText={(text) => this.setState({ grade: text })}
                        secure={false}
                        keyboard={'numeric'}
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
        marginBottom: 20
    },
    title: {
        alignSelf: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        color: 'gray'
    }
});



export default SignUpStudent;
