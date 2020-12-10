import * as SecureStore from 'expo-secure-store';

export async function initializeValues() {
  var newDay = new Date()
  var dd = String(newDay.getDate()).padStart(2, '0')
  var mm = String(newDay.getMonth() + 1).padStart(2, '0')
  var yyyy = newDay.getFullYear()
  newDay = mm + '/' + dd + '/' + yyyy
  if (await SecureStore.getItemAsync('tempList') == null) {
    await SecureStore.setItemAsync('tempList', JSON.stringify({'Drink Cooler': [0, 0],
                                                               'Make Table': [0, 0],
                                                               'Salad Bar': [0, 0],
                                                               'Salad Bar Item': [0, 0],
                                                               'Reach-in': [0, 0],
                                                               'Walk-in': [0, 0]}))
  }
  if (await SecureStore.getItemAsync('amSubmit') == null) {
    await SecureStore.setItemAsync('amSubmit', 'false')
  }
  if (await SecureStore.getItemAsync('pmSubmit') == null) {
    await SecureStore.setItemAsync('pmSubmit', 'false')
  }
  if (await SecureStore.getItemAsync('date') == null) {
    await SecureStore.setItemAsync('date', newDay)
  }
  else if (newDay != await SecureStore.getItemAsync('date')) {
    await SecureStore.setItemAsync('tempList', JSON.stringify({'Drink Cooler': [0, 0],
                                                               'Make Table': [0, 0],
                                                               'Salad Bar': [0, 0],
                                                               'Salad Bar Item': [0, 0],
                                                               'Reach-in': [0, 0],
                                                               'Walk-in': [0, 0]}))
    await SecureStore.setItemAsync('amSubmit', 'false')
    await SecureStore.setItemAsync('pmSubmit', 'false')
    await SecureStore.setItemAsync('date', newDay)
  }
  var tempList = JSON.parse(await SecureStore.getItemAsync('tempList'))
  var amSubmit = await SecureStore.getItemAsync('amSubmit') != 'false'
  var pmSubmit = await SecureStore.getItemAsync('pmSubmit') != 'false'
  var date = newDay
  return ({tempList: tempList, amSubmit: amSubmit, pmSubmit: pmSubmit, date: date})
}
