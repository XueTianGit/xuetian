/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Actions} from 'react-native-router-flux';

export default class FirstPage extends Component{
  render() {
    return (
        <View style={styles.container}>
          <Text style={styles.welcome} onPress={()=> Actions.one()}>
            我是FirstPage
          </Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  welcome:{
    justifyContent: 'center',
    alignSelf:'center',
  }
});


