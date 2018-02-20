
import React, { Component, PropTypes } from 'react';
import Logo from './../components/Logo';
import Form from './../components/Form';
import Wallpaper from './../components/Wallpaper';
import ButtonSubmit from './../components/ButtonSubmit';
import SignupSection from './../components/SignupSection';

export default class LoginScreen extends Component {

    state = {
        email: '',
        password: '',
    }

    render() {
        return (
            <Wallpaper>
                <Logo />
                <Form
                    onChangeEmail={(text) => {
                        //console.log("Changed state!!" + text);
                        this.setState({ email: text });

                    }}
                    onChangePassword={(text) => this.setState({ password: text })}
                />
                <SignupSection/>
                <ButtonSubmit
                    onPress={() => this.props.navigation.navigate('After')}
                    email={this.state.email}
                    password={this.state.password}
                />
            </Wallpaper>
        );
    }
}
