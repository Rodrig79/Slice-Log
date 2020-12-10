import {Alert} from 'react-native';
import * as SecureStore from 'expo-secure-store';

export async function addPie(name, type) {

  if (type == 'meat') {
    var meats = await SecureStore.getItemAsync('meats')
    meats = meats.split(', ')
    if (!meats.includes(name)) {
      meats = meats.join(', ') + ', ' + name
      await SecureStore.setItemAsync('meats', meats)
    }
    else {
      Alert.alert('Pie already exists')
    }
  }

  else if (type == 'veggie') {
    var veggies = await SecureStore.getItemAsync('veggies')
    veggies = veggies.split(', ')
    if (!veggies.includes(name)) {
      veggies = veggies.join(', ') + ', ' + name
      await SecureStore.setItemAsync('veggies', veggies)
    }
    else {
      Alert.alert('Pie already exists')
    }
  }

  else {
    var vegans = await SecureStore.getItemAsync('vegans')
    vegans = vegans.split(', ')
    if (!vegans.includes(name)) {
      vegans = vegans.join(', ') + ', ' + name
      await SecureStore.setItemAsync('vegans', vegans)
    }
    else {
      Alert.alert('Pie already exists')
    }
  }
}
