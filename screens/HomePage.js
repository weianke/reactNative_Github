import React, { Component } from 'react'
import { createBottomTabNavigator, createAppContainer } from 'react-navigation'
import { Image, FlatList, StyleSheet, Text, View, Button } from 'react-native'
import MyPage from './MyPage'
import FavoritePage from './FavoritePage'
import PopularPage from './PopularPage'
import TrendingPage from './TrendingPage'


export default class HomePage extends Component {
  _tabNavigator() {
    return createAppContainer(createBottomTabNavigator({
      PopularPage: {
        screen: PopularPage
      },
      TrendingPage: {
        screen: TrendingPage
      },
      FavoritePage: {
        screen: FavoritePage
      },
      MyPage: {
        screen: MyPage
      }
    }))
  }

  render() {
    const Tab = this._tabNavigator();
    return <Tab />
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  rightCcontainer: {
    flex: 1
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center'
  },
  year: {
    textAlign: 'center'
  },
  thumbnail: {
    width: 53,
    height: 81
  },
  list: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF'
  }
})
