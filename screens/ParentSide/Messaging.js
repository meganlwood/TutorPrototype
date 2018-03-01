import React, { Component } from 'react';
import { GiftedChat, Actions, CustomActions } from 'react-native-gifted-chat'; // 0.3.0
import ImagePicker from 'react-native-image-picker'; // 0.26.7
import {addMessage} from "../../FirebaseManager";
import {getConversation, getMessage, addMessagetoMessages, createConvo, addToConvo} from "../../FirebaseManager";

class Messaging extends Component {


    state = {
        messages: [],
        otherPerson: {},
        currentUser: {},
        conversation: [],
        convoKey: '',
        mounted: false,

    };

    componentWillMount() {
        console.log("~~IN COMPONENT WILL MOUNT, mounted = " + this.state.mounted);
        if (!this.state.mounted) {
            //console.log("PARAMS: " + JSON.stringify(this.props.navigation.state.params));
            this.setState({ otherPerson: this.props.navigation.state.params.otherPerson, currentUser: this.props.navigation.state.params.currentUser});
            //otherPerson is just their name, convert to their
            //pull messages from firebase here
            if (this.props.navigation.state.params.currentUser.haveConvo) {
                getConversation(this.props.navigation.state.params.otherPerson, this.props.navigation.state.params.currentUser.name).then(res => {
                    console.log("conversation: " + JSON.stringify(res));
                    this.setState({conversation: res.messages, convoKey: res.key});
                    console.log("CONVO KEY: " + res.key);
                    var conversation = res.messages;

                    //var messages = [];
                    for (var message in conversation) {
                        console.log("looking at id " + conversation[message]);
                        getMessage(conversation[message]).then(res => {
                            console.log("RECEIVED MESSAGE!!!!!1" + JSON.stringify(res));
                            var text = res.message;
                            var createdAt = res.timestamp;
                            var _id = this.state.messages.length + 1;
                            var to = res.to;
                            //var from = res.from;
                            var userId = -1;
                            var senderName = "";
                            console.log("text: " + text);
                            if (this.state.currentUser.name === to) {
                                userId = 2;
                                senderName = this.state.otherPerson;
                            } //user received a message
                            else {
                                userId = 1;
                                senderName = this.state.currentUser.name;
                            }

                            //sender is 1, receiver is 2
                            //messages.push({_id: _id, text: text, createdAt: createdAt, user: {_id: userId, name: senderName}});
                            //console.log("messages now has length: " + messages.length);
                            this.onSend({_id: _id, text: text, createdAt: createdAt, user: {_id: userId, name: senderName}}, false);
                            //this.setState({messages: messages});
                        });
                    }
                });

            }
            this.setState({mounted: true})
        }


        //if conversation == null, push new one to firebase and return that
        //set the state to be the conversation
/*
        this.setState({
            messages: [
                {
                    _id: 1,
                    text: 'Hi there',
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        avatar: 'https://scontent-lax3-1.xx.fbcdn.net/v/t1.0-9/11755184_10206113377466757_7394161452798419604_n.jpg?oh=6b8c0be2e92d7e17add275dcbacd6ed6&oe=5AE7510F',
                    },

                    image: 'https://scontent-lax3-1.xx.fbcdn.net/v/t1.0-9/11755184_10206113377466757_7394161452798419604_n.jpg?oh=6b8c0be2e92d7e17add275dcbacd6ed6&oe=5AE7510F',
                },
                {
                    _id: 2,
                    text: "Hey yourself!",
                    createdAt: new Date(),
                    user: {
                        _id: 1,
                        name: "Megan",

                    }
                },
                {
                    _id: 3,
                    text: "Hey again",
                    createdAt: new Date(),
                    user: {
                        _id: 1,
                        name: "Megan",

                    }
                }
            ],
        });
*/
    }


    componentDidMount() {
        //this is just to make sure the name came through

        // this.onSend({
        //    _id: 3,
        //    text: `You are messaging with ${this.state.otherPerson}`,
        //    createdAt: new Date(),
        //    system: true,
        // });
    }

    onSend(message = [], newMessage) {
        console.log(message);
        //receiver, sender, convo key
        //add to messages list and append to conversation
        if (newMessage) {
            addMessage(message, this.state.convoKey, this.state.currentUser, this.state.otherPerson );
            /*
            var messageId = '';
            addMessagetoMessages(message).then(res => {
                messageId = res;
            });

            if (this.state.convoKey === '') {
                createConvo(messageId).then(res => {
                    if (res === true) {
                        console.log("successfully created convo");
                    }
                });
            }
            else {
                addToConvo(messageId, this.state.convoKey).then(res => {
                    console.log("RES should be updated array: " + res);
                });
            }
/*
            addMessage(message, this.state.convoKey, this.state.currentUser, this.state.otherPerson).then(res => {
                if (res == true) {
                    console.log("success");
                }
            });
            */
        }


        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, message),
        }));

        console.log(JSON.stringify(this.state));
    }

    pickPhoto() {
        console.log('picking image');

        var options = {
            title: 'Select Avatar',
            customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        ImagePicker.showImagePicker(options, response => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                let source = { uri: response.uri };

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source,
                });
            }
        });
    }

    renderCustomActions(props) {
        const options = {
            'Pick image': props => {
                this.pickPhoto
                // console.log(this.pickPhoto());
            },
            'Action 2': props => {
                alert('option 2');
            },
            Cancel: () => {},
        };
        return <Actions {...props} options={options} />;
    }

    render() {
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={messages => this.onSend(messages, true)}
                user={{
                    _id: 1,
                }}
                bottomOffset={44}
                minInputToolbarHeight={42}
                renderActions={this.renderCustomActions}
            />
        );
    }
}

export default Messaging;
