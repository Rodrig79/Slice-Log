import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Dimensions} from 'react-native';
import styles from '../../../styles/styles';

class NewPieButton extends Component {

  height = Dimensions.get('window').height/9

  render() {
    return(
      <View style={{width: '33.33%', height: this.height, alignItems: 'center', justifyContent: 'center'}}>
        <TouchableOpacity style={this.props.buttonStyle}
                          activeOpacity={1}
                          onPress={() => {
                            this.props.updateCurrent(this.props.pieName);
                          }}>
          <Text style={{fontSize: 20, textAlign: 'center'}}>{this.props.pieName}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default NewPieButton
