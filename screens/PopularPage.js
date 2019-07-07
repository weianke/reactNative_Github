import React, { Component } from 'react';
import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation'
import { View, Text, Button} from 'react-native';
import NavigationUti from '../navigation/NavigationUtil'


export default class screens extends Component {


  render() {
    const TabNavigator = createAppContainer(createMaterialTopTabNavigator({
      PopularTab1: {
        screen: PopularTab,
        navigationOptions: {
          title: 'Tab1'
        }
      },
      PopularTab2: {
        screen: PopularTab,
        navigationOptions: {
          title: 'Tab2'
        }
      },
      PopularTab3: {
        screen: PopularTab,
        navigationOptions: {
          title: 'Tab3'
        }
      }
    }))
    return (
      <View style={{flex:1, marginTop: 30}}>
        <TabNavigator />
      </View>
    )
  }
}

class PopularTab extends Component {
  render() {
    const {tabLabel} = this.props;
    return (
      <View>
        <Text>{tabLabel}</Text>
        <Text onPress={()=> {
          NavigationUti.goPage({
            navigation: this.props.navigation
          }, "DetailPage")
        }}>跳转详情页</Text>
      </View>
    )
  }
}
