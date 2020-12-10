import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import styles from '../styles';

export default class SubmitButton extends Component {
  render() {
    return(
      <View style={{width: '50%', height: '10%', alignItems: 'center', justifyContent: 'center'}}>
        <TouchableOpacity style={{width: '80%',
                                  height: '80%',
                                  backgroundColor: '#0073ff',
                                  alignItems: 'center',
                                  justifyContent: 'center'}}
                           onPress={this.props.onPress}>
          <Text style={{fontSize: 30, color: '#E6E6E6'}}>SUBMIT</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
