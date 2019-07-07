import React, { Component } from 'react'
import axios from 'axios'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  FlatList,
  ScrollView
} from 'react-native'

const baseUrl =
  'https://easy-mock.com/mock/5d1c53247abfb76fe0923cee/RnMovie/movie'
export default class settings extends Component {
  // 配置头部
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props)
    this.state = {
      data: ''
    }
  }

  componentDidMount() {
    this.getData()
  }

  async getData() {
    const res = await axios.get(baseUrl)
    console.log(res)
    this.setState({
      data: res.data.data.List
    })
  }

  render() {
    let list
    if (this.state.data && this.state.data.length > 0) {
      list = this.state.data.map((item, index) => {
        return (
          <View style={styles.container} key={index}>
            <Image source={{ uri: item.pictues }} style={styles.thumbnail} />
            <View style={styles.rightContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.year}>{item.year}</Text>
            </View>
          </View>
        )
      })
    } else {
      list = (
        <View style={styles.container}>
          <Text>Loading movies...</Text>
        </View>
      )
    }
    return (
      <ScrollView>
        <View>{list}</View>
      </ScrollView>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  rightContainer: {
    flex: 1
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center'
  },
  year: {
    textAlign: 'center'
  },
  thumbnail: {
    marginLeft: 15,
    width: 53,
    height: 81
  },
  list: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF'
  }
})