import React, {Component} from 'react';
import {Text, View, TextInput, Dimensions} from 'react-native';
import styles from '../../../styles/styles';
import * as SecureStore from 'expo-secure-store';

class Temp extends Component {
  constructor() {
    super();
    this.height = Dimensions.get('window').height/10
  }

  render() {
    var backgroundColor = this.props.editable == true ? 'white' : '#EEEEEE'
    var textColor = this.props.editable == true ? 'black' : '#777777'
    if (this.props.clear == true) {
      this.refs.textInput.clear()
    }
    return(
      <View style={{width: '100%', height: this.height, display: 'flex', flexDirection: 'row'}}>
        <View style={{flex: 1.5, height: '50%', justifyContent: 'center', paddingRight: '15%'}}>
          <Text style={{fontSize: 20, textAlign: 'right', alignSelf: 'stretch'}}>{this.props.name}:</Text>
        </View>
        <View style={{flex: 1, height: '50%', flexDirection: 'row', alignItems: 'center'}}>
          <TextInput style={{width: '50%',
                             height: '80%',
                             borderWidth: 1,
                             borderColor: '#BBBBBB',
                             fontSize: 20,
                             color: textColor,
                             backgroundColor: backgroundColor}}
                     ref={'textInput'}
                     value={this.props.value}
                     editable={this.props.editable}
                     textAlign='center'
                     keyboardType='decimal-pad'
                     onChangeText={(text) => this.props.setTemp(this.props.name, text)}>
          </TextInput>
          <Text style={{fontSize: 20}}>  {'\u00B0'}F</Text>
        </View>
      </View>
    )
  }
}

export default Temp
