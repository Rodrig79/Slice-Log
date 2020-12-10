import React, {Component} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import styles from '../styles'

export default class Reason extends Component {
  render() {
    return(
      <TouchableOpacity style={this.props.currentReason == this.props.reason ?
                                styles.reasonSelected : styles.reasonUnselected}
                        activeOpacity={1}
                        onPress={() => {
                          if (this.props.currentReason != this.props.reason) {
                            this.props.onPress(this.props.reason)
                          }
                          else {
                            this.props.onPress('none')
                          }}}>
        <Text>{this.props.reason.toUpperCase()}</Text>
      </TouchableOpacity>
    )
  }
}
