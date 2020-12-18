import React, {Component} from 'react';
import {Animated, Text, View, TouchableOpacity} from 'react-native';
import styles from '../styles'
import Reason from './reason'
import Number from './number'

class RemovePieOptions extends Component {
  constructor() {
    super()
    this.opacity = new Animated.Value(0)
    this.reason = 'none'
    this.number = 'none'
  }

  render() {
    Animated.timing(this.opacity, {
      toValue: this.props.shown,
      duration: 200,
      useNativeDriver: true
    }).start();

    var style = this.props.shown == 1 ?
                styles.activeRemovePieOptions : styles.inactiveRemovePieOptions

    return (
      <Animated.View style={[style,{opacity: this.opacity}]}>
        <View style={styles.RemovePieOptionsContainer}>
          <View style={{height: '5%',
                        width: '80%',
                        flexDirection: 'row',
                        alignItems: 'flex-end'}}>
            <Text style={{fontSize: 18}}>REASON:</Text>
          </View>
          <View style={{height: '50%',
                        width: '80%',
                        display: 'flex',}}>
            <Reason reason={'Expired'}
                    currentReason={this.reason}
                    onPress={(reason, number=this.number) => {this.reason = reason
                              this.number = number
                              this.forceUpdate()}}>
            </Reason>
            <Reason reason={'Sold Out'}
                    currentReason={this.reason}
                    onPress={(reason, number=this.number) => {this.reason = reason
                              this.number = number
                              this.forceUpdate()}}>
            </Reason>
            <Reason reason={'Looked Bad'}
                    currentReason={this.reason}
                    onPress={(reason, number=this.number) => {this.reason = reason
                              this.number = number
                              this.forceUpdate()}}>
            </Reason>
            <Reason reason={'Contaminated'}
                    currentReason={this.reason}
                    onPress={(reason, number=this.number) => {this.reason = reason
                              this.number = number
                              this.forceUpdate()}}>
            </Reason>
            <Reason reason={'Dropped'}
                    currentReason={this.reason}
                    onPress={(reason, number=this.number) => {this.reason = reason
                              this.number = number
                              this.forceUpdate()}}>
            </Reason>
            <Reason reason={'Closed'}
                    currentReason={this.reason}
                    onPress={(reason, number=this.number) => {this.reason = reason
                              this.number = number
                              this.forceUpdate()}}>
            </Reason>
            <Reason reason={'Accident'}
                    currentReason={this.reason}
                    onPress={(reason, number=this.number) => {this.reason = reason
                              this.number = number
                              this.forceUpdate()}}>
            </Reason>
          </View>
          <View style={{height: '10%',
                        width: '80%',
                        flexDirection: 'row',
                        alignItems: 'flex-end'}}>
            <Text style={{fontSize: 18}}>SLICES WASTED:</Text>
          </View>
          <View style={true ? {height: '20%',
                        width: '80%',}:{}}>
            <View style={{width: '100%',
                          height: '40%',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center'}}>
              <Number number={0}
                      currentNumber={this.number}
                      onPress={(number) => {this.number = number
                                this.forceUpdate()}}>
              </Number>
              <Number number={1}
                      currentNumber={this.number}
                      onPress={(number) => {this.number = number
                                this.forceUpdate()}}>
              </Number>
              <Number number={2}
                      currentNumber={this.number}
                      onPress={(number) => {this.number = number
                                this.forceUpdate()}}>
              </Number>
              <Number number={3}
                      currentNumber={this.number}
                      onPress={(number) => {this.number = number
                                this.forceUpdate()}}>
              </Number>
              <Number number={4}
                      currentNumber={this.number}
                      onPress={(number) => {this.number = number
                                this.forceUpdate()}}>
              </Number>
            </View>
            <View style={{width: '100%',
                          height: '40%',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center'}}>
              <Number number={5}
                      currentNumber={this.number}
                      onPress={(number) => {this.number = number
                                this.forceUpdate()}}>
              </Number>
              <Number number={6}
                      currentNumber={this.number}
                      onPress={(number) => {this.number = number
                                this.forceUpdate()}}>
              </Number>
              <Number number={7}
                      currentNumber={this.number}
                      onPress={(number) => {this.number = number
                                this.forceUpdate()}}>
              </Number>
              <Number number={8}
                      currentNumber={this.number}
                      onPress={(number) => {this.number = number
                                this.forceUpdate()}}>
              </Number>
              <View style={{flex: 1, marginRight: '5%'}}></View>
            </View>
          </View>
          <View style={{height: '10%',
                        width: '80%',
                        alignItems: 'flex-end',
                        flexDirection: 'row'}}>
            <TouchableOpacity style={{flex: 1,
                                 height: '80%',
                                 alignItems: 'center',
                                 justifyContent: 'center',
                                 backgroundColor: '#EEEEEE'}}
                              onPress={() => {
                                this.props.hideRemovePieOptions(true, '', '')
                                this.reason = 'none'
                                this.number = 'none'
                              }}>
              <Text style={{fontSize: 20}}>CANCEL</Text>
            </TouchableOpacity>
            <View style={{flex: 0.2}}></View>
            <TouchableOpacity style={this.reason != 'none' && this.number != 'none' ?
                                     styles.removeActive : styles.removeInactive}
                              onPress={() => {
                                if (this.reason != 'none' && this.number != 'none') {
                                  this.props.hideRemovePieOptions(false, this.reason, this.number)
                                  this.reason = 'none'
                                  this.number = 'none'
                                }
                              }}>
              <Text style={this.reason != 'none' && this.number != 'none' ?
                           styles.removeActiveText : styles.removeInactiveText}>
                REMOVE
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    )
  }
}


export default RemovePieOptions
