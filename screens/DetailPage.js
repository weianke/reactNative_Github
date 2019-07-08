import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, Button } from 'react-native'

export default class DetailPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: 0
    }
  }
  render() {
    return (
      <View>
        <Text>我是HOME-子页面 {this.props.id}</Text>
        <Button title="跳转"/>
      </View>
    )
  }
}