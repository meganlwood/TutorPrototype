import React, { Component } from 'react';
import { GiftedChat, Actions, CustomActions } from 'react-native-gifted-chat'; // 0.3.0
import ImagePicker from 'react-native-image-picker'; // 0.26.7
import {addMessage, getConversationFromKey, addMessage2} from "../../FirebaseManager";
import {getConversation, getMessage, addMessagetoMessages, createConvo, addToConvo } from "../../FirebaseManager";
import firebase from 'firebase';

class Messaging extends Component {


    state = {
        messages: [],
        otherPersonId: {},
        currentUserId: {},
        //conversation: [],
        convoKey: '',

    };



    componentWillMount() {




            console.log("COMPONENT WILL MOUNT");

            const { currentUserId, otherPersonId } = this.props.navigation.state.params;

            this.setState({ currentUserId, otherPersonId });

            var arr = [currentUserId, otherPersonId];
            arr.sort();

            var convoKey = arr[0] + arr[1];
            this.setState({ convoKey });

            console.log("CONVO KEY: " + convoKey);

            var ref = this;

            firebase.database().ref('conversations/' + convoKey).on('value', function(snapshot) {
                if (snapshot.val() != null) {
                    var res = snapshot.val();
                    //if (!Array.isArray(res)) res = res.convoKey;
                    for (var i = 0; i < res.length; i++) {
                        getMessage(res[i]).then(res => {

                            var text = res.message;
                            var createdAt = res.timestamp;
                            var _id = ref.state.messages.length + 1;


                            var to = res.to;
                            var userId = -1;
                            var senderName = "";


                            if (ref.state.currentUserId=== to) {
                                userId = 2;
                                senderName = ref.state.otherPersonId;
                            } //user received a message
                            else {
                                userId = 1;
                                senderName = ref.state.currentUserId;
                            }

                            ref.onSend({_id: _id, text: text, createdAt: createdAt, user: {_id: userId, name: senderName}}, false);
                        })
                    }
                }
            });

            // getConversationFromKey(convoKey).then(res => {
            //     if (res != null) {
            //         //load all the messages
            //         console.log(res);
            //         //if (!Array.isArray(res)) res = res.convoKey;
            //         console.log("LOADED: " + res + " is array: " + Array.isArray(res));
            //         for (var i = 0; i < res.length; i++) {
            //             console.log("loading the message with id" + res[i]);
            //             getMessage(res[i]).then(res => {
            //                 console.log("GOT THE MESSAGE: " + res);
            //
            //                 var text = res.message;
            //                 var createdAt = res.timestamp;
            //                 var _id = this.state.messages.length + 1;
            //                 var to = res.to;
            //                 var userId = -1;
            //                 var senderName = "";
            //                 if (this.state.currentUserId=== to) {
            //                     userId = 2;
            //                     senderName = this.state.otherPersonId;
            //                 } //user received a message
            //                 else {
            //                     userId = 1;
            //                     senderName = this.state.currentUserId;
            //                 }
            //
            //                 this.onSend({_id: _id, text: text, createdAt: createdAt, user: {_id: userId, name: senderName}}, false);
            //             })
            //         }
            //     }
            // })





            // this.setState({ otherPerson: this.props.navigation.state.params.otherPerson, currentUser: this.props.navigation.state.params.currentUser});
            // //otherPerson is just their name, convert to their
            // //pull messages from firebase here
            // //if (this.props.navigation.state.params.currentUser.haveConvo) {
            //     getConversation(this.props.navigation.state.params.otherPerson, this.props.navigation.state.params.currentUser.name).then(res => {
            //         this.setState({conversation: res.messages, convoKey: res.key});
            //         var conversation = res.messages;
            //
            //         //var messages = [];
            //         for (var message in conversation) {
            //             console.log("looking at id " + conversation[message]);
            //             getMessage(conversation[message]).then(res => {
            //                 var text = res.message;
            //                 var createdAt = res.timestamp;
            //                 var _id = this.state.messages.length + 1;
            //                 var to = res.to;
            //                 //var from = res.from;
            //                 var userId = -1;
            //                 var senderName = "";
            //                 console.log("text: " + text);
            //                 if (this.state.currentUser.name === to) {
            //                     userId = 2;
            //                     senderName = this.state.otherPerson;
            //                 } //user received a message
            //                 else {
            //                     userId = 1;
            //                     senderName = this.state.currentUser.name;
            //                 }
            //
            //                 this.onSend({_id: _id, text: text, createdAt: createdAt, user: {_id: userId, name: senderName}}, false);
            //             });
            //         }
            //     });
            //
            // //}


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


    onSend(message = [], addToDatabase) {
        console.log("called on send");
        console.log(message);
        //receiver, sender, convo key
        //add to messages list and append to conversation
        //if (newMessage) {


            //addMessage(message, this.state.convoKey, this.state.currentUser, this.state.otherPerson );

            if (Array.isArray(message)) message = message[0];

            console.log(message);


            var from = message.user._id === 1 ? this.state.currentUserId : this.state.otherPersonId;
            var to = message.user._id === 2 ? this.state.currentUserId : this.state.otherPersonId;

            if (addToDatabase) addMessage2(this.state.convoKey, message, from, to);

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
        //}


        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, message),
        }));

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
