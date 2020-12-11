import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import styles from '../styles';
import Timer from './timer';

class WindowPie extends Component {
  constructor(props) {
    super(props);
    this.state = {style: styles.freshPie};
    this.ampm = this.props.hours >= 12 ? 'pm' : 'am';
    this.startHours = this.props.hours % 12;
    this.startHours = this.startHours ? this.startHours : 12;
    this.startMins = this.props.mins < 10 ? '0' + this.props.mins : this.props.mins;
    this.startTime = this.startHours + ':' + this.startMins + ' ' + this.ampm;
    this.textColor = 'black';
  }

  updateState = (hours, mins) => {
    if (hours == 0 && mins == 0 || hours < 0) {
      if (this.state.style != styles.deadPie) {
        this.textColor = 'white';
        this.setState({style: styles.deadPie});
      }
    }
    else if (hours < 1 || hours == 1 && mins == 0) {
      if (this.state.style != styles.oldPie) {
        this.textColor = 'white';
        this.setState({style: styles.oldPie})
      }
    }
    else if (this.state.style != styles.freshPie){
      this.setState({style: styles.freshPie})
    }
  }

  render() {
    return(
      <View style={this.state.style}>
        <View style={styles.pieName}>
          <Text style={{fontSize: 20, opacity: 1, color: this.textColor}}>
            {this.props.name}
          </Text>
        </View>
        <View style={styles.pieStartTime}>
          <Text style={{fontSize: 15, textAlign: 'center', color: this.textColor}}>
            {this.startTime}
          </Text>
        </View>
        <View style={styles.pieTime}>
          <Timer hours={this.props.hours}
                 mins={this.props.mins}
                 secs={this.props.secs}
                 update={this.updateState}>
          </Timer>
        </View>
        <TouchableOpacity style={styles.deleteButton}
                          activeOpacity={0.8}
                          onPress={() => this.props.delete(this.props.deleteIndex)}>
          <View style={{width: '65%', height: '65%'}}>
            <Image style={{flex: 1, alignSelf: 'stretch', resizeMode: 'contain', width: null, height: null}}
                   source={require('../../../assets/deleteIcon.png')}>
            </Image>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default WindowPie;
