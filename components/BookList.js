'use strict';

var React = require('react-native');
/*
var FAKE_BOOK_DATA = [
    { volumeInfo:
      { title: 'The Catcher in the Rye',
        authors: "J. D. Salinger",
        imageLinks: {
          thumbnail: 'http://books.google.com/books/content?id=PCDengEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api'
        }
      }
    }
];
*/

var REQUEST_URL = 'https://www.googleapis.com/books/v1/volumes?q=subject:fiction';
//var REQUEST_URL =require('./a.json');
var BookDetail = require('./BookDetail');
var REQUEST_URL2 = 'https://www.googleapis.com/books/v1/volumes?q=subject:nonfiction';
var REQUEST_URL3 = 'https://github.com/3GTeam03/Test/blob/master/volumes.json';
//var customData = require('/volumes.json');

var {
  Image,
  StyleSheet,
  Text,
  View,
  Component,
  ListView,
  TouchableHighlight,
  ProgressBarAndroid,
} = React;



class BookList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch(REQUEST_URL,
      {
            method: 'get',
            dataType: 'json',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
      }
    )
    .then((response) => response.json())
    .then((responseData) => {
      console.log(responseData);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(responseData.items),
        isLoading: false
      });
    })
    .done();
  }


  showBookDetail(book){
    this.props.navigator.push({
      name: 'book',
      book: book,
    });
  }

  renderBook(book) {
    return (
      <TouchableHighlight onPress={() => this.showBookDetail(book)} underlayColor= '#f5dcff'>
        <View>
          <View style={styles.container}>
            <Image
              source={{uri: book.volumeInfo.imageLinks.thumbnail}}
              style={styles.thumbnail} />
            <Text style={styles.title}>{book.saleInfo.amount}</Text>
            <View style = {styles.rightContainer} />
              <Text style={styles.title}>{book.volumeInfo.title}</Text>
              <Text style={styles.author}>{book.volumeInfo.author}</Text>

            </View>
            <View style={styles.separator} />
          </View>
        </TouchableHighlight>
      );
  }


  render() {
    if(this.state.isLoading) {
      return this.renderLoadingView();
    }

    return(
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderBook.bind(this)}
        style={styles.listView}
        />
    );
  }

  renderLoadingView(){
    return(
      <View style={styles.loading}>
        <ProgressBarAndroid styleAttr="Normal"/>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  listView:{
    backgroundColor: '#f5dcff',
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f5fcff',
  },
  thumbnail: {
    width: 53,
    height: 81,
    marginRight: 10
  },
  title: {
    fontSize: 20,
    marginBottom: 8
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  rightContainer: {
    flex: 1,
  },
  author: {
    color: '#656565'
  }
});

module.exports = BookList;
