import React, { Component } from 'react'
import {
  createMaterialTopTabNavigator,
  createAppContainer
} from 'react-navigation'
import NavigationBar from '../common/NavigationBar'
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native'
import NavigationUti from '../navigation/NavigationUtil'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'


const THEME_COLOR = '#678'

export default class MyPage extends Component {

  getLeftButton(callBack) {
      return (
        <TouchableOpacity
          style={{ padding: 8, paddingLeft: 12 }}
          onPress={callBack}
        >
          <Ionicons name={'ios-arrow-back'} size={26}  style={{color: 'white'}}/>
        </TouchableOpacity>
      )
  }

  getRightButton() {
    return <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={() => {

        }}>
          <View style={{padding: 5, marginRight: 8}}>
            <Feather 
                  name={'search'}
                  size={24}
                  style={{color: 'white'}}
            />
          </View>
        </TouchableOpacity>
      </View>
  }

  render() {
     let statusBar = {
       backgroundColor: THEME_COLOR,
       barStyle: 'light-content'
     }
     let navigationBar = (
       <NavigationBar
         title={'我的'}
         statusBar={statusBar}
         style={{ backgroundColor: THEME_COLOR }}
         rightButton={this.getRightButton()}
         leftButton={this.getLeftButton()}
       />
     )
    return (
      <View>
        {navigationBar}
        <Text>Mypage</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30
  },
  about_left: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  item: {
    backgroundColor: 'white',
    padding: 10,
    height: 90,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  groupTitle: {
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 5,
    fontSize: 12,
    color: 'gray'
  }
})
