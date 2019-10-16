import React, { useState, useEffect } from 'react';
import { SafeAreaView, Alert, ScrollView, Image, AsyncStorage, Text, StyleSheet } from 'react-native';
import socketio from 'socket.io-client';

import SpotList from '../components/SpotList';

import logo from '../assets/logo.png';

export default function List() {
    const [techs, setTechs] = useState([]);


    useEffect(() => {
        AsyncStorage.getItem('user').then(user_id => {
            const socket = socketio('http://192.168.0.17:3333', {
                query: { user_id }
            });

            socket.on('booking_response', booking => {
                Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ?'APROVADA' : 'REJEITADA'}`);
            });

            socket.on('_ping', function(data){
                // console.log('Ping received from server. Sending pong to server');
                socket.emit('_pong', {beat: 1});
            });
        })
    },[]);

    useEffect(() => {    
        AsyncStorage.getItem('techs').then(storagedTechs => {
            const techsArray = storagedTechs.split(',').map(tech => tech.trim())                
            setTechs(techsArray);
        })              
    },[]);

    return (
        //nao ocupa areas como o relogio por exemplo
        <SafeAreaView style={styles.container}> 
            <Image source={logo} style={styles.logo}/>
            
            <ScrollView>
                {techs.map(tech => <SpotList key={tech} tech={tech}/>)}
            </ScrollView>            
        </SafeAreaView>
    )    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20, //safe area view bugado no meu android, a barra de notificacao tava tampando
        marginBottom: 20 //safe area view bugado no meu android, a barra de notificacao tava tampando
    },

    logo: {
        height: 32,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 10
    }
})