// @flow strict

import React, { Component } from 'react';
import I18n from 'react-native-i18n';
import type { StateType } from 'core';
import { User } from 'core';
import { Navigator } from '../shared/navigation';
import { signUpAction, selectUser } from 'core';
import { SCREENS } from '../shared/navigation/screens';
import { connectReduxAndNavigator } from '../shared/navigation/hoc/screenHOC';
import { EmailAndPasswordForm } from './dumb/emailAndPasswordForm';
import { GoBackToSignInFooter } from './dumb/goBackToSignInFooter';

type PropsTypes = {
  user: ?User,
  redirectTo: string,
  navigator: Navigator,
  signUpUser: (string, string, (Error) => void) => void,
};

export class SignUpContainer extends Component<PropsTypes> {
  signUp = async (email: string, password: string): Promise<void> => {
    const onError = (error: Error) => {
      const title = I18n.t('SIGN_UP/ERROR_TITLE');
      Navigator.showModal(SCREENS.ERROR, title, { error, title });
    };

    await this.props.signUpUser(email, password, onError);
  };

  navigateBack = () => {
    this.props.navigator.navigateBack();
  };

  footer = <GoBackToSignInFooter navigateToSignIn={this.navigateBack} />;

  render() {
    if (this.props.user) {
      this.props.navigator.navigateTo(this.props.redirectTo);
      return null;
    }

    return (
      <EmailAndPasswordForm
        onButtonPress={this.signUp}
        buttonText={I18n.t('SIGN_UP/BUTTON_TEXT')}
        title={I18n.t('SIGN_UP/TITLE')}
        navigateBack={this.navigateBack}
        footer={this.footer}
      />
    );
  }
}

const mapStateToProps = (state: StateType) => ({
  user: selectUser(state),
});

const mapDispatchToProps = {
  signUpUser: signUpAction,
};

export const SignUpScreen = connectReduxAndNavigator(
  mapStateToProps,
  mapDispatchToProps,
)(SignUpContainer);
