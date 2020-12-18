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
                            if (this.props.reason == 'Sold Out') {
                              this.props.onPress(this.props.reason, 0)
                            }
                            else if (this.props.reason == 'Accident') {
                              this.props.onPress(this.props.reason, 'N/A')
                            }
                            else if (this.props.currentReason == 'Sold Out' || 'Accident'){
                              this.props.onPress(this.props.reason, 'none')
                            }
                            else {
                              this.props.onPress(this.props.reason)
                            }
                          }
                          else {
                            if (this.props.reason == 'Sold Out') {
                              this.props.onPress('none', 'none')
                            }
                            else {
                              this.props.onPress('none')
                            }
                          }}}>
        <Text>{this.props.reason.toUpperCase()}</Text>
      </TouchableOpacity>
    )
  }
}
