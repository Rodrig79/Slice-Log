import React, {Component} from 'react';
import {View, ScrollView} from 'react-native';
import styles from '../styles';

export default class PieList extends Component {
  render() {
    return(
      <View style={{flex: 5, width: '100%', backgroundColor: '#FAFAFA', paddingBottom: '15%'}}>
        <ScrollView ref='pieList'>
          <View style={{flex: 1, alignItems: 'center', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', paddingTop: '10%'}}>
            {this.props.addPieList}
          </View>
        </ScrollView>
      </View>
    )
  }
}
