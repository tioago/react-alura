/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  FlatList,
  Dimensions
} from 'react-native';

const width = Dimensions.get('screen').width;


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  render() {
    const fotos = [{id:1, usuario: 'Tiago'},
      {id:2, usuario: 'Rafael'}, 
      {id:3, usuario: 'Alberto'}]

    return (
      <FlatList style={{marginTop: 20}}
        keyExtractor={item => item.id}
        data={fotos}
        renderItem={ ({item}) =>
          <View> 
            <Text>{item.usuario}</Text>
            <Image source={require('./resources/img/civil_war.jpeg')} 
                  style={{width: width, height: width}} />
          </View>

        }

      />

     
    );
  }
}


