import React, {Component} from 'react';
import {View} from 'react-native';
import styles from './styles';
import NewPieButton from './components/newPieButton';
import AddOther from './components/addOther';
import CloseButton from './components/closeButton';
import ListButton from './components/listButton';
import PieList from './components/pieList';
import HalfMessage from './components/halfMessage';
import CancelAdd from './components/cancel-add';
import {updateLists} from './scripts/updateLists';


class AddPiePopup extends Component {
  constructor() {
    super();
    this.state = {current: 'none', meats: [], veggies: [], vegans: []};
    this.currentList = [];
    this.showAddOther = false;
    this.half1 = 'none';
    this.half2 = 'none';
    this.halfMessage = false;
  }

  async componentDidMount() {
    var lists = await updateLists()
    this.setState({meats: lists.meats, veggies: lists.veggies, vegans: lists.vegans})
    this.updateList(this.state.meats)
    this.forceUpdate()
  }

  updateCurrent = (next) => {
    if (this.state.current == 'none') {
      this.showAddOther = false;
    }
    if (next == "Other") {
      this.showAddOther = true;
    }

    if (this.state.current == next || next == 'Other') {
      this.half1 = 'none';
      this.half2 = 'none';
      this.halfMessage = false;
      this.setState({current: 'none'});
    }
    else if (next == 'Half/Half') {
      this.halfMessage = true,
      this.setState({current: 'Half/Half'});
    }
    else if (this.state.current == 'Half/Half') {
      if (next == this.half1) {
        this.half1 = this.half2
        this.half2 = 'none'
      }
      else if (next == this.half2) {
        this.half2 = 'none'
      }
      else if (this.half1 == 'none'){
        this.half1 = next
      }
      else {
        this.half2 = next
      }
      this.forceUpdate();
    }
    else {
      this.setState({current: next});
    }
  }

  updateList = (list) => {
    if (list != this.currentList) {
      if (this.state.current == 'Half/Half') {
        this.forceUpdate()
      }
      else {
        this.updateCurrent(this.state.current);
      }
      if (list == this.state.meats) {
        this.currentList = this.state.meats;
      }
      else if (list == this.state.veggies) {
        this.currentList = this.state.veggies;
      }
      else if (list == this.state.vegans) {
        this.currentList = this.state.vegans;
      }
    }
  }

  render() {
    let addPieList = this.currentList.map((item, key) => {
        return (
          <NewPieButton key={key}
                        pieName={item}
                        buttonStyle={this.state.current == item || this.half1 == item || this.half2 == item ?
                                     styles.selected : styles.unselected}
                        updateCurrent={this.updateCurrent}>
          </NewPieButton>
        )
    });

    return (
      <View style={styles.addPiePopup}>
        <AddOther show={this.showAddOther}
                  addPie={this.props.addPie}
                  updateCurrent={this.updateCurrent}
                  updateList={this.updateList}
                  returnList={this.state.meats}
                  hidePopup={(name) => {this.props.route.params.onGoBack(name)
                                        this.props.navigation.goBack()
                  }}>
        </AddOther>
        <CloseButton onPress={() => {
                              this.updateCurrent(this.state.current)
                              this.currentList = this.state.meats;
                              this.props.navigation.goBack()}}>
        </CloseButton>
        <View style={{flex: 0.5, alignItems: 'center', display: 'flex', flexDirection: 'row'}}>
          <ListButton type={'MEAT'}
                      status={this.currentList == this.state.meats}
                      onPress={() => {this.updateList(this.state.meats)}}>
          </ListButton>
          <ListButton type={'VEGGIE'}
                      status={this.currentList == this.state.veggies}
                      onPress={() => {this.updateList(this.state.veggies)}}>
          </ListButton>
          <ListButton type={'VEGAN'}
                      status={this.currentList == this.state.vegans}
                      onPress={() => {this.updateList(this.state.vegans)}}>
          </ListButton>
        </View>
        <PieList addPieList={addPieList}/>
        <HalfMessage display={this.halfMessage == true}/>
        <CancelAdd confirmPie={(this.state.current != 'none' && this.state.current != 'Half/Half') ||
                               (this.half1 != 'none' && this.half2 != 'none') ?
                                    styles.activeAddPie : styles.inactiveAddPie}
                   confirmPieFont={(this.state.current != 'none' && this.state.current != 'Half/Half') ||
                                   (this.half1 != 'none' && this.half2 != 'none') ?
                                        styles.activeAddPieText : styles.inactiveAddPieText}
                   cancelPress={() => {
                                this.updateCurrent(this.state.current)
                                this.currentList = this.state.meats;
                                this.props.navigation.goBack()}}
                   confirmPress={() => {
                                  if(this.state.current!='none') {
                                    if (this.state.current == 'Half/Half') {
                                      if (this.half1 != 'none' && this.half2 != 'none') {
                                        this.props.route.params.onGoBack(this.half1 + '/' + this.half2)
                                        this.props.navigation.goBack()
                                        this.updateCurrent(this.state.current)
                                        this.currentList = this.state.meats
                                        this.half1 = 'none'
                                        this.half2 = 'none'
                                      }
                                    }
                                    else {
                                      this.props.route.params.onGoBack(this.state.current)
                                      this.props.navigation.goBack()
                                      this.updateCurrent(this.state.current)
                                      this.currentList = this.state.meats}}}}>
        </CancelAdd>
      </View>
    )
  }
}


export default AddPiePopup
