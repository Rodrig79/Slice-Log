import {StyleSheet} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

const styles = StyleSheet.create({
  container: {width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    backgroundColor: 'white',
    alignItems: 'center',
    zIndex: 0,
    flex: 1.2,
    flexDirection: 'column'
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
  title: {width: '100%',
    height: '5%',
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: '10%',
    paddingRight: '10%',
    marginBottom: '5%',
    alignItems: 'flex-end'},
  activeTimeStyle: {flex: 1,
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#AAAAAA',
  },
  inactiveTimeStyle: {flex: 1,
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEEEEE',
  },
  activeTimeTextStyle: {fontSize: 20,
    color: 'black'
  },
  inactiveTimeTextStyle: {fontSize: 20,
    color: '#AAAAAA'
  },
});

export default styles;
