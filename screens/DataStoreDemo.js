import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native'


export default class DataStoragePage extends Component {
  render() {
    return (
      <View style={styles.container}>
          <Text>DataStorePage页面</Text>
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
