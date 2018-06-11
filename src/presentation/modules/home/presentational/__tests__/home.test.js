// @flow strict

import React from 'react';
import { Button, Text } from 'react-native';
import { shallow } from 'enzyme';

import { Home, type PropsType } from '../home';

const props: PropsType = {
  decrement: jest.fn(),
  increment: jest.fn(),
  signOut: jest.fn(),
  instructions: 'Bla bla bla',
  navigateToLogin: jest.fn(),
  counter: 1,
};

describe('<Home />', () => {
  it('should fire callback actions when buttons are clicked', () => {
    const wrapper = shallow(<Home {...props} />);
    const buttons = wrapper.find(Button);

    buttons.at(0).simulate('press');
    expect(props.increment).toHaveBeenCalled();

    buttons.at(1).simulate('press');
    expect(props.decrement).toHaveBeenCalled();
  });
});