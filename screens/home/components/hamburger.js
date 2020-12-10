import React, {Component} from 'react';
import {Animated, Dimensions, Text, View, TouchableOpacity, Image} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';


class Hamburger extends Component {

    constructor() {
      super()
      this.state = {position: new Animated.Value(-Dimensions.get('window').height*0.125)}
      this.end = Dimensions.get('window').height*0.1
    }

    startAnimation = () => {
      Animated.timing(this.state.position, {
        toValue: this.end,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        if (this.end == Dimensions.get('window').height*0.1) {
          this.end = -Dimensions.get('window').height*0.125
          this.setState({position: new Animated.Value(Dimensions.get('window').height*0.1)})
        }
        else {
          this.end = Dimensions.get('window').height*0.1
          this.setState({position: new Animated.Value(-Dimensions.get('window').height*0.125)})
        }
      });
    }

    render() {
      const transformStyle = {
        transform : [{
          translateY : this.state.position,
        }]
      }

        return(
          <TouchableOpacity style={{width: '15%',
                                    height: '50%',
                                    backgroundColor: '#07121B',
                                    marginTop: getStatusBarHeight(),
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    zIndex: 5}}
                            onPress={() => {}}>
            <Image source={require('../../../assets/hamburgerIcon.png')}
                   style={{width:'70%', height: '70%', marginLeft: '40%', resizeMode: 'contain'}}>
            </Image>
            <Animated.View style={[{width: '30%',
                          height: '225%',
                          position: 'absolute',
                          left: 0,
                          backgroundColor: '#07121B',
                          zIndex: 3},
                          transformStyle
                        ]}>
              <TouchableOpacity style={{width: '100%',
                                        flex: 1,
                                        borderLeft: 1,
                                        backgroundColor: '#07121B',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderWidth: 3,
                                        borderColor: '#000000'}}
                                onPress={() => {this.props.openDailyPrep()
                                                this.startAnimation()}}>
                <Text style={{color: '#AAAAAA', fontSize: 20}}
                      adjustsFontSizeToFit
                      numberOfLines={1}>DAILY PREP</Text>
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
                                onPress={() => {this.props.openInventory()
                                                this.startAnimation()}}>
                <Text style={{color: '#AAAAAA', fontSize: 20}}
                      adjustsFontSizeToFit
                      numberOfLines={1}>INVENTORY</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{width: '100%',
                                        flex: 1,
                                        borderLeft: 1,
                                        backgroundColor: '#07121B',
                                        alignItems: 'center',
                                        justifyContent: 'center'}}
                                onPress={() => {this.props.openReports()
                                                this.startAnimation()}}>
                <Text style={{color: '#AAAAAA', fontSize: 20}}
                      adjustsFontSizeToFit
                      numberOfLines={1}>REPORTS</Text>
              </TouchableOpacity>
            </Animated.View>
          </TouchableOpacity>
        );
    }
}

export default Hamburger
