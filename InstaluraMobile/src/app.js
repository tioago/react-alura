/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';

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
import Post from './components/Post';


const width = Dimensions.get('screen').width;

/*
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
*/

class app extends Component {
  constructor() {
    super();
    this.state = {
      fotos: []
    }
  }

  componentDidMount() {
    fetch('https://instalura-api.herokuapp.com/api/public/fotos/rafael')
    .then(resposta => resposta.json())
    .then(json => this.setState({fotos: json}))
  }

  render() {
    return (
      <FlatList style={styles.container}
        keyExtractor={item => item.id}
        data={this.state.fotos}
        renderItem={ ({item}) =>
          <Post foto={item}/>

        }

      />

     
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20
  }
});

export default() => {
    AppRegistry.registerComponent('InstaluraMobile', () => app);
    
}


