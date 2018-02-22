import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Card, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
// import SettingsScreen from './screens/SettingsScreen';
// import LearningPlan from './screens/LearningPlan';
// import CalendarScreen from './screens/CalendarScreen';
import Messaging from './Messaging';
// import LoginScreen from './screens/LoginScreenOld';
import LoginScreen from './LoginScreen'
// import CreateAccountTutor from "./screens/CreateAccountTutor";

DATA = {
    nextTutoringSession: {
        dayOfTheWeek: "Thursday",
        date: "February 22, 2018",
        time: "4:00 PM",
    },
    tutor: {
        name: "Casey Klecan",
        profileImg: "https://scontent-lax3-1.xx.fbcdn.net/v/t1.0-9/11755184_10206113377466757_7394161452798419604_n.jpg?oh=6b8c0be2e92d7e17add275dcbacd6ed6&oe=5AE7510F"
    },
    student: {
        name: "Bobby",
        subject: "Math"
    }
}

class Home extends Component {

    state={
        data: DATA,
    }

    render() {

        const { nextTutoringSession, tutor, student } = this.state.data;

        return (

            <ScrollView style={{ paddingBottom: 10 }}>

                <Card
                    title="Next Tutoring Session"
                >

                    <Text style={{ alignSelf:'center', fontStyle:'italic' }}>{nextTutoringSession.dayOfTheWeek}</Text>
                    <Text style={{ alignSelf: 'center' }}>{nextTutoringSession.date}</Text>
                    <Text style={{ alignSelf: 'center', fontWeight:'bold' }}>{nextTutoringSession.time}</Text>

                    <Button
                        title="Cancel Session"
                        buttonStyle={styles.buttonStyle}
                    />
                </Card>

                <Card
                    title={`Tutor: ${tutor.name}`}
                    containerStyle={{ marginBottom: 10 }}

                >

                    <View style={styles.cardFlexRow}>
                        <Image style={styles.image} source={{ uri: tutor.profileImg}}
                        />
                        <Card
                            containerStyle={styles.tutorInfoCard}
                        >
                            <Text style={styles.boldText}>Student:</Text>
                            <Text style={styles.bigText}>{student.name}</Text>
                            <Text style={styles.boldText}>Subject:</Text>
                            <Text style={styles.bigText}>{student.subject}</Text>
                        </Card>
                    </View>
                    <Button onPress={() => this.props.navigation.navigate('Messaging')}
                            title={`Message ${tutor.name}`}
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
    },
    image: {
        width: 150,
        height: 150,
        alignSelf: 'center',
        borderRadius: 30
    }

}

export default Home;
