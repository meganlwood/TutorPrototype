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
import { Card, Header, Button } from 'react-native-elements';

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
            title: "Coding",
            list: [
                {
                    item: "Work on strings",
                    complete: true,
                },
                {
                    item: "Work on data types",
                    complete: false,
                }

            ],
            complete: false
        },
        {
            title: "Math",
            list: [
                {
                    item: "Practice basic algebra",
                    complete: true,
                },
                {
                    item: "Learn about variables",
                    complete: false,
                }
            ],
            complete: false
        }
    ]
};



class LearningPlanItem extends Component {

    state = {
        editing: false
    }

    textStyle(item) {
        if (item.complete == true) {
            return {
                textDecorationLine: 'line-through'
            }
        }
    }

    renderCard() {
        if (this.state.editing === true) {
            return(
                <Card title={this.props.lpitem.item.title}>
                    {this.props.lpitem.item.list.map((i, index) => {
                        return (
                            <TouchableOpacity onPress={() => this.props.onItemMarkComplete(index)}>
                                <View style={{ padding: 10, borderWidth: 1, borderRadius: 5, borderColor: 'gray', marginBottom: 2 }}>
                                    <Text style={this.textStyle(i)}>{"- " + i.item}</Text>
                                </View>
                            </TouchableOpacity>
                        );

                    })}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around'}}>
                        <Button title={"Save Plan"} buttonStyle={styles.buttonStyle} onPress={() => this.setState({editing: false})} />
                        <Button title={"Mark Complete"} buttonStyle={styles.buttonStyle} onPress={() => this.props.onCardMarkComplete()}/>
                    </View>

                </Card>
            );
        }

        if (this.props.lpitem.item.complete === false) {
            return(
                <Card title={this.props.lpitem.item.title}>
                    {this.props.lpitem.item.list.map((i) => {
                        return <Text style={this.textStyle(i)} >{"- " + i.item}</Text>
                    })}

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around'}}>
                        <Button title={"Edit Plan"} buttonStyle={styles.buttonStyle} onPress={() => this.setState({editing: true})}/>
                        <Button title={"Mark Complete"} buttonStyle={styles.buttonStyle} onPress={() => this.props.onCardMarkComplete()}/>
                    </View>
                </Card>
            );
        }
        else {
            return(
                <Card title={this.props.lpitem.item.title} containerStyle={{ backgroundColor: 'lightgray'}}>
                    {this.props.lpitem.item.list.map((i) => {
                        return <Text style={this.textStyle(i)}>{"- " + i.item}</Text>
                    })}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around'}}>
                        {/*<Button title={"Complete"} buttonStyle={styles.buttonStyle} onPress={() => this.props.onCardMarkComplete()} />*/}

                    </View>
                </Card>
            );
        }
    }

    render() {
        console.log("ITEM: " + this.props.lpitem);
        return(
            this.renderCard()
        );
    }

}


class LearningPlan extends Component<Props> {

    static navigationOptions = {
        title: 'Learning Plan'
    }

    state = {
        data: DATA,
    }

    onCardMarkComplete(index) {
        console.log(index + "!!!!");
        this.state.data.items[index].complete = true;
        this.setState(this.state);
    }

    onItemMarkComplete(cardIndex, itemIndex) {
        this.state.data.items[cardIndex].list[itemIndex].complete = !this.state.data.items[cardIndex].list[itemIndex].complete;
        this.setState(this.state);
    }



    render() {
        console.log("Rendering: " + this.state.data.items);
        return (
            <View>
                <FlatList
                    data={this.state.data.items}
                    renderItem={(planitem) =>
                        <LearningPlanItem
                            lpitem={planitem}
                            onCardMarkComplete={() => this.onCardMarkComplete(planitem.index)}
                            onItemMarkComplete={(itemIndex) => this.onItemMarkComplete(planitem.index, itemIndex)}
                        />}
                    extraData={this.state}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    buttonStyle: {
        marginTop: 20,
        backgroundColor: '#0093ff',
        // borderRadius: 30,
        width: 150,
        borderRadius: 10
    },
});

export default LearningPlan;