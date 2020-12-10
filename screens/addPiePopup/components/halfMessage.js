import React, {Component} from 'react';
import {Text, View} from 'react-native';

export default class HalfMessage extends Component {
  render() {
    return(
      <View style={{flex: 0.5, width: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FAFAFA'}}>
        <Text style={this.props.display ?
                      {fontSize: 20, color: 'black'} :
                      {color: '#FAFAFA'}}>
          Please select two options
        </Text>
      </View>
    )
  }
}
