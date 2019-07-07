import React, { Component } from 'react'
import { createBottomTabNavigator, createAppContainer } from 'react-navigation'
import { Image, FlatList, StyleSheet, Text, View, Button } from 'react-native'
import MyPage from './MyPage'
import FavoritePage from './FavoritePage'
import PopularPage from './PopularPage'
import TrendingPage from './TrendingPage'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import NavigationUtil from '../navigation/NavigationUtil'
import DynamicTabNavigator from '../navigation/DynamicTabNavigator'

export default class HomePage extends Component {

  render() {
    // 保存外层的路由, 缓存外部导航，作为内部掉外部的功能
    NavigationUtil.navigation = this.props.navigation
    return (
        <DynamicTabNavigator />
    )
  }
}