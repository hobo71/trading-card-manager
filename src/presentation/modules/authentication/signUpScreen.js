// @flow strict

import React, { Component } from 'react';
import type { User } from 'react-native-firebase';
import I18n from 'react-native-i18n';
import { Navigator } from '../../navigator';
import { signUpAction, selectUser } from '../../../domain/redux/ducks/user';
import type { StateType } from '../../../domain/redux/types';
import { connectReduxAndNavigator } from '../shared/hoc/screenHOC';
import { EmailAndPasswordForm } from './presentational/emailAndPasswordForm';
import { GoBackToSignInFooter } from './presentational/goBackToSignInFooter';

type PropsTypes = {
  user: ?User,
  redirectTo: string,
  navigator: Navigator,
  signUpUser: (string, string) => void,
};

export class SignUpContainer extends Component<PropsTypes> {
  signUp = async (email: string, password: string): Promise<void> => {
    await this.props.signUpUser(email, password);
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
