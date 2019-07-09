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
  StyleSheet
} from 'react-native'
import { connect } from 'react-redux'
import actions from '../action/index'
import NavigationUti from '../navigation/NavigationUtil'

const URL = 'https://api.github.com/search/repositories?q='
const QUERY_STR = '&sort=stars'
const TITLE_COLOR = 'red'
export default class PopularPage extends Component {
  constructor(props) {
    super(props)
    this.tabNames = ['java', 'Android', 'iOS', 'React', 'React Native', 'PHP'];
  }

  _getTabs() {
    const tabs = {}
    const {theme } = this.props
    this.tabNames.forEach((item, index) => {
      tabs[`tab${index}`] = {
        screen: props => <PopularTabPage {...props} tabLabel={item} />,
        navigationOptions: {
          title: item
        }
      }
    });
    return tabs;
  }

  render() {
    const {theme} = this.props;
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
      console.log('tabs', this._getTabs())

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={styles.container}>
          <TabNavigator />
        </View>
      </SafeAreaView>
    )
  }
}

class PopularTab extends Component {
  constructor(props) {
    super(props)
    const { tabLabel } = this.props;
    this.storeName = tabLabel;
  }

  componentDidMount() {
    this.loadData()
  }

  loadData() {
    const { onLoadPuplarData } = this.props
    const url = this.genFetchUrl(this.storeName) // 通过storeName 生成url
    onLoadPuplarData(this.storeName, url)
  }

  genFetchUrl(key) {
    return URL + key + QUERY_STR
  }

  renderItem(data) {
    const item = data.item
    return (
      <View style={{ marginBottom: 10 }}>
        <Text style={{ backgroundColor: '#faa' }}>{JSON.stringify(item)}</Text>
      </View>
    )
  }

  render() {
    const { popular } = this.props
    let store = popular[this.storeName] // 动态获取state
    if (!store) {
      store = {
        items: [],
        isLoading: false
      }
    }
    return (
      <View style={styles.container}>
        <FlatList
          // 数据源
          data={store.items}
          //item显示的布局
          renderItem={data => this.renderItem(data)}
          keyExtractor={item => '' + item.id}
          //下拉刷新相关
          refreshControl={
            <RefreshControl
              title={'Loading'}
              titleColor={TITLE_COLOR}
              colors={[TITLE_COLOR]}
              refreshing={store.isLoading}
              onRefresh={() => this.loadData()}
              tintColor={TITLE_COLOR}
            />
          }
        />
      </View>
    )
  }
}
const mapStateToProps = state => ({
  popular: state.popular,
  theme: state.theme
})

const mapDispatchToProps = dispatch => ({
  onLoadPuplarData: (storeName, url) =>
    dispatch(actions.onLoadPuplarData(storeName, url))
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
  }
})
