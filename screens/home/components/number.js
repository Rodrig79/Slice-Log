import React, {Component} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import styles from '../styles'

export default class Number extends Component {
  render() {
    return(
      <TouchableOpacity style={this.props.currentNumber == this.props.number ?
                               styles.numberSelected : styles.numberUnselected}
                        activeOpacity={1}
                        onPress={() => {
                          if (this.props.currentNumber != this.props.number) {
                            this.props.onPress(this.props.number)
                          }
                          else {
                            this.props.onPress('none')
                          }
                        }}>
        <Text style={{fontSize: 18}}>{this.props.number}</Text>
      </TouchableOpacity>
    )
  }
}
