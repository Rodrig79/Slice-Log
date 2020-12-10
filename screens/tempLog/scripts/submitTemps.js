import {Alert} from 'react-native';
import * as SecureStore from 'expo-secure-store'
import {createAndSavePDF} from './createAndSavePDF'

export async function submitTemps(date, tempList, time) {
  var dateFile = date.replace(/\//g, '-')
  var ampm = time == 11 ? 0 : 1
  var complete = 1
  for (const property in tempList) {
    if (tempList[property][ampm] == 0) {
      complete = 0
    }
  }
  if (complete == 1) {
    await SecureStore.setItemAsync('tempList', JSON.stringify(tempList))
    if (ampm == 0) {
      await SecureStore.setItemAsync('amSubmit', 'true')
      return 11
    }
    else {
      await SecureStore.setItemAsync('pmSubmit', 'true')
      createAndSavePDF(date, dateFile, tempList)
      return 5
    }
  }
  else {
    Alert.alert('Please enter temps for all fields')
    return 0
  }
}
