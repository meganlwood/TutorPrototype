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
import LoginScreen from '../Authorization/LoginScreen'
import {getLoggedInUserPromise, getParent} from "../../FirebaseManager";
// import CreateAccountTutor from "./screens/CreateAccountTutor";

DATA = {
    // nextTutoringSession: {
    //     dayOfTheWeek: "Thursday",
    //     date: "February 22, 2018",
    //     time: "4:00 PM",
    // },
    students: [
        {
            name: "Bobby",
            subject: "Math",
            tutor: 1,
            nextSession: {
                dayOfTheWeek: "Thursday",
                date: "February 22, 2018",
                time: "4:00 PM",
                location: "Doheny Library",
            }
        },
        {
            name: "Billy",
            subject: "Writing",
            tutor: null,
            nextSession: {
                dayOfTheWeek: "Thursday",
                date: "February 22, 2018",
                time: "2:00 PM",
                location: "Doheny Library",
            }
        }

    ],
    tutors: [
        {
            id: 1,
            name: "Casey Klecan",
            profileImg: "https://scontent-lax3-1.xx.fbcdn.net/v/t1.0-9/11755184_10206113377466757_7394161452798419604_n.jpg?oh=6b8c0be2e92d7e17add275dcbacd6ed6&oe=5AE7510F",
            subjects: [
                "Math", "Computer Science"
            ]
        },
        {
            id: 2,
            name: "Courtney Wood",
            profileImg: "https://scontent-lax3-1.xx.fbcdn.net/v/t1.0-9/11755184_10206113377466757_7394161452798419604_n.jpg?oh=6b8c0be2e92d7e17add275dcbacd6ed6&oe=5AE7510F",
            subjects: [
                "Writing, Reading"
            ]
        }
    ]


}

class Home extends Component {

    state={
        data: DATA,
        parentName: "Mom Smith",
    }
/*
    componentWillMount() {
        console.log("HELLO!!!!!")
        getLoggedInUserPromise().then(user => {
                var userID = user.uid;
                console.log("user: " + userID);
                getParent(userID).then(res => {
                    console.log(JSON.stringify(res));
                    var json = JSON.parse(JSON.stringify(res));

                    this.setState({data: json})
                    var studentsArr = [];
                    studentsArr.push(json.studentName);
                    //students do not have a user id
                });
            }
        );
    }
*/
    renderNextSessionCards(students) {
        return students.map((student) => {
            return <Card title={`${student.name}'s next Tutoring Session`}>
                <Text style={{ alignSelf:'center', fontStyle:'italic' }}>{student.nextSession.dayOfTheWeek}</Text>
                <Text style={{ alignSelf: 'center' }}>{student.nextSession.date}</Text>
                <Text style={{ alignSelf: 'center', fontWeight:'bold' }}>{student.nextSession.time}</Text>

                <Button
                title="Cancel Session"
                buttonStyle={styles.buttonStyle}
                />

            </Card>
        })
    }

    getTutorIndex(id) {
        for (var i = 0; i < this.state.data.tutors.length; i++) {
            if (id === this.state.data.tutors[i].id) return i;
        }
    }


    renderTutorDetails(tutor) {
        if (tutor == null) {
            return (<View><Text style={[styles.text, { fontStyle: 'italic', paddingTop: 0 }]}>Not yet matched</Text></View>);
        }
        else {
            var listOfSubjects = "";
            for (var i = 0; i < tutor.subjects.length; i++) {
                listOfSubjects += tutor.subjects[i];
                if (i != tutor.subjects.length-1) listOfSubjects += ", ";
            }
            return (<View>
                <Image style={styles.image} source={{ uri: tutor.profileImg}} />
                <Text style={styles.text}>{`Subjects: ${listOfSubjects}`}</Text>
                <Button onPress={() => this.props.navigation.navigate('Messaging')}
                        title={`Message ${tutor.name}`}
                        buttonStyle={styles.buttonStyle}
                />
            </View>);
        }
    }

    renderTutorCards(students, tutors) {
        return students.map((student) => {

            var tutor = null;
            if (student.tutor !== null) {
                tutor = tutors[this.getTutorIndex(student.tutor)];
            }



            return <Card
                title={`${student.name}'s Tutor${tutor != null? ": " + tutor.name : ""}`}
                containerStyle={{ marginBottom: 10 }}
            >
                {this.renderTutorDetails(tutor)}




            </Card>
        })
    }

    render() {

        const { students, tutors } = this.state.data;

        return (

            <ScrollView style={{ paddingBottom: 10 }}>

                {this.renderNextSessionCards(students)}
                {this.renderTutorCards(students, tutors)}
                <Button onPress={() => this.props.navigation.navigate('SignUpStudent', {parentName: this.state.parentName})}
                        title={`Add New Student`}
                        buttonStyle={styles.buttonStyle}/>

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
    text: {
        fontSize: 16,
        alignSelf: 'center',
        paddingTop: 20,
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
