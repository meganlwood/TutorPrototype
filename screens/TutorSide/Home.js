import React, { Component } from 'react';
import { View, ScrollView, Text, RefreshControl } from 'react-native'
import { Button, Card } from 'react-native-elements';
import {
    getLoggedInUser, getLoggedInUserPromise, getStudent, getStudentsForTutor,
    getTutor
} from "../../FirebaseManager";


class TutorHome extends Component {
    constructor(props) {
      super(props);
      this.handleReRender = this.handleReRender.bind(this);

      this.state={
          students: {},
          currentUserId: {},
          refreshing: false
      }
    }

    handleReRender() {
      this.setState({refreshing: true});
      getLoggedInUserPromise().then(user => {
          var userId = user.uid;
          this.setState({currentUserId: userId});
          getStudentsForTutor(userId).then(res => {
            console.log("RES IS: " + JSON.stringify(res));
              if (res !== "NULL" && res[0] !== "NULL") {
                  var studentsArr = [];
                  for (var i = 0; i < res.length; i++) {
                      getStudent(res[i]).then(res => {
                          studentsArr.push(res);
                          this.setState({ students: studentsArr, refreshing: false });
                      });
                  }
              }
              else {
                  console.log("res is null, starting with empty students");
                  this.setState({ students: [], refreshing: false});
              }
          });
      });
    }

    componentWillMount() {
      this.handleReRender();
    }

    renderCards(students) {

        if (!Array.isArray(students)) {
          return null;
        }
        console.log("STUDENTS: " + JSON.stringify(this.state.students))
        // FOR EMPTY STATE FOR TUTOR
        if (students.length === 0) {
          return <Card title={'No Students Yet'}>
              <Button
                  buttonStyle={styles.buttonStyle}
                  title={'Select a Student'}
                  onPress={() => this.props.navigation.navigate('SelectStudent', { onNavigateBack: this.handleReRender })}
              />

          </Card>
        }

        return students.map((student, i) => {
            return <Card title={`Your student: ${student.data.studentName}`} key={i}>
                <Button
                    buttonStyle={styles.buttonStyle}
                    title={`Message ${student.data.studentName}`}
                    onPress={() => this.props.navigation.navigate('Messaging', { title: student.data.studentName, otherPersonId: student.id, currentUserId: this.state.currentUserId, otherPersonName: student.data.studentName} )}
                />

            </Card>
        })
    }


    render() {
        // this.handleReRender();
        return(
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this.handleReRender}
                />
              }>

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


export default TutorHome;
