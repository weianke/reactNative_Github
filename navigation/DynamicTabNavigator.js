import React, { Component } from 'react'
import { createBottomTabNavigator, createAppContainer } from 'react-navigation'
import { connect } from 'react-redux'
// 自定义底部导航react-navigation-tabs插件，配合navigation使用
import { BottomTabBar } from 'react-navigation-tabs'
import { Image, FlatList, StyleSheet, Text, View, Button } from 'react-native'
import MyPage from './../screens/MyPage'
import FavoritePage from './../screens/FavoritePage'
import PopularPage from './../screens/PopularPage'
import TrendingPage from './../screens/TrendingPage'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import NavigationUtil from './NavigationUtil'


// 在这里配置页面的路由
const TABS = {
  PopularPage: {
    screen: PopularPage,
    navigationOptions: {
      tabBarLabel: '最热',
      tabBarIcon: ({ tintColor, focused }) => {
        return (
          <MaterialIcons
            name={'whatshot'}
            size={26}
            style={{ color: tintColor }}
          />
        )
      }
    }
  },
  TrendingPage: {
    screen: TrendingPage,
    navigationOptions: {
      tabBarLabel: '趋势',
      tabBarIcon: ({ tintColor, focused }) => {
        return (
          <Ionicons
            name={'md-trending-up'}
            size={26}
            style={{ color: tintColor }}
          />
        )
      }
    }
  },
  FavoritePage: {
    screen: FavoritePage,
    navigationOptions: {
      tabBarLabel: '收藏',
      tabBarIcon: ({ tintColor, focused }) => {
        return (
          <MaterialIcons
            name={'favorite'}
            size={26}
            style={{ color: tintColor }}
          />
        )
      }
    }
  },
  MyPage: {
    screen: MyPage,
    navigationOptions: {
      tabBarLabel: '我的',
      tabBarIcon: ({ tintColor, focused }) => {
        return <Entypo name={'user'} size={26} style={{ color: tintColor }} />
      }
    }
  }
}

class DynamicTabNavigator extends Component {
  constructor (props) {
    super(props)
  }

  _tabNavigator() {
    // 底部导航已经有了之后，state更新防止重新生成，避免回调到第一个tab
    if(this.Tabs) {
      return this.Tabs;
    }
    // 取出tabs显示的页面
    const { PopularPage, FavoritePage, MyPage, TrendingPage } = TABS
    const tabs = { PopularPage, TrendingPage , FavoritePage, MyPage} // 根据需要定制显示的tab
    PopularPage.navigationOptions.tabBarLabel = '最热'; // 动态配置Tab属性
    return this.Tabs = createAppContainer(createBottomTabNavigator(tabs, {
      tabBarComponent: props=> {
        return <TabBarComponent theme={this.props.theme} {...props}/>
      }
    }))
  }

  render() {
    // 路由都需要使用createAppContainer 容器进行包裹，否则就会报错
    const Tab = this._tabNavigator()
    return <Tab />
  }
}


class TabBarComponent extends Component {
  constructor(props) {
    super(props);
    this.theme = {
      tintColor: props.activeTintColor,  //从props中取到的
      updateTime: new Date().getTime()   // 标记位置时间戳
    }
  }

  render () {
    return <BottomTabBar 
            {...this.props}
            activeTintColor={this.props.theme}
           />
  }
}

const mapStateToProps = state => ({
  theme: state.theme.theme
})

export default connect(mapStateToProps)(DynamicTabNavigator)