import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, Button } from 'react-native'

export default class DetailPage extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <View>
        <Text>我是HOME-子页面 {this.props.id}</Text>
      </View>
    )
  }
}