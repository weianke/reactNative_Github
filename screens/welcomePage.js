import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NavigationUtil from '../navigation/NavigationUtil'


export default class welcomePage extends Component {
  componentDidMount () {
    this.timer = setTimeout(() => {
       NavigationUtil.resetToHomePage({
         navigation: this.props.navigation
       })
    }, 200);
  }

  componentWillUnmount () {
    this.timer && clearTimeout(this.timer)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>欢迎来到github</Text>
      </View>
    )
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    textAlign: 'center',
    fontSize: 32
  }
})
