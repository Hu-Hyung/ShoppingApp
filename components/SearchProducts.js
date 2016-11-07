'use strict';

var React = require('react-native');

var {
  StyleSheet,
  View,
  Text,
  Component,
  TextInput,
  TouchableHighlight,
  ProgressBarAndroid
} = React;

class SearchProducts extends Component {

  constructor(props) {
    super(props);
    this.state = {
      bookAuthor: '',
      bookTitle: '',
      isLoading: false,
      errorMessage: ''
    };
  }

  render() {
    var spinner = this.state.isLoading ?
      ( <ProgressBarAndroid styleAttr="Normal"/> ) :
      ( <View/>);
  return (
    <View style={styles.container}>
        <Text style={styles.instructions}>Search by book title and/or author</Text>
        <View>
          <Text style={styles.fieldLabel}>Book Title:</Text>
          <TextInput style={styles.searchInput} onChange={this.productTitleInput.bind(this)}/>
        </View>
        <View>
          <Text style={styles.fieldLabel}>Author:</Text>
          <TextInput style={styles.searchInput} onChange={this.bookAuthorInput.bind(this)}/>
        </View>
        <TouchableHighlight style={styles.button}
                           undelayColor='#f1c40f'
                           onPress={this.searchProducts.bind(this)}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableHighlight>
        {spinner}
        <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
      </View>
    );

  }

  productTitleInput(event) {
    this.setState({ bookTitle: event.nativeEvent.text});
  }

  bookAuthorInput(event) {
    this.setState({ bookAuthor: event.nativeEvent.text});
  }

  searchProducts() {
    this.fetchData();
  }

  fetchData() {
    this.setState({ isLoading: true });

    var baseURL = 'https://www.googleapis.com/books/v1/volumes?q=';
    if (this.state.bookAuthor !== '') {
      baseURL += encodeURIComponent('inauthor:' + this.state.bookAuthor);
    }
    if(this.state.bookTitle !== '') {
      baseURL += (this.state.bookAuthor === '') ? encodeURIComponent('intitle:' + this.state.bookTitle) : encodeURIComponent('+intitle:' + this.state.bookTitle);
    }

    console.log('URL: >>> ' + baseURL);
    fetch(baseURL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({isLoading: false});
        if(responseData.items) {
            this.props.navigator.push({
              name: 'searchResults',
              books: responseData.items
          });
        } else {
          this.setState({ errorMessage: 'No mactched product found'});
        }
      })
      .catch(error =>
        this.setState({
          isLoading: false,
          errorMessage: error
        }))
      .done();
  }
}

var styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#f5fcff'
  },
  searchInput: {
    height: 36,
    fontSize: 18,
    borderWidth: 1,
    flex: 1,
    borderRadius: 4,
    padding: 5
  },
  button: {
    alignSelf: 'center',
    height: 36,
    width: 100,
    backgroundColor: 'skyblue',
    borderRadius: 8,
    justifyContent: 'center',
    marginTop: 15
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  instructions: {
    fontSize: 18,
    alignSelf: 'center',
    marginBottom: 15
  },
  fieldLabel: {
    fontSize: 15,
    marginTop: 15
  },
  errorMessage: {
    fontSize: 15,
    alignSelf: 'center',
    marginTop: 15,
    color: 'orange'
  }
});

module.exports = SearchProducts
