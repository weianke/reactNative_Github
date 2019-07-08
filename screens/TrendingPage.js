import React, { Component } from 'react';
import { View, Text, Button} from 'react-native';
import {connect} from 'react-redux'
import actions from './../action/index'


class TrendingPage extends Component {
  render() {
    return (
      <View>
        <Text>trending页面</Text>
        <Button title="改变主题色" onPress={()=> {
            this.props.onThemeChange('#096')
        }}/>
      </View>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  onThemeChange: theme => dispatch(actions.onThemeChange(theme))
})

export default connect(null, mapDispatchToProps)(TrendingPage)
