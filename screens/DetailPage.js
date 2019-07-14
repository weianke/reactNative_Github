import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  StyleSheet,
  TouchableOpacity,
  View,
  DeviceInfo
} from 'react-native'
import { WebView } from 'react-native-webview'
import NavigationBar from '../common/NavigationBar'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import ViewUtil from '../util/UtilView'
import NavigationUti from '../navigation/NavigationUtil'

const THEME_COLOR = '#678'
export default class DetailPage extends Component {
  constructor(props) {
    super(props)
    this.params = this.props.navigation.state.params
    const { projectModel } = this.params
    this.url = projectModel.html_url
    const title = projectModel.fullName || projectModel.full_name
    this.state = {
      title: title,
      url: this.url,
      canGoBack: false
    }
  }

  onBack() {
    if (this.state.canGoBack) {
      this.webView.goBack()
    } else {
      NavigationUti.goBack(this.props.navigation)
    }
  }

  renderRightButton() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={() => {}}>
          <FontAwesome
            name={'star-o'}
            size={20}
            style={{ color: 'white', marginRight: 10 }}
          />
        </TouchableOpacity>
        {ViewUtil.getShareButton(() => {})}
      </View>
    )
  }

  onNavigationStateChange(navState) {
    this.setState({
      canGoBack: navState.canGoBack,
      url: navState.url
    })
  }
  render() {
    console.log('url++++', this.state.url);
    const titleLayoutStyle = this.state.title.length > 20 ? { paddingRight: 30 } : null
    let navigationBar = (
      <NavigationBar
        title={this.state.title}
        titleLayoutStyle={titleLayoutStyle}
        leftButton={ViewUtil.getLeftBackButton(() => this.onBack())}
        style={{ backgroundColor: THEME_COLOR }}
        rightButton={this.renderRightButton()}
      />
    )
    return (
      <View>
        {navigationBar}
        <WebView
          ref={webView => (this.webView = webView)}
          startInLoadingState={true}
          onNavigationStateChange={e => this.onNavigationStateChange(e)}
          source={{ uri: this.state.url }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: DeviceInfo.isIPhoneX_deprecated ? 30 : 0
  }
})
