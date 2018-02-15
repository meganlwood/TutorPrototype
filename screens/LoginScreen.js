
import React, { Component, PropTypes } from 'react';
import Logo from './../components/Logo';
import Form from './../components/Form';
import Wallpaper from './../components/Wallpaper';
import ButtonSubmit from './../components/ButtonSubmit';
import SignupSection from './../components/SignupSection';

export default class LoginScreen extends Component {



    render() {
        return (
            <Wallpaper>
                <Logo />
                <Form />
                <SignupSection/>
                <ButtonSubmit onPress={() => this.props.navigation.navigate('After')}/>
            </Wallpaper>
        );
    }
}
