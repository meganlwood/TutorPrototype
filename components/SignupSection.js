import React, { Component } from 'react';
import Dimensions from 'Dimensions';
import PropTypes from 'prop-types';

import {
	StyleSheet,
	View,
	Text,
	Button,
	TouchableOpacity
} from 'react-native';


export default class SignupSection extends Component {



	render() {
        console.log(this.props);

        return (
			<View style={styles.container}>
				<TouchableOpacity onPress={() => console.log("Pressed")}><Text>HELLO</Text></TouchableOpacity>
				<Button style={styles.text} title={"Forgot Password?"} onPress={() => console.log("Forgot possword")}/>
			</View>
		);
	}
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		top: 65,
		width: DEVICE_WIDTH,
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	text: {
		color: 'white',
		// backgroundColor: 'transparent',
	},
});
