import React, {Component} from 'react';
import {Animated, View, Keyboard, TouchableWithoutFeedback, Alert} from 'react-native';
import styles from './styles';
import DeleteMenuList from './components/deleteMenuList';
import * as SecureStore from 'expo-secure-store';
import CloseButton from './components/closeButton';
import MenuButtons from './components/menuButtons';
import AddWindow from './components/addWindow';
import DeleteWindow from './components/deleteWindow';
import {addPie} from './scripts/addPie';
import {deletePie} from './scripts/deletePie';


class Menu extends Component {
  constructor() {
    super();
    this.state = {window: 'add'};
    this.addName = ''
    this.addType = ''
    this.deleteName = ''
    this.clearAddText = false
  }

  updateDeleteName = (name) => {
    if (name == 'none') {
      this.deleteName = ''
    }
    else {
      this.deleteName = name
    }
  }


  render() {

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accesible={false}>
        <View style={styles.container}>
          <CloseButton onPress={() => {
                                this.setState({window: 'add'})
                                this.props.navigation.goBack()
                                this.clearAddText = true
                                this.addName = ''
                                this.addType = ''
                                Keyboard.dismiss()
          }}>
          </CloseButton>
          <MenuButtons addStyle={this.state.window == 'add' ?
                                 styles.activeTab : styles.inactiveTab}
                       addPress={() => {this.setState({window: 'add'})
                                 Keyboard.dismiss()}}
                       deleteStyle={this.state.window == 'delete' ?
                                    styles.activeTab : styles.inactiveTab}
                       deletePress={() => {this.clearAddText = true
                                     this.setState({window: 'delete'})
                                     this.addName = ''
                                     this.addType = ''
                                     Keyboard.dismiss()}}>
          </MenuButtons>
          <View style={{width: '100%',
                        height: '78%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'absolute',
                        top: '22%'}}>
            <AddWindow style={this.state.window == 'add' ?
                              styles.activeWindow : styles.inactiveWindow}
                       onChangeText={(text) => this.addName = text ? text : ''}
                       clearAddText={this.clearAddText}
                       addType={this.addType}
                       meatPress={() => {this.addType = this.addType != 'meat' ?
                                          'meat' : ''
                                          Keyboard.dismiss()
                                          this.clearAddText = false
                                          this.forceUpdate()}}
                       veggiePress={() => {this.addType = this.addType != 'veggie' ?
                                           'veggie' : ''
                                           Keyboard.dismiss()
                                           this.clearAddText = false
                                           this.forceUpdate()}}
                       veganPress={() => {this.addType = this.addType != 'vegan' ?
                                          'vegan' : ''
                                          Keyboard.dismiss()
                                          this.clearAddText = false
                                          this.forceUpdate()}}
                       submitPress={() => {if (this.addName != '' && this.addType != '') {
                                           addPie(this.addName, this.addType)
                                           this.props.navigation.goBack()
                                           }
                                           else if (this.addName == '') {
                                             Alert.alert('Please add name')
                                           }
                                           else {
                                             this.addType = ''
                                             Alert.alert('Please add type')
                                           }
                                         this.addName = ''
                                         this.addType = ''
                                         this.forceUpdate()}}>
            </AddWindow>
            <DeleteWindow style={this.state.window == 'delete' ?
                                  styles.activeWindow : styles.inactiveWindow}
                          updateDeleteName={(name) => this.updateDeleteName(name)}
                          deletePress={() => {if (this.deleteName != '') {
                                              this.props.navigation.goBack()
                                              deletePie(this.deleteName)
                                              this.addName = ''
                                              this.addType = ''
                                              this.deleteName = ''
                                              this.setState({window: 'add'})
                                              this.clearAddText = true
                                            }
                                            else {
                                              Alert.alert('Please select a pie to delete')}}}>
            </DeleteWindow>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}


export default Menu
