// @flow strict

import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import { AppStatusBar } from '../theme/components/appStatusBar';
import { styles } from './styles/loginForm.style';

type Props = {
  title: string,
};

export const FormHeader = (props: Props) => (
  <View>
    <AppStatusBar />
    <View style={styles.header}>
      <Text style={styles.title}>{props.title}</Text>
    </View>
  </View>
);

FormHeader.propTypes = {
  title: PropTypes.string.isRequired,
};
