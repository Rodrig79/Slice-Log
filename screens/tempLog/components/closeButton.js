import React, {Component} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import styles from '../styles';

export default class CloseButton extends Component {
  render() {
    return(
      <View style={styles.closeWrapper}>
        <TouchableOpacity style={styles.closeButton}
                          onPress={this.props.onPress}>
          <Image style={{width: '80%', height: '80%', resizeMode: 'contain'}}
                 source={require('../../../assets/closeIcon.jpg')}>
          </Image>
        </TouchableOpacity>
      </View>
    )
  }
}
