import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Card, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import SettingsScreen from './screens/SettingsScreen';
import LearningPlan from './screens/LearningPlan';
import CalendarScreen from './screens/CalendarScreen';
import Messaging from './screens/Messaging';
import LoginScreen from './screens/LoginScreen';

class App extends Component {

    static navigationOptions = {
        title: 'iTutorU Home'
    }

    // componentWillMount() {
    //   var config = {
    //     apiKey: "AIzaSyAV215r3uUiVrypPD15V_fe9DFjgBhILO8",
    //     authDomain: "tutor-74fc7.firebaseapp.com",
    //     databaseURL: "https://tutor-74fc7.firebaseio.com",
    //     projectId: "tutor-74fc7",
    //     storageBucket: "tutor-74fc7.appspot.com",
    //     messagingSenderId: "687083668929"
    //   };
    //   firebase.initializeApp(config);
    // }


    render() {
        return (
            // <Card>
            //   <Text>Hi!</Text>
            //   <Button
            //     title="Click me for details"
            //     onPress={() => this.props.navigation.navigate('Details')}
            //   />
            // </Card>

            <ScrollView style={{ paddingBottom: 10 }}>

                <Card
                    title="Next Tutoring Session"
                >

                    <Text style={{ alignSelf:'center', fontStyle:'italic' }}>Wednesday</Text>
                    <Text style={{ alignSelf: 'center' }}>February 7, 2018</Text>
                    <Text style={{ alignSelf: 'center', fontWeight:'bold' }}>4:00 PM</Text>

                    <Button
                        title="Cancel Session"
                        buttonStyle={styles.buttonStyle}
                    />
                </Card>

                <Card
                    title="Tutor: Casey Klecan"
                    containerStyle={{ marginBottom: 10 }}

                >

                    <View style={styles.cardFlexRow}>
                        <Image style={{ width: 150, height: 150, alignSelf: 'center', borderRadius: 30 }}source={{ uri: 'https://scontent-lax3-1.xx.fbcdn.net/v/t1.0-9/11755184_10206113377466757_7394161452798419604_n.jpg?oh=6b8c0be2e92d7e17add275dcbacd6ed6&oe=5AE7510F'}}
                        />
                        <Card
                            containerStyle={styles.tutorInfoCard}
                        >
                            <Text style={styles.boldText}>Student:</Text>
                            <Text style={styles.bigText}>Bobby</Text>
                            <Text style={styles.boldText}>Subject:</Text>
                            <Text style={styles.bigText}>Math</Text>
                        </Card>
                    </View>
                    <Button onPress={() => this.props.navigation.navigate('Messaging')}
                            title="Message Casey"
                            buttonStyle={styles.buttonStyle}
                    />
                </Card>
            </ScrollView>


        );
    }
}

const styles = {
    buttonStyle: {
        marginTop: 20,
        backgroundColor: '#0093ff',
        borderRadius: 30,
    },
    cardStyle: {
        borderColor: '#f5f924'
    },
    cardFlexRow: {
        flexDirection: 'row',
    },
    boldText: {
        fontWeight: 'bold',
        fontSize: 22,
    },
    bigText: {
        fontSize: 22,
        marginBottom: 20,
    },
    tutorInfoCard: {
        paddingTop: 30,
        width: 150,
    }

}

const HomeStack = StackNavigator({
    Home: { screen: App },
    Messaging: { screen : Messaging },
});

const CalStack = StackNavigator({
    Cal: { screen: CalendarScreen },
});

const Tabs = TabNavigator(
    {
        // Auth: { screen: LoginScreen },
        Home: { screen: HomeStack },
        ['Learning Plan']: { screen: LearningPlan },
        Calendar: { screen: CalStack },
        Settings: { screen: SettingsScreen },

    },
    {
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === 'Home') {
                    iconName = 'ios-home';
                }
                else if (routeName === 'Settings') {
                    iconName = 'ios-settings';
                }
                else if (routeName === 'Learning Plan') {
                    iconName = 'ios-bulb';
                }
                else if (routeName === 'Calendar') {
                    iconName = 'ios-calendar';
                }

                return <Icon name={iconName} color={tintColor} size={25}/>
            }
        }),
        tabBarOptions: {
            activeTintColor: '#0093ff',
            inactiveTintColor: 'gray',
        }
    }
);

export default StackNavigator({
    Auth: { screen: LoginScreen },
    After: { screen: Tabs }
}, { headerMode: 'none' });
