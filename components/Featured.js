'use strict';

var React = require('react-native');
var BookList = require('./ProductList');
var BookDetail = require('./ProductDetail');

var {
  StyleSheet,
  View,
  Component,
  AppRegistry,
  BackAndroid,
  Navigator,
  ToolbarAndroid
} = React;

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
          title="Featured Books"/>
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
          navIcon={require('../images/chevron-left.png')}
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

var styles = StyleSheet.create({
  navContainer: {
    flex: 1,
  },
  toolbar: {
    backgroundColor: 'skyblue',
    height:55,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

module.exports = Featured;
