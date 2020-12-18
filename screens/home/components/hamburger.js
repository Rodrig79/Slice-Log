import React, {Component} from 'react';
import {Animated, Dimensions, Text, View, TouchableOpacity} from 'react-native';
import styles from '../styles'

class Hamburger extends Component {

  render() {
      var start;
      var end;
      if (this.props.status == 'start') {
        start = -Dimensions.get('window').height/2.1;
        end = -Dimensions.get('window').height/2.1
      }
      else if (this.props.status == 'open') {
        start = -Dimensions.get('window').height/2.1;
        end = -Dimensions.get('window').height/3.9
      }
      else {
        start = -Dimensions.get('window').height/3.9
        end = -Dimensions.get('window').height/2.1;

      }
      var position = new Animated.Value(start);
      Animated.timing(position, {
        toValue: end,
        duration: 200,
        useNativeDriver: true,
      }).start();
      return(
        <Animated.View style={[{width: '30%',
                      height: '21%',
                      position: 'absolute',
                      left: 0,
                      backgroundColor: '#07121B',
                      zIndex: 3},
                      {transform: [{translateY: position.interpolate({
                        inputRange: [0, 100],
                        outputRange: ['0%', '100%'],
                      })}]},
                    ]}>
          <TouchableOpacity style={{width: '100%',
                                    flex: 1,
                                    borderLeft: 1,
                                    backgroundColor: '#07121B',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderWidth: 3,
                                    borderColor: '#000000'}}
                            onPress={() => {this.props.clearPies()}}>
            <Text style={{color: '#AAAAAA', fontSize: 20}} adjustsFontSizeToFit numberOfLines={1}>SUBMIT PIES</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{width: '100%',
                                    flex: 1,
                                    borderLeft: 1,
                                    backgroundColor: '#07121B',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderWidth: 3,
                                    borderColor: '#000000',
                                    borderTopWidth: 0}}
                            onPress={() => {this.props.openTempLog()
                                            this.props.updateHamburger()
                                            this.props.hideNotification()}}>
            <Text style={{color: '#AAAAAA', fontSize: 20}} adjustsFontSizeToFit numberOfLines={1}>TEMP LOG</Text>
            <TouchableOpacity style={this.props.notification == true ?
                                      styles.tempLogActiveNotification : styles.tempLogInactiveNotification}
                              onPress={() => {this.props.openTempLog()
                                              this.props.updateHamburger()
                                              this.props.hideNotification()}}>
              <View style={styles.circle}>
                <Text style={{fontSize: 20, color: 'white'}} adjustsFontSizeToFit numberOfLines={1}>1</Text>
              </View>
            </TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity style={{width: '100%',
                                    flex: 1,
                                    borderLeft: 1,
                                    backgroundColor: '#07121B',
                                    alignItems: 'center',
                                    justifyContent: 'center'}}
                            onPress={() => {this.props.openMenu()
                                            this.props.updateHamburger()}}>
            <Text style={{color: '#AAAAAA', fontSize: 20}} adjustsFontSizeToFit numberOfLines={1}>MENU</Text>
          </TouchableOpacity>
        </Animated.View>
      );
  }
}

export default Hamburger
