'use strict';

var React = require('react-native');

var {
  StyleSheet,
  Text,
  View,
  Component,
  Image
} = React;

class ProductDetail extends Component {
  render() {
    var book = this.props.book;
    var imageURI = (typeof book.volumeInfo.imageLinks !== 'undefined') ? book.volumeInfo.imageLinks.thumbnail : '';
    //var price = (typeof book.saleInfo.listPrice.amount !== 'undefined') ? book.saleInfo.listPrice.amount: '';
    var description = (typeof book.volumeInfo.description !== 'undefined') ? book.volumeInfo.description: '';
    //<Text style={styles.description}>$ {price}</Text>
    return (
      <View style={styles.container}>
        <Text>{"\n"}</Text>
        <Image style={styles.image} source={{uri: imageURI}} />
        <Text>{"\n"}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  image: {
    width: 107,
    height: 165,
    padding: 10,
    backgroundColor: '#F5FCFF'
  },
  description: {
    padding: 10,
    fontSize: 15,
    color: '#656565',
    backgroundColor: '#F5FCFF'
  }
});

module.exports = ProductDetail;
