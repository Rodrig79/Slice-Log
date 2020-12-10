import * as SecureStore from 'expo-secure-store';

export async function deletePie(name) {
  var pies = await SecureStore.getItemAsync('meats') + ', ' + '!, ' +
             await SecureStore.getItemAsync('veggies') + ', ' + '!!, ' +
             await SecureStore.getItemAsync('vegans')
  pies = pies.split(', ')
  var index = pies.indexOf(name)
  pies.splice(index, 1)
  var veganIndex = pies.indexOf('!!')
  var vegans = pies.splice(veganIndex)
  vegans.splice(vegans.indexOf('!!'), 1)
  vegans = vegans.join(', ')
  await SecureStore.setItemAsync('vegans', vegans)
  var veggieIndex = pies.indexOf('!')
  var veggies = pies.splice(veggieIndex)
  veggies.splice(veggies.indexOf('!'), 1)
  veggies = veggies.join(', ')
  await SecureStore.setItemAsync('veggies', veggies)
  var meats = pies.join(', ')
  await SecureStore.setItemAsync('meats', meats)
}
