/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  DrawerLayoutAndroid,
  ProgressBarAndroid,
  Image
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator'

var Featured = require('./Featured');
var Search = require('./Search');
var Cart = require('./Cart');

class shoppingapp extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedTab: 'featured'
    };
  }

  render() {
    return (
      <TabNavigator>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'featured'}
          renderIcon={() => <Image sytle={styles.icon} source={require('./buttons/rsz_badge.png')}/>}
          renderSelectedIcon={() => <Image style={styles.icon} source={require('./buttons/rsz_badge.png')}/>}
          onPress={() => this.setState({ selectedTab: 'featured'})}
          title="Featured">
          <Featured/>
        </TabNavigator.Item>
          
        <TabNavigator.Item
          selected={this.state.selectedTab === 'cart'}
          renderIcon={() => <Image sytle={styles.icon} source={require('./buttons/rsz_cart.png')}/>}
          renderSelectedIcon={() => <Image sytle={styles.icon} source={require('./buttons/rsz_cart.png')}/>}
          onPress={() => this.setState({ selectedTab: 'cart'})}
          title="Cart">
          <Cart/>
        </TabNavigator.Item>

        <TabNavigator.Item
          selected={this.state.selectedTab === 'search'}
          renderIcon={() => <Image sytle={styles.icon} source={require('./buttons/rsz_check.png')}/>}
          renderSelectedIcon={() => <Image sytle={styles.icon} source={require('./buttons/rsz_check.png')}/>}
          onPress={() => this.setState({ selectedTab: 'search'})}
          title="Search">
          <Search/>
        </TabNavigator.Item>
      </TabNavigator>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

  icon: {
    width: 20,
    height: 20
  }

});

AppRegistry.registerComponent('shoppingapp', () => shoppingapp);
