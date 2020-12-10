import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import styles from '../styles';

export default class TopBar extends Component {
  render() {
    return(
      <View style={{width: '100%', flex: 1, backgroundColor: '#07121B', flexDirection: 'row', zIndex: 3}}>

        <View style={{width: '100%', height: '100%', backgroundColor: '#07121B', position: 'absolute', top: 0, zIndex: 4}}>
        </View>
        <View style={{width: '100%', zIndex: 5}}>
          <TouchableOpacity style={{width: '15%',
                                    height: '50%',
                                    backgroundColor: '#07121B',
                                    marginTop: getStatusBarHeight(),
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    zIndex: 5}}
                            onPress={this.props.pressHamburger}>
            <Image source={require('../../../assets/hamburgerIcon.png')}
                   style={{width:'70%', height: '70%', marginLeft: '40%', resizeMode: 'contain'}}>
            </Image>
          </TouchableOpacity>
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
