import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  TextInput
  
} from 'react-native';

export default class InputComentario extends Component {

    constructor(props) {
        super(props);
        this.state = {
          valorComentario: ''
        }
      }

    render() {
        return(
            <View style={styles.container}>
                <TextInput style={styles.input}
                placeholder="Adicione um comentário..."
                underlineColorAndroid='transparent'
                ref={input => this.inputComentario = input}
                onChangeText={texto => this.setState({valorComentario: texto})} />
                <TouchableOpacity onPress={() => {
                    this.props.comentarioCallback(this.state.valorComentario, this.inputComentario);
                    this.setState({valorComentario: ''});
                }}>
                <Image style={styles.icone} source={require('../../resources/img/send.png')}/>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        flex: 1
      },
      icone: {
        width: 30,
        height: 30
        
      },
      container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
      }
})

