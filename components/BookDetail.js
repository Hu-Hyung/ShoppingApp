'use strict';

var React = require('react-native');

var {
  StyleSheet,
  Text,
  View,
  Component,
  TouchableHighlight,
  AsyncStorage,
  ToolbarAndroid,
  Image,
} = React;


var price1;

class BookDetail extends Component {

    addItem(){

      if(price1 == null || price1 == undefined || price1 =='')
        price1 = 0.1;
      AsyncStorage.setItem(this.props.book.volumeInfo.title, JSON.stringify(price1));
     
     alert("Added\n" + "'" + this.props.book.volumeInfo.title + "'");
     
    }

    
  render() {
    var book = this.props.book;
    var imageURI = (typeof book.volumeInfo.imageLinks !== 'undefined') ? book.volumeInfo.imageLinks.thumbnail : '';
    //var price = (typeof book.saleInfo.listPrice.amount !== 'undefined' ) ? book.saleInfo.listPrice.amount: '';
    var price = 10.9;    
    var description = (typeof book.volumeInfo.description !== 'undefined') ? book.volumeInfo.description: '';
    price1 = price;

    return (
      <View style={styles.container}>
        <Image style={styles.image} source={{uri: imageURI}} />
        <Text style={styles.description}>$ {price}</Text>  
        
        <TouchableHighlight style={styles.button} onPress={this.addItem.bind(this)}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableHighlight>

        <Text style={styles.description}>{description}</Text>
      </View>
    );
  }

}

var styles = StyleSheet.create({
  cart: {
    alignItems: 'center'
  },

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

  container: {
    marginTop: 75,
    alignItems: 'center'
  },
  image: {
    width: 107,
    height: 165,
    padding: 10
  },
  description: {
    padding: 10,
    fontSize: 15,
    color: '#656565'
  }
});

module.exports = BookDetail;
