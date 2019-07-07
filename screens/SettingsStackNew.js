import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setDataId } from './../store/actions'
import { Image, FlatList, StyleSheet, Text, View, Button } from 'react-native'

class settingNew extends Component {
  static navigationOptions = {
    header: null
  }

  constructor (props) {
    super(props)
    this.state = {
      id: 1
    } 
  }

  render() {
    const { navigation} = this.props
    return (
      <View style={styles.container}>
        <Text>我是settingNew {this.props.id}</Text>
        <Button title="跳转" color="#841584" onPress={() => {
           this.setState({
             id: 133
           }, ()=> {
            //  console.log(this.state.id)
              this.props.setDataId(this.state.id)
              // console.log(this.props.id);
              navigation.navigate('HomeDetail')
           })
           
        }} />
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  }
})

const mapStateToProps = state => {
  return {
    id: state.setData.id
  }
}


const mapDispatchToProps = dispatch => {
  return {
    setDataId: (id) => dispatch(setDataId(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(settingNew)
