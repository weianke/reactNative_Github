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
  ActivityIndicator,
  TouchableOpacity,
  Modal
} from 'react-native'
import Toast from 'react-native-easy-toast'
import { connect } from 'react-redux'
import actions from '../action/index'
import NavigationUti from '../navigation/NavigationUtil'
import NavigationBar from '../common/NavigationBar'
import PopularItem from '../common/PopularItem'
import TrendingDialog, {TimeSpans} from '../components/TrendingDialog'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'


const URL = 'https://api.github.com/search/repositories?q='
const QUERY_STR = '&sort=stars'
const THEME_COLOR = '#678'
class TrendingPage extends Component {
  constructor(props) {
    super(props)
    this.tabNames = ['JavaScript', 'TypeScript', 'Vue', 'CSS', 'React']
    this.state = {
      timeSpan: TimeSpans[0]
    }
  }

  _getTabs() {
    const tabs = {}
    const { theme } = this.props
    this.tabNames.forEach((item, index) => {
      tabs[`tab${index}`] = {
        screen: props => <TrendingTabPage {...props} tabLabel={item} />,
        navigationOptions: {
          title: item
        }
      }
    })
    return tabs
  }

  renderTitleView() {
    return <View>
            <TouchableOpacity
                underlayColor='transparent'
                onPress={() => this.dialog.onShow()}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{
                        fontSize: 18,
                        color: '#FFFFFF',
                        fontWeight: '400'
                    }}>趋势 {this.state.timeSpan.showText}</Text>
                    <MaterialIcons
                        name={'arrow-drop-down'}
                        size={22}
                        style={{color: 'white'}}
                    />
                </View>
            </TouchableOpacity>
        </View>
  }

  onSelectTimeSpan(tab) {
    this.dialog.dismiss();
    this.setState({
      timeSpan: tab
    })
  }

  renderTrendingDialog() {
    return <TrendingDialog 
              ref={dialog => this.dialog = dialog}
              onSelect={tab => this.onSelectTimeSpan(tab)}
    />
  }
  render() {
    const { theme } = this.props
    let statusBar = {
      backgroundColor: THEME_COLOR,
      barStyle: 'light-content'
    }
    let navigationBar = (
      <NavigationBar
        titleView={this.renderTitleView()}
        statusBar={statusBar}
        style={{ backgroundColor: THEME_COLOR }}
      />
    )
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
        <View style={styles.container}>
          {navigationBar}
          <TabNavigator />
          {this.renderTrendingDialog()}
        </View>
    )
  }
}

const mapPopularStateToProps = state => ({
  theme: state.theme.theme
})

export default connect(mapPopularStateToProps)(TrendingPage)

const pageSize = 10 //设为常量，防止修改
class TrendingTab extends Component {
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
    const { onLoadMoreTrending, onRefreshTrending } = this.props
    const store = this._store()
    const url = this.genFetchUrl(this.storeName) // 通过storeName 生成url
    if (loadMore) {
      onLoadMoreTrending(
        this.storeName,
        ++store.pageIndex,
        pageSize,
        store.items,
        callBack => {
          this.refs.toast.show('没有更多了')
        }
      )
    } else {
      onRefreshTrending(this.storeName, url, pageSize)
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
    const { trending } = this.props
    let store = trending[this.storeName]

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
  trending: state.trending,
  theme: state.theme.theme
})

const mapDispatchToProps = dispatch => ({
  onRefreshTrending: (storeName, url, pageSize) =>
    dispatch(actions.onRefreshTrending(storeName, url, pageSize)),
  onLoadMoreTrending: (storeName, pageIndex, pageSize, items, callBack) =>
    dispatch(
      actions.onLoadMoreTrending(
        storeName,
        pageIndex,
        pageSize,
        items,
        callBack
      )
    )
})

//注意：connect只是个function，并不应定非要放在export后面
/**
 * 子组件订阅state,并设置常量 ，父组件可直接使用
 */
const TrendingTabPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(TrendingTab)

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
