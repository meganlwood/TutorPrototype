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
          refreshing: false,
          frozen: false,
      }
    }

    handleReRender() {
      this.setState({refreshing: true});
      getLoggedInUserPromise().then(user => {
          var userId = user.uid;
          this.setState({currentUserId: userId});
          getStudentsForTutor(userId).then(res => {
            console.log("res is: " + JSON.stringify(res))
              if (res !== "NULL" && res[0] !== "NULL") {
                res = Array.from(res);
                  var studentsArr = [];
                  for (var i = 0; i < res.length; i++) {
                      getStudent(res[i]).then(res => {
                          studentsArr.push(res);
                          this.setState({ students: studentsArr, refreshing: false });
                      });
                  }
              }
              else {
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
          console.log("student: " + JSON.stringify(student));
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
      if (this.state.frozen === true) {
        return (<View style={styles.emptyStyle}>
          <Text style={{fontStyle: 'italic', textAlign: 'center'}}>Once you are approved by our team, you will be able to choose students to tutor and see their info here!</Text>
          </View>)
      }

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
    emptyStyle: {
      marginLeft: '10%',
      marginRight: '10%',
      justifyContent: 'center',
      marginTop: '50%',
    }
}


export default TutorHome;
