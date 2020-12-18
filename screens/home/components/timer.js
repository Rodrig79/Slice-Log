import React, {Component} from 'react';
import {Text} from 'react-native';

const formatNumber = number => `0${number}`.slice(-2);

class Timer extends Component {

  constructor() {
    super();
    this.state = {hours: 4,
                  mins: formatNumber(0)};
    this.color = 'black';
    this.done = false;
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      if (this.done == false) {
        var startTime = (this.props.hours*60) + this.props.mins + (this.props.secs/60);
        var newHours = new Date().getHours();
        if (newHours < this.props.hours) {
          newHours = newHours + 24
        }
        var newMins = new Date().getMinutes();
        var newSecs = new Date().getSeconds();
        var newTime = (newHours*60) + newMins + (newSecs/60);
        newHours = Math.floor((newTime - startTime)/60);
        newMins = Math.floor(newTime - startTime - (newHours*60));
        if (newMins == 0) {
          newHours = 4 - newHours
        }
        else {
          newHours = 3 - newHours
          newMins = 60 - newMins
        }
        if (newHours < 0) {
          this.done = true
        }
        if (newHours == 1 && newMins == 0 || newHours < 1) {
          this.color = 'white';
        }
        if (this.state.mins != formatNumber(newMins)) {
          this.props.update(newHours, newMins);
          this.setState( {hours: newHours,
                          mins: formatNumber(newMins),
                        })
        }
      }
      else {
        this.setState( {hours: 0, mins: formatNumber(0)} )
      }
    }, 10)
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return(
      <Text style={{fontSize: 20, color: this.color}}
            adjustsFontSizeToFit
            numberOfLines={1}>
        {`${this.state.hours}:${this.state.mins}`}
      </Text>
    );
  }
}

export default Timer;
