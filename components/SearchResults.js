'use strict';

var React = require('react-native');
var {
  StyleSheet,
  View,
  Text,
  Component,
  TouchableHighlight,
  Image,
  ListView
} = React;



class SearchResults extends Component {
  constructor(props) {
    super(props);

    var dataSource = new ListView.DataSource(
      {rowHasChanged: (row1, row2) => row1 !== row2});
    this.state = {
      dataSource: dataSource.cloneWithRows(this.props.books)
    };

  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderProduct.bind(this)}
        style={styles.listView}
        />
    );

  }

  renderProduct(book) {
    var imageURI = (typeof book.volumeInfo.imageLinks !== 'undefined') ? book.volumeInfo.imageLinks.thumbnail : '';

    return (
      <TouchableHighlight onPress={() => this.showProductDetail(book)}
                          underlayColor='#dddddd'>
      <View>
          <View style={styles.cellContainer}>
            <Image
              source={{uri: imageURI}}
              style={styles.thumbnail} />
            <View style={styles.rightContainer}>
              <Text style={styles.title}>{book.volumeInfo.title}</Text>
              <Text style={styles.author}>{book.volumeInfo.authors}</Text>
            </View>
          </View>
          <View style={styles.separator} />
        </View>
      </TouchableHighlight>
    );
  }

  showProductDetail(book) {
    this.props.navigator.push({
      title:book.volumeInfo.title,
      name: 'productDetail',
      book: book
    });
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    marginBottom: 8
  },
  author: {
    color: '#656565'
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd',
  },
  listView: {
    flex: 1,
    backgroundColor: '#f5fcff',
  },
  cellContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
    padding: 10
  },
  thumbnail: {
    width: 53,
    height: 81,
    marginRight: 10
  },
  rightContainer: {
    flex: 1
  }
});

module.exports = SearchResults;
