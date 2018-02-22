import React from 'react';
import Messaging from "./screens/Messaging";
import CalendarScreen from "./screens/CalendarScreen";
import LearningPlan from "./screens/LearningPlan";
import {StackNavigator, TabNavigator} from "react-navigation";
import SettingsScreen from "./screens/SettingsScreen";
import LoginScreen from "./screens/LoginScreen";
import SignUpStudent from './screens/SignUpStudent';
import CreateAccount from './screens/CreateAccount';

import Icon from 'react-native-vector-icons/Ionicons';
import Home from './screens/Home';
import SignUpTutor from "./screens/SignUpTutor";
import WaitingStudent from "./screens/WaitingStudent";
import WaitingTutor from "./screens/WaitingTutor";


const HomeStack = StackNavigator({
    Home: { screen: Home, navigationOptions: { title: "Home" } },
    Messaging: { screen : Messaging, navigationOptions: { title: "Message Your Tutor" } },
});

const CalendarStack = StackNavigator({
    Cal: { screen: CalendarScreen, navigationOptions: { title: "Calendar" } },
});

const LearningPlanStack = StackNavigator({
    LP: { screen: LearningPlan, navigationOptions: { title: "Learning Plan" } }
});

const SettingsStack = StackNavigator({
    Settings: { screen: SettingsScreen, navigationOptions: { title: "Settings" }}
});
const AuthStack = StackNavigator(
    {
        Login: { screen: LoginScreen },
        CreateAccount: { screen: CreateAccount },
        SignUpStudent: { screen: SignUpStudent },
        SignUpTutor: { screen: SignUpTutor },
        WaitingStudent: { screen: WaitingStudent },
        WaitingTutor: { screen: WaitingTutor },
    },
    {
        headerMode: 'none',
        mode: "card"
    }
);

const Tabs = TabNavigator(
    {
        Home: {
            screen: HomeStack,
            navigationOptions: {
                tabBarLabel: "Home",
                tabBarIcon: ({ tintColor }) => {
                    return <Icon name={'ios-home'} color={tintColor} size={25} />
                },
            }
        },
        LearningPlan: {
            screen: LearningPlanStack,
            navigationOptions: {
                tabBarLabel: "Learning Plan",
                tabBarIcon: ({ tintColor }) => {
                    return <Icon name={'ios-bulb'} color={tintColor} size={25} />
                },
            }
        },
        Calendar: {
            screen: CalendarStack,
            navigationOptions: {
                tabBarLabel: "Calendar",
                tabBarIcon: ({ tintColor }) => {
                    return <Icon name={'ios-calendar'} color={tintColor} size={25} />
                },
            }
        },
        Settings: {
            screen: SettingsStack,
            navigationOptions: {
                tabBarLabel: "Settings",
                tabBarIcon: ({ tintColor }) => {
                    return <Icon name={'ios-settings'} color={tintColor} size={25} />
                },
            }
        }

    },
    {
        tabBarOptions: {
            activeTintColor: '#0093ff',
            inactiveTintColor: 'gray',
        }
    }


);

export const createRootNavigator = (signedIn) => {
    return StackNavigator(
        {
            SignedOut: {
                screen: AuthStack,
            },
            SignedIn: {
                screen: Tabs,
            }
        },
        {
            headerMode: 'none',
            initialRouteName: signedIn? "SignedIn" : "SignedOut",
        },
    );
}