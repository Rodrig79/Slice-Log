import * as SecureStore from 'expo-secure-store';

export async function initializeMenu() {
  if (await SecureStore.getItemAsync('meats') == null) {
    await SecureStore.setItemAsync('meats', 'Pepperoni, ' +
                                            'Smokey, ' +
                                            'Philly, ' +
                                            'Buffalo, ' +
                                            'Steak & Tots, ' +
                                            'Pepperoni Sausage, ' +
                                            'Chicken Penne Alfredo')
  }
  if (await SecureStore.getItemAsync('veggies') == null) {
    await SecureStore.setItemAsync('veggies', 'Cheese, ' +
                                              'Mac \'n Cheese, ' +
                                              'Florentine, ' +
                                              'Cheese Pesto')
  }
  if (await SecureStore.getItemAsync('vegans') == null) {
    await SecureStore.setItemAsync('vegans', 'Vegan Mac, ' +
                                              'Vegan Pep, ' +
                                              'Vegan Veggie, ' +
                                              'Vegan Buffalo, ' + 
                                              'Vegan Burger, ' +
                                              'Vegan Smokey, ' +
                                              'Vegan Penne Alfredo')
  }
}
