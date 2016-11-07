'use strict';

var React = require('react-native');
var SearchProducts = require('./SearchProducts');
var SearchResults = require('./SearchResults');
var ProductDetail = require('./ProductDetail');

var {
  StyleSheet,
  View,
  Text,
  Component,
  ToolbarAndroid,
  BackAndroid,
  Navigator,
  AppRegistry,
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
  if(route.name === 'search') {
    return(
      <View style= {{flex: 1}}>
        <ToolbarAndroid
          style={styles.toolbar}
          title="Search Products"/>
        <SearchProducts
          navigator={navigationOperations}
          testProps="TestProps"
        />
      </View>
    );
  } else if (route.name === 'searchResults') {
    return (
      <View style={{flex: 1}}>
        <ToolbarAndroid
          actions={[]}
          navIcon={require('../images/chevron-left.png')}
          onIconClicked={navigationOperations.pop}
          style={styles.toolbar}
          titleColor="black"
          title="Search Results" />
        <SearchResults
          navigator={navigationOperations}
          books={route.books}
        />
      </View>
    );
  } else if (route.name === 'bookDetail'){
    return (
      <View style={{flex: 1}}>
        <ToolbarAndroid
          actions={[]}
          navIcon={require('../images/chevron-left.png')}
          onIconClicked={navigationOperations.pop}
          style={styles.toolbar}
          titleColor="black"
          title={route.book.volumeInfo.title} />
        <ProductDetail
          style={{flex: 1}}
          navigator={navigationOperations}
          book={route.book}
          />
      </View>
    );
  }
};


class Search extends Component {
  render() {
    var initialRoute = {name: 'search'};
    return (
      <Navigator
        style={{flex: 1}}
        initialRoute={initialRoute}
        configureScene={() => Navigator.SceneConfigs.FadeAndroid}
        renderScene={RouteMapper}
      />
    );
  }
}



var styles = StyleSheet.create({
  description: {
    fontSize: 20,
    backgroundColor: 'white'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  toolbar: {
    backgroundColor: '#e9eaed',
    height: 56,
  },
  /*
  icon: {
    width: 20,
    height: 20
  }*/
});

module.exports = Search;
