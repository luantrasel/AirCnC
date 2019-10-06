import React, { useState, useEffect } from 'react';
import { View, AsyncStorage, KeyboardAvoidingView,  Platform, Image, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

import api from '../services/api';

import logo from '../assets/logo.png';

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [techs, setTechs] = useState('');

    //se o usuario ja tiver logado, direciona pra listagem
    useEffect(() => {
        AsyncStorage.getItem('user').then(user => {
            if (user){
                navigation.navigate('List');
            }
        })
    }, []);//array seria as variaveis que ao sofrerem alteracao disparam a funcao. No caso de array em branco, executa apenas 1x.

    async function handleSubmit(){
        const response = await api.post('/sessions', {
            email: email
        });

        const _id = response.data._id;
        await AsyncStorage.setItem('user', _id);
        await AsyncStorage.setItem('techs', techs);        

        navigation.navigate('List');
    }


    //KeyboardAvoidingView para evitar o teclado se sobrepondo aos inputs, buttons, etc
    //enabled={Platform.OS === 'ios'} teoricamente isso ficaria na linha do keyboardavoidingview, mas como no meu android isso tb da pau, deixei de fora
    return <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Image source={logo}/>

        <View style={styles.form}>            
            <Text style={styles.label}>SEU E-MAIL *</Text>
            <TextInput
                style={styles.input}
                placeholder='Seu e-mail'
                placeholderTextColor='#999'
                keyboardType='email-address'
                autoCapitalize='none'
                autoCorrect={false}
                value={email}
                onChangeText={(text => setEmail(text))}
            />

            <Text style={styles.label}>TECNOLOGIAS *</Text>
            <TextInput
                style={styles.input}
                placeholder='Tecnologias de seu interesse'
                placeholderTextColor='#999'
                autoCapitalize='words'
                autoCorrect={false}
                value={techs}
                onChangeText={(text => setTechs(text))}
            />

            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Encontrar Spots</Text>
            </TouchableOpacity>
        </View>
    </KeyboardAvoidingView>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
        
    },

    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30
    },

    label: {    
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8
    },

    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 15,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 2
    },

    button: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2        
    },

    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    }
})