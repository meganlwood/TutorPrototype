import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, ActivityIndicator } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Card, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import SettingsScreen from './screens/ParentSide/SettingsScreen';
import LearningPlan from './screens/TutorSide/LearningPlan';
import CalendarScreen from './screens/ParentSide/CalendarScreen';
import Messaging from './screens/ParentSide/Messaging';
import firebase from 'firebase';
import LoginScreen from './screens/Authorization/LoginScreen'
import Router, { createRootNavigator } from './Router';
import {getLoggedInUserPromise, initialize, userType} from "./FirebaseManager";


const Loading = () => {
    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Loading your account...</Text>
            <ActivityIndicator/>
        </View>
    );
}

const Renderer = (props) => {
    if (props.loading) return <Loading />
    else {
        const Page = createRootNavigator(props.signedIn, props.tutor);
        return <Page />
    }
}

class App extends Component {

    state={
        loading: true,
        signedIn: false,
        tutor: true,
    }

    componentWillMount() {
        initialize();
    }

    render() {
        console.disableYellowBox = true;
        //initialize();

        //var Router = null;
        var thisref = this;

        console.log("AAAAAA");
        if (this.state.loading) {
            getLoggedInUserPromise().then(res => {
                console.log("hello??");
                console.log("BBBBBB");
                userType().then(res => {
                    if (res === 'tutor') {
                        thisref.setState({ loading: false, signedIn: true, tutor: true });
                    }
                    else {
                        thisref.setState({ loading: false, signedIn: true, tutor: false });
                    }
                })


            }).catch(error => {
                thisref.setState({ loading: false, signedIn: false });
            });
        }


        // var signedIn = false;
        // var isTutor = true;
        // var waiting = false;
        //const Router = createRootNavigator(signedIn, isTutor, waiting);


        // if (this.state.loading) {
        //     return( <Loading />);
        // }
        // else return (
        //     createRootNavigator(this.state.signedIn, this.state.tutor)
        // );

        return(
            <Renderer signedIn={this.state.signedIn} tutor={this.state.tutor} loading={this.state.loading}/>
        );

    }
}



export default App;
