'use strict';

var React = require('react-native');
var SearchBooks = require('./components/SearchBooks');
var SearchResults = require('./components/SearchResults');
var BookDetail = require('./components/BookDetail');

var {
  StyleSheet,
  View,
  Text,
  Component,
  ToolbarAndroid,
  TouchableHighlight,
  BackAndroid,
  Navigator,
  AsyncStorage,
  AppRegistry,
  WebView
  } = React;

var _navigator;
var test;
var tmp;
BackAndroid.addEventListener('hardwareBackPress', () => {
  if(_navigator && _navigator.getCurrentRoutes().length > 1) {
    _navigator.pop();
    return true;
  }
  return false;
});

var checkout = function(){         
  alert("successfully checked out");     
  AsyncStorage.clear();
}

var RouteMapper = function(route, navigationOperations, onComponentRef) {
  _navigator = navigationOperations;
  var res = "";

  for(var i = 0; i < test.length;i++)
    res += test[i];

  tmp = res;
  res = "";

  if(route.name === 'cart') {
    return(

      <View style= {{flex: 1}}>
        <ToolbarAndroid
          style={styles.toolbar}
          title="Cart Contents"/>
          <Text style={styles.cartText}>{tmp}</Text>

          <TouchableHighlight style={styles.button} onPress={checkout}>
            <Text style={styles.buttonText}>Checkout</Text>
          </TouchableHighlight>
      </View>
    );
  }
};


class Cart extends Component {
  constructor(){
    super()
    test = [];
    this.state = { check: true };
  }

  render() {
    if(test.length==0){    
        AsyncStorage.getAllKeys()
        .then((ks) => {
          ks.forEach((k) => {
            AsyncStorage.getItem(k)
              .then((v) => test.push(k + " - " + v + "\n"));
            });
        }).then(res => {
          this.setState({
          check: false
        }); 
        
        if(!this.state.check){
          //alert(test);
        }
          
        }).then(res => {  }).done();   
    }

    var initialRoute = {name: 'cart'};
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
  button: {
    height: 36,
    backgroundColor: '#0E1CE5',
    borderRadius: 8,
    justifyContent: 'center',
    marginTop: 15
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  cartText: {
    fontSize: 18,
    color: 'black',
  }

});

module.exports = Cart;
