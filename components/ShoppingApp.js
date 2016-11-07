/**
 * Shopping App
 *
 * Team 3G
 * React Native Project
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

import TabNavigator from 'react-native-tab-navigator';

var Featured = require('./Featured');
var Search = require('./Search');


class ShoppingApp extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedTab: 'featured'
    };
  }


  render() {
    return (
      <TabNavigator>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'featured'}
          renderIcon={() => <Image sytle={styles.icon}
                                   source={require('../images/checkbox-blank-outline.png')}/>}
          renderSelectedIcon={() => <Image style={styles.icon}
                                          source={require('../images/checkbox-blank-outline.png')}/>}
          onPress={() => this.setState({ selectedTab: 'featured'})}
          title="Featured">
          <Featured/>
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'search'}
          renderIcon={() => <Image sytle={styles.icon} source={require('../images/magnify.png')}/>}
          renderSelectedIcon={() => <Image sytle={styles.iconSmall} source={require('../images/magnify.png')}/>}
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
    backgroundColor: '#F5FCFF'
  },

  icon: {
    width: 25,
    height: 25
  },


});

AppRegistry.registerComponent('ShoppingApp', () => ShoppingApp);
