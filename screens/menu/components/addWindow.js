import React, {Component} from 'react';
import {Text, View, TouchableOpacity, TextInput} from 'react-native';
import styles from '../styles';

export default class AddWindow extends Component {

  render() {
    if (this.props.clearAddText == true) {
      this.refs.addName.clear()
    }
    return(
      <View style={this.props.style}>
          <TextInput style={{width: '96%',
                             height: '10%',
                             position: 'absolute',
                             top: '10%',
                             backgroundColor: '#EEEEEE',
                             fontSize: 20}}
                     ref='addName'
                     textAlign={'center'}
                     placeholder={'Add name'}
                     onChangeText={this.props.onChangeText}/>
          <View style={{width: '100%',
                        height: '10%',
                        position: 'absolute',
                        top: '30%',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center'}}>
            <View style={{width: '33%', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
              <TouchableOpacity style={this.props.addType == 'meat' ?
                                        styles.activeType : styles.inactiveType}
                                activeOpacity={1}
                                onPress={this.props.meatPress}>
                <Text style={{fontSize: 20}}>MEAT</Text>
              </TouchableOpacity>
            </View>
            <View style={{width: '33%', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
              <TouchableOpacity style={this.props.addType == 'veggie' ?
                                        styles.activeType : styles.inactiveType}
                                activeOpacity={1}
                                onPress={this.props.veggiePress}>
                <Text style={{fontSize: 20}}>VEGGIE</Text>
              </TouchableOpacity>
            </View>
            <View style={{width: '33%', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
              <TouchableOpacity style={this.props.addType == 'vegan' ?
                                        styles.activeType : styles.inactiveType}
                                activeOpacity={1}
                                onPress={this.props.veganPress}>
                <Text style={{fontSize: 20}}>VEGAN</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={{width: '30%',
                                    height: '10%',
                                    backgroundColor: '#0073ff',
                                    position: 'absolute',
                                    top: '60%',
                                    alignItems: 'center',
                                    justifyContent: 'center'}}
                             onPress={() => {
                               this.refs.addName.clear()
                               this.props.submitPress()}}>
            <Text style={{fontSize: 25, color: '#E6E6E6'}}>SUBMIT</Text>
          </TouchableOpacity>
      </View>
    )
  }
}
