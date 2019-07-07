import React, { Component } from 'react';
import { View, Text, Button} from 'react-native';


export default class TrendingPage extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <View>
        <Text>trending页面</Text>
        <Button title="改变主题色" onPress={()=> {
            navigation.setParams({
              theme: {
                tintColor: 'red',
                updateTime: new Date().getTime()
              }
            })
        }}/>
      </View>
    )
  }
}
