import React, {Component} from 'react';
import {View, StatusBar, ScrollView, ImageBackground, Alert} from 'react-native';
import styles from './styles';
import Hamburger from './components/hamburger';
import TopBar from './components/topBar';
import WindowPie from './components/windowPie';
import RemovedPie from './components/removedPie';
import RemovePieOptions from './components/removePieOptions';
import {initializePieArray} from './scripts/initializePieArray';
import {initializeMenu} from './scripts/initializeMenu';
import {createAndSavePDF} from './scripts/createAndSavePDF';
import * as SecureStore from 'expo-secure-store';
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyBDdMYNJHp-ASbTgiL9zpiW5R3MhOvTEqE',
  authDomain: 'slice-log-11dab.firebaseapp.com',
  databaseURL: 'https://slice-log-11dab-default-rtdb.firebaseio.com',
  projectId: 'slice-log-11dab',
  storageBucket: 'slice-log-11dab.appspot.com',
  messagingSenderId: '745354319884',
  appId: '1:745354319884:android:bd2dcea01a70ece9887629',
};

firebase.initializeApp(firebaseConfig);

initializeMenu()

function sortPiesForUpload(pieList) {
  var newArray = []
  for (const index in pieList) {
    if (index < 1000) {
      newArray.push(pieList[index]['name'])
    }
  }
  return newArray
}

class Home extends Component<{}> {

  constructor () {
    super();
    this.state = { pieArray: {}, popup: 'start' };
    this.index = 0;
    this.statusBarStyle = 'light-content';
    this.removePieOptionsShown = 0
    this.removePieName = ''
    this.notification = false
    this.notificationSound = false
  }

  async componentDidMount() {
    var values = await initializePieArray()
    this.index = values.index
    this.setState({pieArray: values.pieArray})
    this.interval = setInterval(async() => {
      var date = new Date()
      var hours = date.getHours()
      var mins = date.getMinutes()
      var secs = date.getSeconds()
      if (hours < 11 && mins < 60) {
        await SecureStore.setItemAsync('amSubmit', 'false')
        await SecureStore.setItemAsync('pmSubmit', 'false')
        await SecureStore.setItemAsync('tempList', JSON.stringify({'Drink Cooler': [0, 0],
                                                                   'Make Table': [0, 0],
                                                                   'Salad Bar': [0, 0],
                                                                   'Salad Bar Item': [0, 0],
                                                                   'Reach-in': [0, 0],
                                                                   'Walk-in': [0, 0]}))
      }
      if (hours == 11 && mins == 0 && secs == 0 && await SecureStore.getItemAsync('amSubmit') == 'false') {
        // this.notification = true
        // this.notificationSound = true
        this.forceUpdate()
      }
      else if (hours == 17 && mins == 0 && secs == 0 && await SecureStore.getItemAsync('pmSubmit') == 'false') {
        // this.notification = true
        // this.notificationSound = true
        this.forceUpdate()
      }

      firebase.database().ref('data').set({
        pieList: JSON.stringify(sortPiesForUpload(this.state.pieArray)),
      });
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  stopSound = () => {
    this.notificationSound = false
  }

  hideNotification = () => {
    this.notification = false
  }

  updateHamburger = () => {
      if (this.state.popup == 'start') {
        this.setState({popup: 'open'})
      }
      else if (this.state.popup == 'closed') {
        this.setState({popup: 'open'})
      }
      else {
        this.setState({popup: 'closed'})
      }
  }

  addPie = async(type) => {
    const startHours = new Date().getHours();
    const startMins = new Date().getMinutes();
    const startSecs = new Date().getSeconds();
    const newlyAddedValue = { name: type,
                            hours: startHours,
                            mins: startMins,
                            secs: startSecs,
                            index: this.index.toString(),
                            removed: false
                          };
    var pieArrayTemp = this.state.pieArray;
    pieArrayTemp[this.index.toString()] = newlyAddedValue;
    this.index++;
    this.setState({ pieArray: pieArrayTemp});
    await SecureStore.setItemAsync('index', this.index.toString())
    await SecureStore.setItemAsync('pieList', JSON.stringify(pieArrayTemp))
  }

  removePie = async(value, reason, waste) => {
    var pieArrayTemp = this.state.pieArray;
    if (reason != 'Accident') {
      var removeTemp = {}
      removeTemp[1000+value] = pieArrayTemp[value]
      removeTemp[1000+value].removed = true
      removeTemp[1000+value].reason = reason
      removeTemp[1000+value].waste = waste
      delete pieArrayTemp[value];
      pieArrayTemp = {
        ...removeTemp,
        ...pieArrayTemp
      }
    }
    else {
      delete pieArrayTemp[value]
    }
    this.setState({ pieArray: pieArrayTemp });
    await SecureStore.setItemAsync('pieList', JSON.stringify(pieArrayTemp))
  }

  clearPies = async(confirm, auto=false) => {
    if (confirm == 'yes') {
      for (const property in this.state.pieArray) {
        if (property < 1000) {
          this.removePie(this.state.pieArray[property].index, 'Closed', '?')
        }
      }
      if (!auto) {
        createAndSavePDF(this.state.pieArray)
      }
      delete this.state.pieArray
      this.index = 0
      this.setState({pieArray: {}, popup: 'closed'});
      await SecureStore.setItemAsync('index', '0')
      await SecureStore.setItemAsync('pieList', JSON.stringify({}))
    }
    else {
      this.setState({popup: 'closed'})
    }
  }

  confirmClearPies = () => {
    Alert.alert(
      'ARE YOU SURE?',
      '',
      [{text: 'YES',
         onPress: () => this.clearPies('yes')},
        {text: 'NO',
         onPress: () => this.clearPies('no')}],
      {cancelable: false},
    );
  }

  openRemovePieOptions = (name) => {
    this.removePieOptionsShown = 1;
    this.removePieName = name
    this.setState({popup: 'start'});
  }

  hideRemovePieOptions = (cancel, reason, waste) => {
    if (!cancel) {
      this.removePie(this.removePieName, reason, waste)
    }
    this.removePieName = ''
    this.removePieOptionsShown = 0
    this.forceUpdate();
  }


  render() {
    var pieList = [];
    for (const property in this.state.pieArray) {
      if (this.state.pieArray[property].removed == false) {
        pieList.push( <WindowPie key={property}
                   name={this.state.pieArray[property].name}
                   hours={this.state.pieArray[property].hours}
                   mins={this.state.pieArray[property].mins}
                   secs={this.state.pieArray[property].secs}
                   deleteIndex={this.state.pieArray[property].index}
                   delete={this.openRemovePieOptions}>
        </WindowPie>);
      }
      else {
        pieList.push( <RemovedPie key={property}
                   name={this.state.pieArray[property].name}
                   hours={this.state.pieArray[property].hours}
                   mins={this.state.pieArray[property].mins}
                   secs={this.state.pieArray[property].secs}
                   removeType={this.state.pieArray[property].reason}>
        </RemovedPie>);
      }
    }

    return (
      <View style={styles.container}>
        <StatusBar barStyle={this.statusBarStyle}>
        </StatusBar>
        <ImageBackground source={require('../../assets/piesCropped.jpg')}
                         style={{height: '100%', width: '100%', position: 'absolute'}}>
        </ImageBackground>
        <RemovePieOptions popupStyle={this.removePieOptionsStyle}
                          shown={this.removePieOptionsShown}
                          hideRemovePieOptions={this.hideRemovePieOptions}>
        </RemovePieOptions>
        <Hamburger status={this.state.popup}
                   updateHamburger={this.updateHamburger}
                   clearPies={this.confirmClearPies}
                   openMenu={() => {this.props.navigation.navigate('Menu')}}
                   openTempLog={() => {this.props.navigation.navigate('Temp Log')}}
                   notification={this.notification}
                   hideNotification={this.hideNotification}>
        </Hamburger>
        <TopBar pressHamburger={() => {this.updateHamburger()}}
                pressAdd={() => {if (this.state.popup == 'open') {this.updateHamburger()}
                          this.props.navigation.navigate('Add Pie', {
                            onGoBack: this.addPie
                          })
                }}
                notification={this.notification}
                notificationSound={this.notificationSound}
                stopSound={this.stopSound}>
        </TopBar>
        <View style={{flex: 6, width: '100%', zIndex: 1}}>
          <ScrollView>
              <View style={{flex: 1, alignItems: 'center'}}>
                {pieList}
              </View>
          </ScrollView>
        </View>
      </View>
      );
    }
}

export default Home;
