import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native'
import DataStore from '../expand/dao/DataStore'


export default class DataStoragePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
    this.dataStore = new DataStore();
  }

  loadData = () => {
    let url = `https://api.github.com/search/repositories?q=${this.value}`;
    this.dataStore.fetchData(url).then(data => {
      console.log(data);
      let showData = `初次加载时间：${new Date(data.timestamp)}\n${JSON.stringify(data.data)}`;
      this.setState({
        text: showData
      })
    }).catch(error => {
      error && console.log(error.toString());
    })
  }

  render() {
    return (
      <View style={styles.container}>
          <Text>DataStorePage页面</Text>
          <TextInput 
            onChangeText={text => {
              this.value = text;
            }}
          />
            <Text onPress={() => {
              this.loadData()
            }}>请求数据</Text>
            <Text>{this.state.text}</Text>
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
