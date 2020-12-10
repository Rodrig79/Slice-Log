import React, {Component} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import styles from '../styles';

export default class ListButton extends Component {
  render() {
    return(
      <TouchableOpacity style={this.props.status ?
                               styles.listSelected : styles.listUnselected}
                        onPress={this.props.onPress}>
        <Text style={{fontSize: 25, textAlign: 'center'}}>{this.props.type}</Text>
      </TouchableOpacity>
    )
  }
}
