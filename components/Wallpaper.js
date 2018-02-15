import React, { Component } from 'react';
import { View } from 'react-native';
import Dimensions from 'Dimensions';
import PropTypes from 'prop-types';

import {
	StyleSheet,
	Image,
    ImageBackground
} from 'react-native';

import bgSrc from '../../TutorPrototype/images/wallpaper.png';

export default class Wallpaper extends Component {
	render() {
		return (
			<View style={styles.picture}>
				{this.props.children}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	picture: {
		flex: 1,
		width: null,
		height: null,
		// resizeMode: 'cover',
        backgroundColor: '#0093ff',
	},
});
