import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Card, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import SettingsScreen from './screens/ParentSide/SettingsScreen';
import LearningPlan from './screens/TutorSide/LearningPlan';
import CalendarScreen from './screens/ParentSide/CalendarScreen';
import Messaging from './screens/ParentSide/Messaging';
// import LoginScreen from './screens/LoginScreenOld';
import LoginScreen from './screens/Authorization/LoginScreen'
import Router, { createRootNavigator } from './Router';
import { initialize } from "./FirebaseManager";

class App extends Component {


    render() {
        console.disableYellowBox = true;
        initialize();

        var signedIn = true;
        var isTutor = false;
        var waiting = false;
        const Router = createRootNavigator(signedIn, isTutor, waiting);

        return (
            <Router />
        );

    }
}



export default App;