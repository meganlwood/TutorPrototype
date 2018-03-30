import React from 'react';
import { Text, View, StyleSheet, Image, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import {getLoggedInUser, getUserInfo, signOut} from "../../FirebaseManager";


class SettingsScreen extends React.Component {

    state={
        tutor: {},
        frozen: false
    }

    componentDidMount() {
        // getUserInfo.then(res => this.setState({ tutor: res }));
        // console.log(this.state.tutor);
    }

    render() {

      if (this.state.frozen === false) {
        return (
            <View style={styles.container}>

                <Button
                  title={"Approve Timesheet"}
                  onPress={() => {
                      // TODO approve timesheet in the database
                  }}
                  style={styles.button} />

                <Button
                  title={"Tutor New Students"}
                  onPress={() => {
                    this.props.navigation.navigate('SelectStudent', { onNavigateBack : this.componentDidMount })
                  }}
                  style={styles.button} />

                <Button
                    title={"Sign Out"}
                    onPress={() => signOut().then(res => this.props.navigation.navigate('SignedOut'))}
                    style={styles.button}
                />
            </View>

        );
      } else {
        return(
          <View>
            <Button
                title={"Sign Out"}
                onPress={() => signOut().then(res => this.props.navigation.navigate('SignedOut'))}
                style={styles.button}
            />
          </View>);
      }
    }

}

const styles= StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: '100%',
    },
    button: {
      margin: '2.5%',
    }
});

export default SettingsScreen;
