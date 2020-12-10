import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';

export default class CancelAdd extends Component {
  render() {
    return(
      <View style={{flex:1, width: '100%', backgroundColor: '#FAFAFA', flexDirection: 'row'}}>
        <View style={{flex: 1, alignItems: 'center'}}>
          <TouchableOpacity style={{width: '80%', height: '50%', backgroundColor: '#EEEEEE'}}
                            onPress={this.props.cancelPress}>
            <View style={{width:'100%', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{fontSize: 25}}>CANCEL</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, alignItems: 'center'}}>
          <TouchableOpacity style={this.props.confirmPie}
                            onPress={this.props.confirmPress}>
            <View style={{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
              <Text style={this.props.confirmPieFont}>ADD PIE</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
