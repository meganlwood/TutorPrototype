import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native'
import { Button, Card } from 'react-native-elements';
import {
    getLoggedInUser, getLoggedInUserPromise, getStudent,
    getTutor, getStudentsWithoutTutor, connectStudentTutor
} from "../../FirebaseManager";


class SelectStudent extends Component {

    state={
        students: {},
        currentUserId: {}
    }

    componentWillMount() {
        getLoggedInUserPromise().then(user => {
            var userId = user.uid;
            this.setState({currentUserId: userId});
            getStudentsWithoutTutor().then(res => {
                res = Array.from(res);
                var s = res.map(function(student, index) {
                  return student;
                });
                this.setState({students: s});
            });
        });
    }

    renderCards(students) {
        if (!Array.isArray(students)) {
            return null;
        }

        return students.map((student, i) => {
            return <Card title={`Student`} key={i}>
              <Text >Grade: {student.grade}</Text>
              <Text >Subject: {student.subject}</Text>
              <Text >City: {student.city}</Text>
              <Text >Availability: N/A</Text>

                <Button
                    buttonStyle={styles.buttonStyle}
                    title={`Tutor Student`}
                    onPress={() =>  {
                      connectStudentTutor(student.key, this.state.currentUserId)
                    }}
                />

            </Card>
        })
    }


    render() {
        return(
            <ScrollView>

                {this.renderCards(this.state.students)}

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
}


export default SelectStudent;
