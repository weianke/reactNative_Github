import React, { Component } from 'react';

import { View, Text } from 'react-native';

export default class AsyncStoragePage extends Component {

  doSave (){

  }

  doRemove () {

  }

  getData () {

  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>AsyncStoragePage 页面</Text>
        <View style={styles.input_container}>
          <Text onPress={() => {
            this.doSave()
          }}>存储</Text>
          <Text onPress={() => {
            this.doRemove()
          }}>删除</Text>
           <Text onPress={() => {
            this.getData()
          }}>获取</Text>
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
    alignItems: 'center'
  }
})

