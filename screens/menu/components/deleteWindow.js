import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import styles from '../styles';
import DeleteMenuList from './deleteMenuList';

export default class DeleteWindow extends Component {

  render() {
    return(
      <View style={this.props.style}>
        <DeleteMenuList updateDeleteName={(name) => this.props.updateDeleteName(name)}/>
        <View style={{width: '100%', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity style={{width: '33%',
                                    height: '40%',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: '#db3107'}}
                             onPress={this.props.deletePress}>
            <Text style={{fontSize: 25, color: '#E6E6E6'}}>DELETE</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
