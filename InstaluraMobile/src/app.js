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

  like(idFoto) {
    const foto = this.state.fotos.find(foto => foto.id === idFoto)

    let novaLista = [];
    if (foto.likeada) {
      novaLista = [
        ...foto.likers,
        {login: foto.loginUsuario}
      ]
    } else {
      novaLista = foto.likers.filter(liker => {
        return liker.login !== foto.loginUsuario
      });
    }

    const fotoAtualizada = {
      ...foto,
      likeada: !foto.likeada,
      likers: novaLista
    }
    
    const fotos = this.state.fotos.map(foto => foto.id === fotoAtualizada.id ? fotoAtualizada : foto);

    this.setState({fotos})
    
  }

  render() {
    return (
      <FlatList style={styles.container}
        keyExtractor={item => item.id}
        data={this.state.fotos}
        renderItem={ ({item}) =>
          <Post foto={item}
                likeCallback={this.like.bind(this)}/>
        }

      />

     
    );
  }
}

const margem = Platform.OS === 'ios' ? 20: 0
const styles = StyleSheet.create({
  container: {
    marginTop: margem
  }
});

export default() => {
    AppRegistry.registerComponent('InstaluraMobile', () => app);
    
}


