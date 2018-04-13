import React, { Component } from 'react';
import InputComentario from './InputComentario';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  FlatList,
  TouchableOpacity,
  TextInput
  
} from 'react-native';

const width = Dimensions.get('screen').width;

export default class Likes extends Component {

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
    
    render() {

        const { foto, likeCallback } = this.props; 

        return (
            <View>
                <TouchableOpacity onPress={() => {likeCallback(foto.id)}}>
                    <Image style={styles.botaoLike} 
                            source={this.carregaIcone(foto.likeada)}/>
                </TouchableOpacity>

                {this.exibeLikes(foto.likers)}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    botaoLike: {
        marginBottom: 10,
        width: 40,
        height: 40
    },
    likes: {
        fontWeight: 'bold',
    }
})


