import {
  createStackNavigator,
  createMaterialTopTabNavigator,
  createBottomTabNavigator,
  createSwitchNavigator
} from 'react-navigation'
import welcomePage from '../screens/welcomePage'
import HomePage from '../screens/HomePage'
import DetailPage from '../screens/DetailPage'

const InitNavigator = createStackNavigator({
  welcomePage: {
    screen: welcomePage,
    navigationOptions: {
      header: null
    }
  }
})

const MainNavigator = createStackNavigator({
  HomePage: {
    screen: HomePage,
    navigationOptions: {
      header: null
    }
  },
  DetailPage: {
    screen: DetailPage,
    navigationOptions: {
      header: null
    }
  }
})

// 初始化导航是启动页面，只加载一次，无法返回，Main区域是主要内容
export const RootNavigator = createAppContainer(
  createSwitchNavigator(
    {
      Init: InitNavigator,
      Main: MainNavigator
    },
    {
      navigationOptions: {
        header: null // 可以通过将header设为null 来禁用StackNavigator的Navigation Bar
      }
    }
  )
)
