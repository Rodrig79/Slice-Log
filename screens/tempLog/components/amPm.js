import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import styles from '../styles';

export default class AmPm extends Component {
  render() {
    return(
      <View style={{width: '40%', height: '10%', flexDirection: 'row'}}>
        <TouchableOpacity style={this.props.time == 11 ?
                                  styles.activeTimeStyle : styles.inactiveTimeStyle}
                          onPress={this.props.amPress}>
          <Text style={this.props.time == 11 ?
                        styles.activeTimeTextStyle : styles.inactiveTimeTextStyle}>
              11 am
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={this.props.time == 5 ?
                                  styles.activeTimeStyle : styles.inactiveTimeStyle}
                          onPress={this.props.pmPress}>
          <Text style={this.props.time == 5 ?
                        styles.activeTimeTextStyle : styles.inactiveTimeTextStyle}>
              5 pm
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}
