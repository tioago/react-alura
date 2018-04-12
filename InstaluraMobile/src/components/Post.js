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
  Dimensions,
  TouchableOpacity
} from 'react-native';

const width = Dimensions.get('screen').width;

export default class Post extends Component {

  constructor(props) {
    super(props);
    this.state = {
      foto: this.props.foto
    }
  }

  carregaIcone(likeada) {
    return likeada ? require('../../resources/img/like.png') :
                    require("../../resources/img/liked.png")
  }

  exibeLikes(likers) {
    if (likers.length <=0) {
      return;
    } 
    return (
      <Text style={styles.likes}>
                {likers.length} {likers.length > 1 ? "curtidas" : "curtida"}
      </Text>
    )
    
  }

  exibeLegenda(foto) {
    if (foto.comentario === '') {
      return;
    } 
    return (
      <View style={styles.comentario} >
                <Text style={styles.tituloComentario}>{foto.loginUsuario}</Text>
                <Text>{foto.comentario}</Text>
              </View>
    )
  }

  like() {
    const { foto } = this.state;


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
    
    this.setState({foto: fotoAtualizada})
    
  }


  render() {

    const { foto } = this.state;

    return (
        <View> 
            <View style={styles.cabecalho}>
                <Image source={{uri: foto.urlPerfil}} 
                    style={styles.fotoDePerfil} />
                <Text>{foto.loginUsuario}</Text>
            </View>
            <Image source={{uri: foto.urlFoto}} 
                    style={styles.fotoPost} />

            <View style={styles.rodape} >
              <TouchableOpacity onPress={this.like.bind(this)}>
                <Image style={styles.botaoLike} 
                        source={this.carregaIcone(foto.likeada)}/>
              </TouchableOpacity>

              {this.exibeLikes(foto.likers)}
              {this.exibeLegenda(foto)}

            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  cabecalho: {
    flexDirection: 'row', 
    margin: 10, 
    alignItems: 'center'
  },
  fotoDePerfil: {
    marginRight: 10, 
    borderRadius: 20, 
    width: 40, 
    height: 40
  },
  fotoPost: {
    width: width, 
    height: width
  },
  botaoLike: {
    marginBottom: 10,
    width: 40,
    height: 40
  },
  rodape: {
    margin: 10
  },
  likes: {
    fontWeight: 'bold',
  },
  comentario: {
    flexDirection: 'row'
  },
  tituloComentario: {
    fontWeight: 'bold',
    marginRight: 5
  }
});


