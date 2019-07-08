import React, { Component } from 'react'
import { createBottomTabNavigator, createAppContainer } from 'react-navigation'
import { Image, FlatList, StyleSheet, Text, View, Button } from 'react-native'
import MyPage from './MyPage'
import FavoritePage from './FavoritePage'
import PopularPage from './PopularPage'
import TrendingPage from './TrendingPage'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import NavigationUtil from '../navigation/NavigationUtil'
import DynamicTabNavigator from '../navigation/DynamicTabNavigator'
import { BackHandle } from 'react-native'
import { NavigationActions } from 'react-navigation'
import {connect} from 'react-redux'

class HomePage extends Component {
  /**
   *
   * 处理安卓物理返回键 ，沙盒环境web端无法获取BackHandle
   */
  //  componentDidMount() {
  //    BackHandle.addEventListener("hardwareBackPress", this.onBackPress);
  //  }

  //  componentWillUnmount() {
  //    BackHandle.removeEventListener('hardwareBackPress', this.onBackPress);
  //  }

  //  /**
  //   *处理Android的物理返回值
  //   */
  //  onBackPress = () => {
  //    const {dispatch, nav} = this.props;
  //    if (nav.routes[1].index === 0) {//如果RootNavigator中的MainNavigator的index为0，则不处理返回事件
  //       return false;
  //    }
  //    dispatch(NavigationActions.back())
  //    return true;
  //  }

  render() {
    // 保存外层的路由, 缓存外部导航，作为内部掉外部的功能
    NavigationUtil.navigation = this.props.navigation
    return <DynamicTabNavigator />
  }
}

const mapStateToProps = state => ({
  nav: state.nav
})

export default connect(mapStateToProps)(HomePage)