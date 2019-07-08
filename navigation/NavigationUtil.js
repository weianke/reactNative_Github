/**
 *
 *
 * 全局导航跳转工具类
 * @class NavigationUtil
 */
export default class NavigationUtil {
  /**
   *跳转到指定页面
   * @param {*} params 要传递的参数
   * @param {*} page 要跳转的页面名
   */
  static goPage(params, page) {
    // 存储最外层的导航路由
    const navigation = NavigationUtil.navigation;
    if (!navigation) {
      console.log('NavigationUtil.navigation can not be null!')
      return
    }
    navigation.navigate(
      page,
      {
        ...params
      }
    )
  }
  /**
   * 返回上一页
   * @param {*} navigation
   */
  static goBack (navigation) {
    navigation.goBack();
  }

  /**
   * 重置到首页
   * @param {*} navigation
   */
  static resetToHomePage(params) {
    const { navigation } = params
    // 跳转首页
    navigation.navigate('Main')
  }
}