import * as React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack';
import Home from './screens/home/home';
import AddPiePopup from './screens/addPiePopup/addPiePopup'
import TempLog from './screens/tempLog/tempLog'
import Menu from './screens/menu/menu'

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Add Pie" component={AddPiePopup}/>
        <Stack.Screen name="Temp Log" component={TempLog}/>
        <Stack.Screen name="Menu" component={Menu}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
