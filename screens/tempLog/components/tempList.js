import React, {Component} from 'react';
import {Text, View, ScrollView} from 'react-native';
import styles from '../styles';

export default class TempList extends Component {
  render() {
    return(
      <View style={{width: '80%', height: '50%'}}>
        <ScrollView ref='tempList'>
          <View style={{flex: 1, alignItems: 'center', display: 'flex'}}>
            {this.props.tempList}
            <View style={{height: '50%', width: '10%'}}>
              <Text style={{color: 'white'}}>{'\n\n\n\n\n\n\n\n\n\n\n\n'}</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}
