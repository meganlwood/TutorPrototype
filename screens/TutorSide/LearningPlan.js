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
    View,
    FlatList,
    TouchableOpacity,
    TextInput,
    Button as RNButton,
    AlertIOS,
    KeyboardAvoidingView
} from 'react-native';
// import Button as RNButton from 'react-native';
import { Card, Header, Button } from 'react-native-elements';
import FlatListWithEnd from 'react-native-flatlist-with-end'
import CardWithTextInput from '../../components/CardWithTextInput';
import CheckBox from '../../components/CheckBox';

type Props = {};

const DATA = {
    items: [
        {
            index: 0,
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
            index: 1,
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
        editing: false,
        text: '',
        // titleText: '',
    }

    textStyle(item) {
        if (item.complete) {
            return {
                textDecorationLine: 'line-through'
            }
        }
    }

    onPressChangeTitle() {
        // AlertIOS.prompt(
        //     'Enter new title',
        //     null,
        //     text => this.props.onChangeTitle(text)
        // )

    }

    renderCard(item) {

        if (this.state.editing) {
            return(
                <CardWithTextInput isTextInput={true} headerText={item.title} onChangeHeaderText={(text) => this.props.onChangeTitle(text)}>
                    {item.list.map((i, index) => {
                        return (
                                <View style={{ padding: 5, borderWidth: 1, borderRadius: 5, borderColor: 'gray', marginBottom: 2, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <CheckBox onPress={() => this.props.onItemMarkComplete(index)} checked={i.complete} text={i.item}/>
                                    <Button
                                        title={"Del"}
                                        buttonStyle={
                                            [styles.littleButtonStyle, {
                                                backgroundColor: 'red',
                                                marginRight: 5
                                            }]
                                        }
                                        onPress={() => this.props.onRemoveTask(index)}
                                    />
                                </View>
                        );

                    })}
                    <View style={{ padding: 10, borderWidth: 1, borderRadius: 5, borderColor: 'gray', marginBottom: 2, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TextInput
                            onChangeText={(text) => this.setState({ text: text })}
                            value={this.state.text}
                            placeholder={"New item..."}
                            style={{ width: 200}}
                        />
                        <Button
                            title={"Add"}
                            buttonStyle={styles.littleButtonStyle}
                            onPress={() => {
                                this.props.onAddTask(this.state.text);
                                this.setState({ text: '' })
                            }}
                        />
                    </View>

                    {/*<Button title={"Change Title"} buttonStyle={[styles.buttonStyle, { alignSelf: 'center', width: 300 }]} onPress={() => this.onPressChangeTitle()}/>*/}

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around'}}>
                        <Button title={"Save Plan"} buttonStyle={[styles.buttonStyle]} onPress={() => {
                            console.log("PROPS!!!! " + JSON.stringify(this.props));
                            this.setState({editing: false});
                            this.props.doneEditing();
                        }} />
                        <Button title={"Mark Complete"} buttonStyle={[styles.buttonStyle] } onPress={() => this.props.onCardMarkComplete()}/>
                    </View>

                </CardWithTextInput>
            );
        }

        if (item.complete === false) {
            return(
                <CardWithTextInput headerText={item.title}>
                    {item.list.map((i) => {
                        return <CheckBox disabled={true} text={i.item} checked={i.complete}/>
                    })}

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around'}}>
                        <Button title={"Edit Plan"} buttonStyle={styles.buttonStyle} onPress={() => this.setState({editing: true})}/>
                        <Button title={"Mark Complete"} buttonStyle={styles.buttonStyle} onPress={() => this.props.onCardMarkComplete()}/>
                    </View>
                </CardWithTextInput>
            );
        }
        else {
            return (
                <CardWithTextInput headerText={item.title} containerStyle={{backgroundColor: 'lightgray'}}>
                    {item.list.map((i) => {
                        return <CheckBox disabled={true} text={i.item} checked={i.complete}/>
                    })}
                    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                        {/*<Button title={"Complete"} buttonStyle={styles.buttonStyle} onPress={() => this.props.onCardMarkComplete()} />*/}

                    </View>
                </CardWithTextInput>
            );
        }
    }

    render() {
        console.log("ITEM: " + this.props.lpitem);
        if (this.props.edit) this.state.editing = true;

        return(
            this.renderCard(this.props.lpitem.item)
        );
    }

}


class LearningPlan extends Component<Props> {


    state = {
        data: DATA,
        nextIndex: DATA.items.length,
        currentlyEditing: null,
    }

    addCard() {
        console.log("add card!");
        this.state.data.items.push({
            title: "New Card",
            list: [],
            complete: false,
            index: this.state.nextIndex
        })
        this.state.currentlyEditing = this.state.nextIndex;
        this.state.nextIndex = this.state.nextIndex + 1;
        this.setState(this.state);
    }


    onCardMarkComplete(index) {
        this.state.data.items[index].complete = true;
        this.setState(this.state);
    }

    onItemMarkComplete(cardIndex, itemIndex) {
        this.state.data.items[cardIndex].list[itemIndex].complete = !this.state.data.items[cardIndex].list[itemIndex].complete;
        this.setState(this.state);
    }

    onAddTask(cardIndex, task) {
        this.state.data.items[cardIndex].list.push({
            item: task,
            complete: false
        })
        this.setState(this.state);
    }

    onRemoveTask(cardIndex, index) {
        this.state.data.items[cardIndex].list.splice(index, 1);
        this.setState(this.state);
    }

    onChangeTitle(index, title) {
        this.state.data.items[index].title = title;
        this.setState(this.state);
    }

    render() {
        console.log("Rendering: " + this.state.data.items);
        return (
            <KeyboardAvoidingView behavior={"position"} keyboardVerticalOffset={30}>
                <FlatListWithEnd
                    data={this.state.data.items}
                    renderItem={(item) => {
                        return(
                            <LearningPlanItem
                                lpitem={item}
                                onCardMarkComplete={() => {
                                    this.onCardMarkComplete(item.item.index);
                                }}
                                onItemMarkComplete={(itemIndex) => this.onItemMarkComplete(item.item.index, itemIndex)}
                                onAddTask={(task) => this.onAddTask(item.item.index, task)}
                                onRemoveTask={(index) => this.onRemoveTask(item.item.index, index)}
                                edit={
                                    this.state.currentlyEditing === item.item.index ? true : false
                                }
                                doneEditing={() => this.setState({ currentlyEditing: null })}
                                onChangeTitle={(title) => this.onChangeTitle(item.item.index, title)}
                            />
                        );

                    }
                        }
                    extraData={this.state}
                    renderEndComponent={() => {
                        return(
                            <Button title={"New Card"} buttonStyle={[styles.buttonStyle, { alignSelf: 'center', marginBottom: 20 }]} onPress={() => this.addCard()} ></Button>
                        );
                    }
                    }
                />

            </KeyboardAvoidingView>
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
    littleButtonStyle: {
        backgroundColor: '#0093ff',
        width: 55,
        height: 30,
        borderRadius: 5
    }
});

export default LearningPlan;