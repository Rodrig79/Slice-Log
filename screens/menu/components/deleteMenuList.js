import React, {Component} from 'react';
import {Text, View, ScrollView, TouchableOpacity} from 'react-native';
import styles from '../styles';
import NewPieButton from '../../addPiePopup/components/newPieButton';
import * as SecureStore from 'expo-secure-store';


async function updateMeats() {
  return await SecureStore.getItemAsync('meats');
}
async function updateVeggies() {
  return await SecureStore.getItemAsync('veggies');
}
async function updateVegans() {
  return await SecureStore.getItemAsync('vegans');
}


class DeleteMenuList extends Component {
  constructor() {
    super();
    this.state = {current: 'none', meats: [], veggies: [], vegans: []};
    this.currentList = [];
  }

  updateLists = () => {
    updateMeats().then((value) => {
      var meatTemp = value.split(", ").sort()
      this.setState({meats: meatTemp})
      this.updateList(this.state.meats)
      this.forceUpdate()
    })
    updateVeggies().then((value) => {
      var veggieTemp = value.split(", ").sort()
      this.setState({veggies: veggieTemp})
    })
    updateVegans().then((value) => {
      var veganTemp = value.split(", ").sort()
      this.setState({vegans: veganTemp})
    })
  }

  componentDidMount() {
    this.updateLists()
  }

  updateCurrent = (next, previous='random') => {
    if (this.state.current == next) {
      this.setState({current: 'none'});
      this.props.updateDeleteName('none')
    }
    else {
      this.setState({current: next});
      this.props.updateDeleteName(next)
    }
  }

  updateList = (list) => {
    this.updateCurrent(this.state.current)
    if (list != this.currentList) {
      if (list == this.state.meats) {
        this.currentList = this.state.meats;
      }
      else if (list == this.state.veggies) {
        this.currentList = this.state.veggies;
      }
      else if (list == this.state.vegans) {
        this.currentList = this.state.vegans;
      }
      this.forceUpdate()
    }
  }

  render() {
    let addPieList = this.currentList.map((item, key) => {
        return (
          <NewPieButton key={key}
                        pieName={item}
                        buttonStyle={this.state.current == item ?
                                     styles.selectedDeleteItem : styles.unselectedDeleteItem}
                        updateCurrent={this.updateCurrent}>
          </NewPieButton>
        )
    });

    return (
      <View style={{
        width: '100%',
        height: '100%',
        paddingTop: '15%',
        alignItems: 'center',
        flex: 3,
        flexDirection: 'column',
        display: 'flex',
      }}>
        <View style={{flex: 0.7, alignItems: 'center', display: 'flex', flexDirection: 'row'}}>
          <TouchableOpacity style={this.currentList == this.state.meats ?
                                    styles.selectedDeleteList : styles.unselectedDeleteList}
                            onPress={() => {this.updateList(this.state.meats)}}>
            <Text style={{fontSize: 20, textAlign: 'center'}}>MEAT</Text>
          </TouchableOpacity>
          <TouchableOpacity style={this.currentList == this.state.veggies ?
                                    styles.selectedDeleteList : styles.unselectedDeleteList}
                            onPress={() => {this.updateList(this.state.veggies)}}>
            <Text style={{fontSize: 20, textAlign: 'center'}}>VEGGIE</Text>
          </TouchableOpacity>
          <TouchableOpacity style={this.currentList == this.state.vegans ?
                                    styles.selectedDeleteList : styles.unselectedDeleteList}
                            onPress={() => {this.updateList(this.state.vegans)}}>
            <Text style={{fontSize: 20, textAlign: 'center'}}>VEGAN</Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 5, width: '100%', backgroundColor: 'white', paddingBottom: '15%'}}>
          <ScrollView>
            <View style={{flex: 1, alignItems: 'center', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', paddingTop: '10%'}}>
              {addPieList}
            </View>
          </ScrollView>
        </View>
      </View>
    )
  }
}


export default DeleteMenuList
