// @flow strict

import { Navigation } from 'react-native-navigation';
import { createReactNavigationComponent, createStackLayout } from './helpers';
import { Screen } from './screens';

type OpenObjectType = {};

export class Navigator {
  componentId: string;

  constructor(componentId: string) {
    this.componentId = componentId;
  }

  navigateBack = () => {
    Navigation.pop(this.componentId);
  };

  navigateTo = (name: string, passProps: ?OpenObjectType) => {
    Navigation.push(
      this.componentId,
      createReactNavigationComponent(name, passProps),
    );
  };

  dismissModal = () => {
    Navigation.dismissModal(this.componentId);
  };

  pushToRoot = (route: string, passProps: ?{}) => {
    Navigation.popToRoot(this.componentId);
    this.navigateTo(route, passProps);
  };

  static showModal = (
    screen: Screen,
    title: string,
    passProps: ?OpenObjectType,
  ) => {
    const options = {
      topBar: {
        title: {
          text: title,
        },
      },
    };

    Navigation.showModal(
      createStackLayout([
        createReactNavigationComponent(screen.route, passProps, options),
      ]),
    );
  };
}
