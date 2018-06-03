// @flow strict

import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';
import { navigateTo } from '../../navigation';
import { SCREENS } from '../../navigation/screens';

import {
  incrementCounter,
  decrementCounter,
  selectCounter,
} from '../../redux/ducks/counter';
import { Home } from './Home';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {
  decrement: () => void,
  increment: () => void,
  counter: number,
};

export class HomeContainer extends Component<Props> {
  navigateToLogin = () => {
    // $FlowIgnoreNavigationComponentId
    navigateTo(SCREENS.SIGN_IN, this.props.componentId);
  };

  render() {
    return (
      <Home
        increment={this.props.increment}
        decrement={this.props.decrement}
        counter={this.props.counter}
        navigateToLogin={this.navigateToLogin}
        instructions={instructions}
      />
    );
  }
}

const mapStateToProps = state => ({
  counter: selectCounter(state),
});

const mapDispatchToProps = {
  increment: incrementCounter,
  decrement: decrementCounter,
};

export const HomeScreen = connect(mapStateToProps, mapDispatchToProps)(
  HomeContainer,
);