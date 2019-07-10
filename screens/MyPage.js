import React, { Component } from 'react'
import {
  createMaterialTopTabNavigator,
  createAppContainer
} from 'react-navigation'
import { View, Text, Button } from 'react-native'
import NavigationUti from '../navigation/NavigationUtil'

export default class MyPage extends Component {
  render() {
    return (
      <View>
        <Text>111</Text>
        <Text
          onPress={() => {
            NavigationUti.goPage(
              {
                navigation: this.props.navigation
              },
              'DetailPage'
            )
          }}
        >
          跳转详情页
        </Text>
        <View>
          <Button
            title="跳转fetch页面"
            onPress={() => {
              NavigationUti.goPage(
                {
                  navigation: this.props.navigation
                },
                'FetchDemoPage'
              )
            }}
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <Button
            title="跳转AsyncStorage页面"
            onPress={() => {
              NavigationUti.goPage(
                {
                  navigation: this.props.navigation
                },
                'AsyncStoragePage'
              )
            }}
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <Button
            title="跳转DataStorage页面"
            onPress={() => {
              NavigationUti.goPage(
                {
                  navigation: this.props.navigation
                },
                'DataStoreDemo'
              )
            }}
          />
        </View>
      </View>
    )
  }
}
