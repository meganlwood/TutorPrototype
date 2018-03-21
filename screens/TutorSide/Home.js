import React, { Component } from 'react';
import { View, Text } from 'react-native'
import { Button, Card } from 'react-native-elements';
import {
    getLoggedInUser, getLoggedInUserPromise, getStudent, getStudentsForTutor,
    getTutor
} from "../../FirebaseManager";


class TutorHome extends Component {

    state={
        students: {},
        currentUserId: {}
    }

    componentWillMount() {
        //call firebase here and setState with the firebase data
        //console.log("LOGGED IN USER: " + getLoggedInUser());
        // getLoggedInUserPromise().then(user => {
        //     var userID = user.uid;
        //     getTutor(userID).then(res => {
        //         console.log(JSON.stringify(res));
        //         var json = JSON.parse(JSON.stringify(res));
        //
        //         this.setState({data: json})
        //
        //     });
        //     }
        // );

        getLoggedInUserPromise().then(user => {
            var userId = user.uid;
            this.setState({currentUserId: userId});
            getStudentsForTutor(userId).then(res => {
                if (Array.isArray(res)) {
                    var studentsArr = [];
                    for (var i = 0; i < res.length; i++) {
                        getStudent(res[i]).then(res => {
                            studentsArr.push(res);
                            this.setState({ students: studentsArr });
                        });
                    }
                }
                else {
                    this.setState({ students: [res]});
                }



            });
        })





    }

    renderCards(students) {
        // var studentArr = [];
        // for (var item in students) {
        //     //console.log("ITEM: " + item + ", " + students[item]);
        //     //pass in {students[item], all student info} - from database
        //     studentArr.push(students[item]);
        // }

        // console.log("CURRENT USER: " + JSON.stringify(this.state.data));
        //
        // return studentArr.map((student) => {
        //     return <Card title={`Your student: ${student}`}>
        //         <Button
        //             title={`Message ${student}`}
        //             onPress={() => this.props.navigation.navigate('Messaging', { otherPerson: student, currentUser: this.state.data} )}
        //         >
        //
        //
        //         </Button>
        //
        //     </Card>
        // })

        if (!Array.isArray(students)) {
          return null;
        }

        // FOR EMPTY STATE FOR TUTOR
        if (students.length === 0 || students[0].data === null) {
          return <Card title={'No Students Yet'}>
              <Button
                  buttonStyle={styles.buttonStyle}
                  title={'Select a Student'}
                  onPress={() => this.props.navigation.navigate('SelectStudent')}
              />

          </Card>
        }

        return students.map((student) => {
            return <Card title={`Your student: ${student.data.studentName}`}>
                <Button
                    buttonStyle={styles.buttonStyle}
                    title={`Message ${student.data.studentName}`}
                    onPress={() => this.props.navigation.navigate('Messaging', { title: student.data.studentName, otherPersonId: student.id, currentUserId: this.state.currentUserId, otherPersonName: student.data.studentName} )}
                />

            </Card>
        })
    }


    render() {
        return(
            <View>

                {this.renderCards(this.state.students)}


            </View>
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


export default TutorHome;
