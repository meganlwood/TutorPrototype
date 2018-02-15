import React, { Component } from 'react';
import { GiftedChat, Actions, CustomActions } from 'react-native-gifted-chat'; // 0.3.0
import ImagePicker from 'react-native-image-picker'; // 0.26.7

class Messaging extends Component {
    static navigationOptions = {
        title: 'Casey',
    };

    state = {
        messages: [],
    };

    componentWillMount() {
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
            ],
        });
    }

    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
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
                onSend={messages => this.onSend(messages)}
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
