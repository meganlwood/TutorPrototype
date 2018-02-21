import React, { Component } from 'react';
import { Text, View } from 'react-native';
// import SimpleTextInput from './../components/SimpleTextInput.js'



const CreateAccountForm = (props) => {
    return(
        <View></View>
    );
}

class CreateAccountTutor extends Component {

    static navigationOptions = {
        title: 'Create New Account'
    }

    state = {
        name: '',

    }


    render() {
        return (
            <View>
                <CreateAccountForm />
            </View>
        );
    }


}

export default CreateAccountTutor;
