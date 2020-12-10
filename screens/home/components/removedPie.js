import React, {Component} from 'react';
import {Text, View} from 'react-native';
import styles from '../styles';
import Timer from './timer';

class RemovedPie extends Component {
  constructor(props) {
    super(props);
    this.ampm = this.props.hours >= 12 ? 'pm' : 'am';
    this.startHours = this.props.hours % 12;
    this.startHours = this.startHours ? this.startHours : 12;
    this.startMins = this.props.mins < 10 ? '0' + this.props.mins : this.props.mins;
    this.startTime = this.startHours + ':' + this.startMins + ' ' + this.ampm;
  }

  render() {
    return(
      <View style={styles.removedPie}>
        <View style={styles.pieName}>
          <Text style={{fontSize: 20, opacity: 1}}>
            {this.props.name}
          </Text>
        </View>
        <View style={styles.pieStartTime}>
          <Text style={{fontSize: 15, textAlign: 'center'}}>
            {this.startTime}
          </Text>
        </View>
        <View style={styles.pieRemoveType}>
          <Text style={{fontSize: 13}}>{this.props.removeType}</Text>
        </View>
      </View>
    );
  }
}

export default RemovedPie;
