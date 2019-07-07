/**
 *
 *
 * 全局导航跳转工具类
 * @class NavigationUtil
 */

export default class NavigationUtil {
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
    console.log(params);
    const { navigation } = params
    // 跳转首页
    navigation.navigate('Main')
  }
}
