import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import styles from '../styles';

export default class MenuButtons extends Component {
  render() {
    return(
      <View style={{width: '100%', height: '7%', position: 'absolute', top: '15%', display: 'flex', flexDirection: 'row'}}>
        <View style={{width: '50%', alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity style={this.props.addStyle}
                            onPress={this.props.addPress}>
            <Text style={{fontSize: 25}}>ADD PIE</Text>
          </TouchableOpacity>
        </View>
        <View style={{width: '50%', alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity style={this.props.deleteStyle}
                            onPress={this.props.deletePress}>
            <Text style={{fontSize: 25}}>DELETE PIE</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
