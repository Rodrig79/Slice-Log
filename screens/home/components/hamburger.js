import React, {Component} from 'react';
import {Animated, Dimensions, Text, View, TouchableOpacity, Image, Platform} from 'react-native';


class Hamburger extends Component {

    constructor() {
      super()
      this.state = {position: new Animated.Value(-Dimensions.get('window').height*0.05)}
      this.end = Dimensions.get('window').height*0.17
    }

    startAnimation = () => {
      Animated.timing(this.state.position, {
        toValue: this.end,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        if (this.end == Dimensions.get('window').height*0.17) {
          this.end = -Dimensions.get('window').height*0.05
          this.setState({position: new Animated.Value(Dimensions.get('window').height*0.17)})
        }
        else {
          this.end = Dimensions.get('window').height*0.17
          this.setState({position: new Animated.Value(-Dimensions.get('window').height*0.05)})
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
          <View style={{width: '30%',
                        height: '100%',
                        justifyContent: 'center'}}>
            <TouchableOpacity style={{width: '50%',
                                      height: (Platform.OS === 'ios' ? '60%' : '80%'),
                                      position: 'absolute',
                                      bottom: 0,
                                      zIndex: 5}}
                              onPress={this.startAnimation}>
              <Image source={require('../../../assets/hamburgerIcon.png')}
                     style={{width:'70%', height: '70%', marginLeft: '20%', resizeMode: 'contain'}}>
              </Image>
            </TouchableOpacity>
            <View style={{width: '100%', height: '100%', backgroundColor: '#07121B', zIndex: 4, position: 'absolute', top: 0}}/>
            <Animated.View style={[{width: '100%',
                          height: '150%',
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
                                onPress={() => {this.props.clearPies()
                                                this.startAnimation()}}>
                <Text style={{color: '#AAAAAA', fontSize: 20}}
                      adjustsFontSizeToFit
                      numberOfLines={1}>SUBMIT PIES</Text>
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
                                onPress={() => {this.props.openMenu()
                                                this.startAnimation()}}>
                <Text style={{color: '#AAAAAA', fontSize: 20}}
                      adjustsFontSizeToFit
                      numberOfLines={1}>MENU</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{width: '100%',
                                        flex: 1,
                                        borderLeft: 1,
                                        backgroundColor: '#07121B',
                                        alignItems: 'center',
                                        justifyContent: 'center'}}
                                onPress={() => {this.props.openTempLog()
                                                this.startAnimation()}}>
                <Text style={{color: '#AAAAAA', fontSize: 20}}
                      adjustsFontSizeToFit
                      numberOfLines={1}>TEMP LOG</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        );
    }
}

export default Hamburger
