/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View, FlatList, TouchableOpacity
} from 'react-native';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};

const DATA = {
    items: [
        {
            key: '1',
            title: 'Learn math'
        },
        {
            key: '2',
            title: 'Learn reading'
        },
        {
            key: '3',
            title: 'Learn math: fractions and long division'
        }
    ]
};



class LearningPlanItem extends Component {

    state = {
        toggle: false
    }


    render() {
        return(
            <TouchableOpacity style={[this.props.style, this.state.toggle && styles.learningPlanViewOff]} onPress={() => this.setState({ toggle: !this.state.toggle })}>
                <Text style={[this.props.textStyle, this.state.toggle && this.props.textStyleOff]}>{('\u2022 ' + this.props.children)}</Text>
            </TouchableOpacity>
        );
    }
}

const LearningPlanView = (props) => {

    return (
        <View style={props.viewStyle}>
            <Text style={props.titleStyle}>Learning Plan</Text>
            <FlatList
                data={DATA.items}
                renderItem={({item}) => <LearningPlanItem style={styles.learningPlanItem} textStyle={styles.learningPlanItemText} textStyleOff={styles.learningPlanItemTextOff}>{item.title}</LearningPlanItem>}
            />
        </View>


    );
};

export default class LearningPlan extends Component<Props> {
    render() {
        return (
            <LearningPlanView
                viewStyle={styles.learningPlan}
                titleStyle={styles.learningPlanTitle}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ff1cb3',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },

    learningPlan: {
        backgroundColor: '#0093ff',
        height: '100%',

    },

    learningPlanTitle: {
        textAlign: 'center',
        marginTop: 30,
        fontSize: 40,
        color: 'white',
    },

    learningPlanItem: {
        marginTop: 20,
        padding: 15,
        borderWidth: 2,
        borderColor: 'white',
        backgroundColor: '#5fbbff',
        borderRadius: 10,
        marginLeft: 10,
        marginRight: 10,
    },

    learningPlanItemText: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'Arial',
        textDecorationLine: 'none'
    },

    learningPlanItemTextOff: {
        color: 'white',
        fontFamily: 'Arial',
        textDecorationLine:'line-through',
        // lineHeight: 25,
    },

    learningPlanViewOff: {
        backgroundColor: '#8ba3b4',
        // paddingBottom: 6,
    }
});