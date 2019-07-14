import {
  createStackNavigator,
  createMaterialTopTabNavigator,
  createBottomTabNavigator,
  createSwitchNavigator,
  createAppContainer
} from 'react-navigation'
import welcomePage from '../screens/welcomePage'
import HomePage from '../screens/HomePage'
import DetailPage from '../screens/DetailPage'
import FetchDemoPage from '../screens/FetchDemoPage'
import AsyncStoragePage from '../screens/AsyncStoragePage'
import DataStoreDemo from '../screens/DataStoreDemo'
import { connect } from 'react-redux'
import {
  createReactNavigationReduxMiddleware,
  reduxifyNavigator
} from 'react-navigation-redux-helpers'

export const rootCom = 'Init' //设置根路由

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
  },
  FetchDemoPage: {
    screen: FetchDemoPage,
    navigationOptions: {
      // header: null
    }
  },
  AsyncStoragePage: {
    screen: AsyncStoragePage,
    navigationOptions: {
      // header: null
    }
  },
  DataStoreDemo: {
    screen: DataStoreDemo,
    navigationOptions: {
      // header: null
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

/**
 * 1.初始化react-navigation与redux的中间件，
 * 该方法的一个很大的作用就是为reduxifyNavigator的key设置actionSubscribers(行为订阅者)
 * 设置订阅者@https://github.com/react-navigation/react-navigation-redux-helpers/blob/master/src/middleware.js#L29
 * 检测订阅者是否存在@https://github.com/react-navigation/react-navigation-redux-helpers/blob/master/src/middleware.js#L97
 * @type {Middleware}
 */
export const middleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav
)

/**
 * 2.将根导航器组件传递给 reduxifyNavigator 函数,
 * 并返回一个将navigation state 和 dispatch 函数作为 props的新组件；
 * 注意：要在createReactNavigationReduxMiddleware之后执行
 */
const AppWithNavigationState = reduxifyNavigator(RootNavigator, 'root')

/**
 * State到Props的映射关系
 * @param state
 */
const mapStateToProps = state => ({
  state: state.nav //v2
})
/**
 * 3.连接 React 组件与 Redux store
 */
export default connect(mapStateToProps)(AppWithNavigationState)
