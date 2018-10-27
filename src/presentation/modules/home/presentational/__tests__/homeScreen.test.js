// @flow strict

import React from 'react';
import { shallow } from 'enzyme';
import {
  store,
  state,
} from '../../../../../../core/adapters/redux/__mocks__/stateMock';
import {
  counterSelector,
  decrementCounterAction,
  incrementCounterAction,
} from '../../../../../../core/adapters/redux/counterReducer';

import { HomeScreen, HomeContainer } from '../../homeScreen';
import { Home } from '../home';

import { Navigator } from '../../../../navigator';
jest.mock('../../../../navigator');

describe('<HomeScreen />', () => {
  describe('react-redux connection', () => {
    const wrapper = shallow(<HomeScreen store={store} />);

    it('should map state to props', () => {
      expect(wrapper.prop('counter')).toEqual(counterSelector(state));
    });

    it('should map dispatch to props', () => {
      wrapper.prop('increment')();
      expect(store.getActions()).toContainEqual(incrementCounterAction());

      wrapper.prop('decrement')();
      expect(store.getActions()).toContainEqual(decrementCounterAction());
    });
  });
});

describe('<HomeContainer />', () => {
  const props = {
    decrement: jest.fn(),
    increment: jest.fn(),
    logOut: jest.fn(),
    navigator: new Navigator('id'),
    counter: 1,
    user: null,
  };
  const wrapper = shallow(<HomeContainer {...props} />);
  const component = wrapper.find(Home);

  it('should pass props correctly to <Home />', () => {
    const homeProps = component.props();
    expect(homeProps.decrement).toEqual(props.decrement);
    expect(homeProps.increment).toEqual(props.increment);
    expect(homeProps.counter).toEqual(props.counter);
    expect(homeProps.instructions).toBeTruthy();
  });
});
