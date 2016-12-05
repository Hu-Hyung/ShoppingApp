'use strict';

var React = require('react-native');
var BookList = require('./components/BookList');
var BookDetail = require('./components/BookDetail');

var {
  StyleSheet,
  View,
  Component,
  AppRegistry,
  BackAndroid,
  Navigator,
  AsyncStorage,
  ToolbarAndroid
} = React;

var styles = StyleSheet.create({
  navContainer: {
    flex: 1,
  },
  toolbar: {
    backgroundColor: 'gray',
    height:55,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

var _navigator;
BackAndroid.addEventListener('hardwareBackPress', () => {
  if(_navigator && _navigator.getCurrentRoutes().length > 1) {
    _navigator.pop();
    return true;
  }
  return false;
});

var RouteMapper = function(route, navigationOperations, onComponentRef) {
  _navigator = navigationOperations;
  if (route.name === 'bookList') {
    return(
      <View style={styles.navContainer}>
        <ToolbarAndroid
          style={styles.toolbar}
          title="Featured Books"
          navIcon={require('./buttons/check.png')}
          onIconClicked={navigationOperations.pop}

        />
        
        <BookList
          navigator={navigationOperations}
        />
      </View>
    );    
  } else if (route.name === 'book') {
    return (
      <View style={{flex: 1}}>
        <ToolbarAndroid
          actions={[]}
          navIcon={require('./buttons/back_arrow.png')}
          onIconClicked={navigationOperations.pop}
          style={styles.toolbar}
          titleColor="white"
          title={route.book.volumeInfo.title} />
        <BookDetail
          style={{flex: 1}}
          navigator={navigationOperations}
          book={route.book}
        />
      </View>
    );
  }
  
};

class Featured extends Component {
  render() {  
    var initialRoute = {name: 'bookList' };
    var a = 'Items: ';
    AsyncStorage.setItem('', JSON.stringify(a));    
    return (
      <Navigator
        style={styles.navContainer}
        initialRoute={initialRoute}
        configureScene={() => Navigator.SceneConfigs.FadeAndroid}
        renderScene={RouteMapper}
      />
    );
  }
}

module.exports = Featured;
