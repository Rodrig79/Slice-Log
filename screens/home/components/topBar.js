import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import styles from '../styles';
import Hamburger from './hamburger';


export default class TopBar extends Component {
  render() {
    return(
      <View style={{width: '100%', flex: 1, backgroundColor: '#07121B', flexDirection: 'row', zIndex: 3}}>
        <View style={{width: '100%', height: '100%', backgroundColor: '#07121B', position: 'absolute', top: 0, zIndex: 4}}>
        </View>
        <View style={{width: '100%', height: '100%', zIndex: 5}}>
          <Hamburger clearPies={this.props.clearPies}
                     openMenu={this.props.openMenu}
                     openTempLog={this.props.openTempLog}>
          </Hamburger>
          <TouchableOpacity style={styles.addButton}
                            activeOpacity={0.8}
                            onPress={this.props.pressAdd}>
            <Text style={{color: '#AAAAAA', fontSize: 30}}>ADD PIE</Text>
          </TouchableOpacity>
        </View>
        <Image source={require('../../../assets/iansLogo.png')}
               style={{width: '20%',
                       height: '50%',
                       resizeMode: 'contain',
                       marginTop: getStatusBarHeight(),
                       position: 'absolute',
                       left: '80%',
                       zIndex: 4}}>
        </Image>
      </View>
    )
  }
}
