// @flow

import _ from 'lodash';
import * as React from 'react';

import { ForgotPasswordScreen } from '../../authentication/forgotPasswordScreen';
import { SignInScreen } from '../../authentication/signInScreen';
import { SignUpScreen } from '../../authentication/signUpScreen';
import { CardDetailsScreen } from '../../cardDetails/cardDetailsScreen';
import { ErrorScreen } from '../../error/errorScreen';
import { HomeScreen } from '../../home/homeScreen';
import { authStateListener } from './hoc/authenticationHOC';
import { LeftSideMenuScreen } from './layout/leftSideMenuScreen';
import { RightSideMenuScreen } from './layout/rightSideMenuScreen';

export class Screen {
  route: string;
  component: React.ComponentType<any>;
  title: ?string;

  constructor(
    route: string,
    component: React.ComponentType<any>,
    title: ?string,
  ) {
    this.component = component;
    this.route = route;
    this.title = title;
  }
}

export const SCREENS: ScreenType = {
  HOME: new Screen(
    'navigation.mtgx.WelcomeScreen',
    authStateListener(HomeScreen),
    'Home',
  ),
  FORGOT_PASSWORD: new Screen(
    'authentication.mtgx.ForgotPassword',
    ForgotPasswordScreen,
  ),
  ERROR: new Screen('navigation.mtgx.ErrorScreen', ErrorScreen),
  SIGN_IN: new Screen('authentication.mtgx.SignInScreen', SignInScreen),
  SIGN_UP: new Screen('authentication.mtgx.SignUpScreen', SignUpScreen),
  LEFT_MENU: new Screen('navigation.left.menu', LeftSideMenuScreen),
  RIGHT_MENU: new Screen('navigation.right.menu', RightSideMenuScreen),
  CARD_DETAILS: new Screen('card.details', CardDetailsScreen, 'Details'),
};

export const NAVIGATION_DRAWER_LINKS = _.filter(
  SCREENS,
  screen => screen.title,
);

export const INITIAL_SCREEN = SCREENS.HOME.route;

export type ScreenType = {
  [string]: Screen,
};
