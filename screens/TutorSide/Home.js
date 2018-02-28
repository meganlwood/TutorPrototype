import React, { Component } from 'react';
import { View, Text } from 'react-native'
import { Button, Card } from 'react-native-elements';
import {getLoggedInUser, getLoggedInUserPromise, getTutor} from "../../FirebaseManager";


class TutorHome extends Component {

    DATA = {
        //I just did names for now, feel free to add other things you'll need. I passed the param also
        students: [
            {
                name: "Courtney Wood",
            },
            {
                name: "Megan Wood"
            }
        ]
    }

    state={
        data: this.DATA,
    }

    componentDidMount() {
        //call firebase here and setState with the firebase data
        //console.log("LOGGED IN USER: " + getLoggedInUser());
        getLoggedInUserPromise().then(user => {
            var userID = user.uid;
            getTutor(userID).then(res => {
                console.log(JSON.stringify(res));
                var json = JSON.parse(JSON.stringify(res));

                this.setState({data: json})

            });
            }
        );



    }

    renderCards(students) {
        var studentArr = [];
        for (var item in students) {
            console.log("ITEM: " + item + ", " + students[item]);
            //pass in {students[item], all student info} - from database
            studentArr.push(students[item]);
        }

        console.log("CURRENT USER: " + JSON.stringify(this.state.data));

        return studentArr.map((student) => {
            return <Card title={`Your student: ${student}`}>
                <Button
                    title={`Message ${student}`}
                    onPress={() => this.props.navigation.navigate('Messaging', { otherPerson: student, currentUser: this.state.data} )}
                >


                </Button>

            </Card>
        })
    }


    render() {
        return(
            <View>

                {this.renderCards(this.state.data.students)}


            </View>
        );
    }
}

export default TutorHome;