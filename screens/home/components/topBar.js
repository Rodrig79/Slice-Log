import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import { Audio } from 'expo-av';
import styles from '../styles';

export default class TopBar extends Component {
  componentDidMount() {
    this.interval = setInterval(async() => {
      const sound = new Audio.Sound()
      if (this.props.notificationSound == true) {
        await sound.loadAsync(require('../../../assets/bellAlert.mp3'))
        await sound.playAsync()
      }
      else {
        await sound.unloadAsync()
      }
    }, 2000)

  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

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
                            onPress={() => {this.props.pressHamburger()
                                            this.props.stopSound()}}>
            <Image source={require('../../../assets/hamburgerIcon.png')}
                   style={{width:'70%', height: '70%', marginLeft: '40%', resizeMode: 'contain'}}>
            </Image>
            <TouchableOpacity style={this.props.notification == true ?
                                      styles.activeNotification : styles.inactiveNotification}
                              onPress={() => {this.props.pressHamburger()
                                              this.props.stopSound()}}>
              <View style={styles.circle}>
                <Text style={{fontSize: 20, color: 'white'}} adjustsFontSizeToFit numberOfLines={1}>1</Text>
              </View>
            </TouchableOpacity>
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
