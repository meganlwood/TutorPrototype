import React from 'react';
import Messaging from "./screens/ParentSide/Messaging";
import CalendarScreen from "./screens/ParentSide/CalendarScreen";
import LearningPlan from "./screens/TutorSide/LearningPlan";
import {StackNavigator, TabNavigator} from "react-navigation";
import SettingsScreen from "./screens/ParentSide/SettingsScreen";
import LoginScreen from "./screens/Authorization/LoginScreen";
import SignUpStudent from './screens/Authorization/SignUpStudent';
import CreateAccount from './screens/Authorization/CreateAccount';

import Icon from 'react-native-vector-icons/Ionicons';
import ParentHome from './screens/ParentSide/Home';
import TutorHome from './screens/TutorSide/Home';
import SignUpTutor from "./screens/Authorization/SignUpTutor";
import WaitingStudent from "./screens/Authorization/WaitingStudent";
import WaitingTutor from "./screens/Authorization/WaitingTutor";


const ParentHomeStack = StackNavigator({
    Home: { screen: ParentHome, navigationOptions: { title: "Home" } },
    Messaging: { screen : Messaging, navigationOptions: { title: "Message Your Tutor" } },
});

const TutorHomeStack = StackNavigator({
    Home: { screen: TutorHome, navigationOptions: { title: "Home" }},
    Messaging: { screen: Messaging, navigationOptions: { title: "Message your student "}}
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

const TutorApp = TabNavigator(
    {
        Home: {
            screen: TutorHomeStack,
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

const ParentApp = TabNavigator(
    {
        Home: {
            screen: ParentHomeStack,
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
            screen: WaitingStudent,
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

const renderSignedInPage = (tutor, waiting) => {
    if (tutor) {
        if (waiting) {
            return WaitingTutor;
        }
        else return TutorApp;
    }
    else {
        if (waiting) {
            return WaitingStudent;
        }
        else return ParentApp;
    }

}

export const createRootNavigator = (signedIn, tutor, waiting) => {
    return StackNavigator(
        {
            SignedOut: {
                screen: AuthStack,
            },
            SignedIn: {
                screen: renderSignedInPage(tutor, waiting),
            }
        },
        {
            headerMode: 'none',
            initialRouteName: signedIn? "SignedIn" : "SignedOut",
        },
    );
}