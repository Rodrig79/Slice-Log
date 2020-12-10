import * as SecureStore from 'expo-secure-store';

export async function initializePieArray() {
  if (await SecureStore.getItemAsync('index') == null) {
    await SecureStore.setItemAsync('index', '0')
  }
  var index = Number(await SecureStore.getItemAsync('index'))
  if (await SecureStore.getItemAsync('pieList') == null) {
    await SecureStore.setItemAsync('pieList', JSON.stringify({}))
  }
  return {pieArray: JSON.parse(await SecureStore.getItemAsync('pieList')), index: index}
}
