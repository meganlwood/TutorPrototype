import React, { Component } from 'react';
import { View, Text } from 'react-native'
import { Button, Card } from 'react-native-elements';



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
    }

    renderCards(students) {
        return students.map((student) => {
            return <Card title={`Your student: ${student.name}`}>
                <Button
                    title={`Message ${student.name}`}
                    onPress={() => this.props.navigation.navigate('Messaging', { otherPerson: student} )}
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