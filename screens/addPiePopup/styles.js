import {StyleSheet, Dimensions} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

const styles = StyleSheet.create({
  addPiePopup: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    backgroundColor: 'white',
    alignItems: 'center',
    zIndex: 0,
    flex: 1.2,
    flexDirection: 'column',
  },
  closeWrapper: {
    width: '100%',
    height: '5%',
    marginTop: getStatusBarHeight(),
    alignItems: 'flex-end',
    marginBottom: 30,
  },
  closeButton: {
    width: '10%',
    height: '100%',
    marginTop: '5%',
    marginRight: '5%'
  },
  buttonSelect: {
    width: '80%',
    height: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEEEEE',
    padding: 5,
  },
  selected: {width: '80%',
                   height: '80%',
                   alignItems: 'center',
                   justifyContent: 'center',
                   backgroundColor: '#999999',
                   padding: 5
  },
  unselected: {width: '80%',
                    height: '80%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#EEEEEE',
                    padding: 5
  },
  listSelected: {backgroundColor: '#FAFAFA',
                      flex: 1,
                      height: '100%',
                      justifyContent: 'center',
                      borderWidth: 1,
                      borderColor: '#AAAAAA',
                      borderBottomWidth: 0
  },
  listUnselected: {backgroundColor: '#FFFFFF',
                      flex: 1,
                      height: '100%',
                      justifyContent: 'center',
                      borderWidth: 1,
                      borderColor: '#EEEEEE',
                      borderBottomWidth: 1,
                      borderBottomColor: '#AAAAAA'
  },
  activeAddPie: {width: '80%',
                height: '50%',
                backgroundColor: '#0073ff'
  },
  inactiveAddPie: {width: '80%',
                  height: '50%',
                  backgroundColor: '#FAFAFA'},
  activeAddPieText: {fontSize: 25,
                     color: '#E6E6E6'
  },
  inactiveAddPieText: {fontSize: 25,
                       color: '#DDDDDD'
  }
});

export default styles;
