import React, { Component } from 'react'
import { Image, FlatList, StyleSheet, Text, View, Button } from 'react-native'

const REQUEST_URL =
  'https://raw.githubusercontent.com/facebook/react-native/0.51-stable/docs/MoviesExample.json'

export default class homeScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      loaded: false
    }
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData() {
    fetch(REQUEST_URL)
      .then(response => response.json())
      .then(resData => {
        this.setState({
          data: resData.movies,
          loaded: true
        })
      })
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView()
    }
    return (
      <FlatList
        data={this.state.data}
        renderItem={this.renderMovie}
        style={StyleSheet.list}
        keyExtractor={item => item.id}
      />
    )
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>Loading Movie...</Text>
      </View>
    )
  }

  renderMovie({ item }) {
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: item.posters.thumbnail }}
          style={styles.thumbnail}
        />
        <View style={styles.rightCcontainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.year}>{item.year}</Text>
        </View>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  rightCcontainer: {
    flex: 1
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center'
  },
  year: {
    textAlign: 'center'
  },
  thumbnail: {
    width: 53,
    height: 81
  },
  list: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF'
  }
})

homeScreen.navigationOptions = {
  // headerTintColor: 'red',
  // mode: 'modal',
  header: null
  // title: '返回',
  // headerTitle: <Button title="返回"/>,
}
