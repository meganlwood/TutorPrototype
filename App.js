import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Card, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import SettingsScreen from './screens/SettingsScreen';
import LearningPlan from './screens/LearningPlan';
import CalendarScreen from './screens/CalendarScreen';
import Messaging from './screens/Messaging';
// import LoginScreen from './screens/LoginScreenOld';
import LoginScreen from './screens/LoginScreen'
import CreateAccountTutor from "./screens/CreateAccountTutor";
import Router, { createRootNavigator } from './Router';
import { initialize } from "./FirebaseManager";

class App extends Component {


    render() {
        console.disableYellowBox = true;
        initialize();

        var signedIn = false;
        const Router = createRootNavigator(signedIn);

        return (
            <Router />
        );


    }
}



export default App;