import React, {Component} from 'react';
import {Text, View, ScrollView, TouchableOpacity, Alert, Keyboard, Image} from 'react-native';
import styles from './styles';
import * as SecureStore from 'expo-secure-store';
import Temp from './components/temp';
import CloseButton from './components/closeButton';
import Title from './components/title';
import AmPm from './components/amPm';
import TempList from './components/tempList';
import SubmitButton from './components/submitButton';
import {initializeValues} from './scripts/initializeValues';
import {submitTemps} from './scripts/submitTemps';
import {htmlContent} from './scripts/htmlContent';
import {createCsv} from './scripts/createCsv';
import {createAndSavePDF} from './scripts/createAndSavePDF';


class TempLog extends Component {
  constructor() {
    super()
    this.time = 11
    this.clearTemps = false
  }

  async componentDidMount() {
    var values = await initializeValues()
    this.tempList = values.tempList
    this.amSubmit = values.amSubmit
    this.pmSubmit = values.pmSubmit
    this.date = values.date
    this.dateFile = this.date.replace('/', '-')
    this.forceUpdate()
  }

  setTemp = (name, temp) => {
    if (this.time == 11) {
      this.tempList[name][0] = temp
    }
    else {
      this.tempList[name][1] = temp
    }
    this.forceUpdate()
  }

  render() {
    var tempList = []
    var index = this.time == 11 ? 0 : 1
    var editable = this.time == 11 ? !this.amSubmit : !this.pmSubmit
    for (const property in this.tempList) {
      var value = this.tempList[property][index] != 0 ? this.tempList[property][index].toString() : ''
      tempList.push(<Temp key={property}
                          name={property}
                          value={value}
                          editable={editable}
                          setTemp={this.setTemp}
                          clear={this.clearTemps}>
                    </Temp>)
    }

    return (
      <View style={styles.container}>
        <CloseButton onPress={() => {this.props.navigation.goBack()
                              this.time = 11
                              Keyboard.dismiss()}}>
        </CloseButton>
        <Title date={this.date} />
        <AmPm time={this.time}
              amPress={() => {
                        this.time = 11
                        this.forceUpdate()}}
              pmPress={() => {
                        this.time = 5
                        this.forceUpdate()}}>
        </AmPm>
        <TempList tempList={tempList}/>
        <SubmitButton onPress={async() => {var result = await submitTemps(this.date, this.tempList, this.time)
                                if (result == 11) {
                                  this.amSubmit = true
                                  this.props.navigation.goBack()
                                }
                                else if (result == 5) {
                                  this.pmSubmit = true
                                  this.time = 11
                                  this.props.navigation.goBack()
                                }
                                Keyboard.dismiss()}}>
        </SubmitButton>
      </View>
    )
  }
}


export default TempLog
