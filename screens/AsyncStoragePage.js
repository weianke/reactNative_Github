import React, { Component } from 'react';

import { View, Text, TextInput, StyleSheet, AsyncStorage } from 'react-native'

const KEY = "save_key";
export default class AsyncStoragePage extends Component {

  constructor (props) {
    super(props)
     this.state = {
       value: ''
     }
  }
 
  doSave (){
    AsyncStorage.setItem(KEY, this.state.value, err => {
      err && console.log(err.toString())
    })
    this.setState({
      value: ''
    })
  }

  doRemove () {
    AsyncStorage.removeItem(KEY)
  }

  getData () {
     AsyncStorage.getItem(KEY).then(value => {
       this.setState({
         value: value
       })
     })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>AsyncStoragePage 页面</Text>
        <TextInput
          style={styles.input}
          value={this.state.value}
          onChangeText={text => {
            this.setState({
              value: text
            })
          }}
        />
        <View style={styles.input_container}>
          <Text
            onPress={() => {
              this.doSave()
            }}
          >
            存储
          </Text>
          <Text
            onPress={() => {
              this.doRemove()
            }}
          >
            删除
          </Text>
          <Text
            onPress={() => {
              this.getData()
            }}
          >
            获取
          </Text>
        </View>
        <Text />
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
    alignItems: 'center',
    justifyContent: 'space-around'
  }
})

