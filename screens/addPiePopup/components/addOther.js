import React, {Component} from 'react';
import {View, Text, Animated, TextInput, TouchableOpacity, Keyboard} from 'react-native';

class AddOther extends Component {
  constructor() {
    super()
    this.pieName = '\n'
    this.first = 0;
  }

  componentDidMount() {
    this.first = 1;
  }

  render() {
    const wrapperStyle = {height: '100%',
                          width: '100%',
                          alignItems: 'center',
                          position: 'absolute',
                          top: 0,
                          display: 'none',
                          zIndex: 0,
                          backgroundColor: 'rgba(255,255,255,0.8)'}
    const alertStyle = {height: '20%',
                        width: '80%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'absolute',
                        top: '20%',
                        display: 'flex',
                        backgroundColor: 'white',
                        borderWidth: 1,
                        borderColor: 'black'}
    const textStyle = {height: '20%',
                       width: '80%',
                       backgroundColor: '#FCFCFC',
                       borderColor: '#CCCCCC',
                       borderWidth: 1,
                       color: 'black'}
    const addPieStyle = {height: '60%',
                         width: '70%',
                         backgroundColor: '#FAFAFA',
                         alignItems: 'center',
                         justifyContent: 'center'}
    const addPieText = {color: '#DDDDDD'}
    if (this.pieName == '' || this.pieName =='\n') {
      addPieStyle['backgroundColor'] = '#FAFAFA';
      addPieText['color'] = '#DDDDDD';
    }
    else {
      addPieStyle['backgroundColor'] = '#0073ff';
      addPieText['color'] = '#FFFFFF';
    }
    const opacity = new Animated.Value(0);
    const fadeIn = () => {
      if (this.pieName == '\n') {
        Animated.timing(opacity, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }).start();
      }
      else {
        opacity.setValue(1);
      }
    }

    if(this.props.show) {
      wrapperStyle['display'] = 'flex';
      wrapperStyle['zIndex'] = 20;
      fadeIn();
    }
    else {
      wrapperStyle['display'] = 'none';
      wrapperStyle['zIndex'] = 0;
      opacity.setValue(0);
    }

    return (
      <View style={wrapperStyle}>
        <Animated.View style={[alertStyle, {opacity: opacity}]}
        >
          <TextInput
            style={textStyle}
            ref={'otherPieInput'}
            placeholder={'Other pie name\n'}
            clearButtonMode='while-editing'
            textAlign='center'
            onChangeText={(text) => {
              this.pieName = text
              this.forceUpdate()}}
          />
          <View style={{width: '80%', height: '30%', flexDirection: 'row'}}>
            <View style={{height: '100%', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <TouchableOpacity style={{height: '60%', width: '70%', backgroundColor: '#EEEEEE', alignItems: 'center', justifyContent: 'center'}}
                                onPress={() => {
                                  this.props.updateCurrent('none');
                                  this.pieName = '\n';
                                  Keyboard.dismiss();
                                  this.refs.otherPieInput.clear();
                                }}>
                <Text>CANCEL</Text>
              </TouchableOpacity>
            </View>
            <View style={{height: '100%', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <TouchableOpacity style={addPieStyle}
                                onPress={() => {
                                  if(this.pieName!= '' && this.pieName != '\n' && this.pieName.trim()) {
                                    Keyboard.dismiss();
                                    this.props.updateOther(this.pieName);
                                    this.props.updateCurrent(this.pieName);
                                    this.pieName = '\n';
                                    this.props.updateList(this.props.returnList);
                                    this.refs.otherPieInput.clear();
                                  }
                                }}>
                <Text style={addPieText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </View>
    );
  }
}


export default AddOther
