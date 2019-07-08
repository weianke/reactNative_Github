import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, Button } from 'react-native'

export default class FetchDemoPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showText: ''
    }
  }
  loadData() {
    let url = `https://api.github.com/search/repositories?q=${this.searchKey}`;
    fetch(url)
      .then(response => response.text())
      .then(res => {
        this.setState({
          showText: res
        })
      })
  }

  loadData2 () {
    let url = `https://api.github.com/search/repositories?q=${this.searchKey}`;
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.text();
        }
        throw new Error('Network response was not ok..')
      })
      .then(res => {
        this.setState({
          showText: res
        })
      })
      .catch(e => {
        this.setState({
          showText: e.toString()
        })
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>fetch 页面</Text>
        <View style={styles.input_container}>
          <TextInput
            style={styles.input}
            onChangeText={text => {
              this.searchKey = text
            }}
          />
          <Button
            title="获取"
            onPress={() => {
              this.loadData2()
            }}
          />
        </View>
        <Text>{this.state.showText}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  input: {
    height: 30,
    flex: 1,
    borderColor: 'black',
    borderWidth: 1,
    marginRight: 10
  },
  input_container: {
    flexDirection: 'row',
    alignItems: 'center'
  }
})
