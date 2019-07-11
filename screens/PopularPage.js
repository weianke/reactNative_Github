import React, { Component } from 'react'
import {
  createMaterialTopTabNavigator,
  createAppContainer
} from 'react-navigation'
import {
  FlatList,
  RefreshControl,
  View,
  Text,
  Button,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator
} from 'react-native'
import Toast from 'react-native-easy-toast'
import { connect } from 'react-redux'
import actions from '../action/index'
import NavigationUti from '../navigation/NavigationUtil'
import PopularItem from '../common/PopularItem'

const URL = 'https://api.github.com/search/repositories?q='
const QUERY_STR = '&sort=stars'
const TITLE_COLOR = 'red'
class PopularPage extends Component {
  constructor(props) {
    super(props)
    this.tabNames = ['java', 'Android', 'iOS', 'React', 'React Native', 'PHP']
  }

  _getTabs() {
    const tabs = {}
    const { theme } = this.props
    this.tabNames.forEach((item, index) => {
      tabs[`tab${index}`] = {
        screen: props => <PopularTabPage {...props} tabLabel={item} />,
        navigationOptions: {
          title: item
        }
      }
    })
    return tabs
  }

  render() {
    const { theme } = this.props
    console.log('theme', theme)
    const TabNavigator = createAppContainer(
      createMaterialTopTabNavigator(this._getTabs(), {
        tabBarOptions: {
          tabStyle: styles.tabStyle,
          upperCaseLabel: false, //是否使标签大写，默认为true
          scrollEnabled: true, //是否支持 选项卡滚动，默认false
          style: {
            backgroundColor: '#678', //TabBar 的背景颜色
            height: 40 //fix 开启scrollEnabled后再Android上初次加载时闪烁问题
          },
          indicatorStyle: styles.indicatorStyle, //标签指示器的样式
          labelStyle: styles.labelStyle //文字的样式
        }
      })
    )
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={styles.container}>
          <TabNavigator />
        </View>
      </SafeAreaView>
    )
  }
}

const mapPopularStateToProps = state => ({
  theme: state.theme.theme
})

export default connect(mapPopularStateToProps)(PopularPage)

const pageSize = 10;//设为常量，防止修改
class PopularTab extends Component {
  constructor(props) {
    super(props)
    const { tabLabel } = this.props
    this.storeName = tabLabel
    this.loading = false
  }

  componentDidMount() {
    this.loadData()
  }

  loadData(loadMore) {
    const { onRefreshPopular, onLoadMorePopular } = this.props
    const store = this._store()
    const url = this.genFetchUrl(this.storeName) // 通过storeName 生成url
    if (loadMore) {
      onLoadMorePopular(
        this.storeName,
        ++store.pageIndex,
        pageSize,
        store.items,
        callBack => {
          this.refs.toast.show('没有更多了')
        }
      )
    } else {
      onRefreshPopular(this.storeName, url, pageSize)
    }
  }

  genFetchUrl(key) {
    return URL + key + QUERY_STR
  }

  renderItem(data) {
    const item = data.item
    return <PopularItem item={item} onSelect={() => {}} />
  }

  /**
   * 获取与当前页面有关的数据
   * @returns {*}
   * @private
   */
  _store() {
    const { popular } = this.props
    let store = popular[this.storeName]

    if (!store) {
      store = {
        items: [],
        isLoading: false,
        projectModels: [], //要显示的数据
        hideLoadingMore: true //默认隐藏加载更多
      }
    }
    return store
  }

  genIndicator() {
    return this._store().hideLoadingMore ? null : (
      <View style={styles.indicatorContainer}>
        <ActivityIndicator color="red" style={{ margin: 10 }} />
        <Text>正在加载更多</Text>
      </View>
    )
  }

  getEmpty() {
    return (
      <View style={styles.emptyContainer}>
        <ActivityIndicator color="red" style={{ margin: 10 }} />
        <Text>Loading</Text>
      </View>
    )
  }

  getLoadingHeader() {
    return this._store().isLoading ? (
      <View style={styles.indicatorContainer}>
        <ActivityIndicator color="red" style={{ margin: 10 }} />
        <Text>头部刷新</Text>
      </View>
    ) : null
  }

  render() {
    let store = this._store()
    if (store.isLoading) {
      return this.getEmpty()
    }
    return (
      <View style={styles.container}>
        <FlatList
          // 数据源
          data={store.projectModels}
          //item显示的布局
          renderItem={data => this.renderItem(data)}
          keyExtractor={item => '' + item.id}
          refreshing={store.isLoading}
          onRefresh={() => this.loadData()}
          ListHeaderComponent={() => this.getLoadingHeader()}
          //下拉刷新相关
          // refreshControl={
          //   <RefreshControl
          //     title={'Loading'}
          //     titleColor={TITLE_COLOR}
          //     colors={[TITLE_COLOR]}
          //     refreshing={store.isLoading}
          //     onRefresh={() => this.loadData()}
          //     tintColor={TITLE_COLOR}
          //   />
          // }
          ListFooterComponent={() => this.genIndicator()}
          onEndReached={() => {
            console.log('---onEndReached--')
            this.loadData(true)
          }}
          onEndReachedThreshold={0.5}
        />
        <Toast ref={'toast'} position={'center'} />
      </View>
    )
  }
}
const mapStateToProps = state => ({
  popular: state.popular,
  theme: state.theme.theme
})

const mapDispatchToProps = dispatch => ({
  onRefreshPopular: (storeName, url, pageSize) =>
    dispatch(actions.onRefreshPopular(storeName, url, pageSize)),
  onLoadMorePopular: (storeName, pageIndex, pageSize, items, callBack) =>
    dispatch(actions.onLoadMorePopular(storeName, pageIndex, pageSize, items, callBack))
})

//注意：connect只是个function，并不应定非要放在export后面
/**
 * 子组件订阅state,并设置常量 ，父组件可直接使用
 */
const PopularTabPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(PopularTab)

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  tabStyle: {
    // minWidth: 50 //fix minWidth会导致tabStyle初次加载时闪烁
    padding: 0
  },
  indicatorStyle: {
    height: 2,
    backgroundColor: 'white'
  },
  labelStyle: {
    fontSize: 15,
    margin: 0,
    lineHeight: 40
  },
  indicatorContainer: {
    alignItems: 'center'
  },
  indicator: {
    color: 'red',
    margin: 10
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
})
