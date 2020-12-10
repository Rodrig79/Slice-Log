import * as SecureStore from 'expo-secure-store'

export async function updateLists() {
  var lists = {}
  lists['meats'] = await SecureStore.getItemAsync('meats');
  lists['veggies'] = await SecureStore.getItemAsync('veggies');
  lists['vegans'] = await SecureStore.getItemAsync('vegans');

  for (const property in lists) {
    var temp = lists[property].split(", ").sort()
    temp.push('Half/Half')
    temp.push('Other')
    lists[property] = temp
  }

  return lists
}
