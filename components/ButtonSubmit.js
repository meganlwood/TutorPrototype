import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import firebase from 'firebase';

import {
	StyleSheet,
	TouchableOpacity,
	Text,
	Animated,
	Easing,
	Image,
	Alert,
	View,
} from 'react-native';
// import { Actions, ActionConst } from 'react-native-router-flux';

import spinner from '../images/loading.gif';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;

export default class ButtonSubmit extends Component {

	componentDidMount() {
        // Initialize Firebase
        const config = {
            apiKey: "AIzaSyBsjlF4FNxju6ise_-PRyyD2ZhPVwyoev4",
            authDomain: "itutoru-ef7e2.firebaseapp.com",
            databaseURL: "https://itutoru-ef7e2.firebaseio.com",
            projectId: "itutoru-ef7e2",
            storageBucket: "itutoru-ef7e2.appspot.com",
            messagingSenderId: "115499384435"
        };

        firebase.initializeApp(config);
	}

	constructor() {
		super();

		this.state = {
			isLoading: false,
		};

		this.buttonAnimated = new Animated.Value(0);
		this.growAnimated = new Animated.Value(0);
		this._onPress = this._onPress.bind(this);
	}

	_onPress() {
		//firebase code
		const { email, password } = this.props;

		if (this.state.isLoading) return;

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
            	console.log("logged in without error")
                var user = firebase.auth().currentUser.uid;
            	console.log(user);
            })

            .catch(() => {
            				firebase.auth().createUserWithEmailAndPassword(email, password);
            				console.log("created user");
                			var userId = firebase.auth().currentUser.uid;
                			firebase.database().ref('users/' + userId).set({
                    			email: email,
                			});
            });



		this.setState({ isLoading: true });
		Animated.timing(
			this.buttonAnimated,
			{
				toValue: 1,
				duration: 200,
				easing: Easing.linear
			}
		).start();

		setTimeout(() => {
			this._onGrow();
		}, 2000);

		setTimeout(() => {
			// Actions.secondScreen();
            this.props.onPress();
			this.setState({ isLoading: false });
			this.buttonAnimated.setValue(0);
			this.growAnimated.setValue(0);
		}, 2300);
	}

	_onGrow() {
		Animated.timing(
			this.growAnimated,
			{
				toValue: 1,
				duration: 200,
				easing: Easing.linear
			}
		).start();
	}

	render() {
		const changeWidth = this.buttonAnimated.interpolate({
	    inputRange: [0, 1],
	    outputRange: [DEVICE_WIDTH - MARGIN, MARGIN]
	  });
	  const changeScale = this.growAnimated.interpolate({
	    inputRange: [0, 1],
	    outputRange: [1, MARGIN]
	  });

		return (
			<View style={styles.container}>
				<Animated.View style={{width: changeWidth}}>
					<TouchableOpacity style={styles.button}
						onPress={this._onPress}
						activeOpacity={1} >
							{this.state.isLoading ?
								<Image source={spinner} style={styles.image} />
								:
								<Text style={styles.text}>Login</Text>
							}
					</TouchableOpacity>
					<Animated.View style={[ styles.circle, {transform: [{scale: changeScale}]} ]} />
				</Animated.View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		top: -95,
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#fbff8b',
		height: MARGIN,
		borderRadius: 20,
		zIndex: 100,
	},
	circle: {
		height: MARGIN,
		width: MARGIN,
		marginTop: -MARGIN,
		borderWidth: 1,
		borderColor: '#ffffff',
		borderRadius: 100,
		alignSelf: 'center',
		zIndex: 99,
		backgroundColor: '#ffffff',
	},
	text: {
		color: 'black',
		backgroundColor: 'transparent',
	},
	image: {
		width: 24,
		height: 24,
	},
});
