import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native'
import { Button, Card } from 'react-native-elements';
import {
    getLoggedInUser, getLoggedInUserPromise, getStudent,
    getTutor, getStudentsWithoutTutor, connectStudentTutor,
    getStudentsForTutor
} from "../../FirebaseManager";


class SelectStudent extends Component {

    state={
        students: {},
        currentStudents: {},
        currentUserId: {}
    }

    componentWillMount() {
        getLoggedInUserPromise().then(user => {
            var userId = user.uid;
            this.setState({currentUserId: userId});
            getStudentsForTutor(userId).then(res => {
                if (res !== "NULL" && res[0] !== "NULL") {
                    var studentsArr = [];
                    for (var i = 0; i < res.length; i++) {
                        getStudent(res[i]).then(res => {
                            studentsArr.push(res.id);
                            this.setState({ currentStudents: studentsArr });
                        });
                    }
                }
                else {
                    this.setState({ currentStudents: []});
                }
                console.log("beginning: " + JSON.stringify(this.state.currentStudents));
            });
        }).then(user => {
            getStudentsWithoutTutor().then(res => {
                res = Array.from(res);
                var s = res.map(function(student, index) {
                  return student;
                });
                this.setState({students: s});
            });
        });
    }

    // addStudent(student_id) {
    //
    //   var arr = Array.from(this.state.currentStudents);
    //   arr.push(student_id);
    // }

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

                      var arr = this.state.currentStudents[0];
                      if (typeof arr == "undefined") {
                        arr = [];
                      }
                      arr.push(student.key);

                      connectStudentTutor(student.key, this.state.currentUserId, arr);
                      this.props.navigation.state.params.onNavigateBack(this);
                      this.props.navigation.goBack();
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
