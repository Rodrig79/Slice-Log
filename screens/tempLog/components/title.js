import React, {Component} from 'react';
import {Text, View} from 'react-native';
import styles from '../styles';

export default class Title extends Component {
  render() {
    return(
      <View style={styles.title}>
        <Text style={{flex: 1, fontSize: 30}}>Temp Log</Text>
        <Text style={{fontSize: 18}}>   Date: {this.props.date}</Text>
      </View>
    )
  }
}
