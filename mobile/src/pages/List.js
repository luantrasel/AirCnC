import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, Image, AsyncStorage, Text, StyleSheet } from 'react-native';

import SpotList from '../components/SpotList';

import logo from '../assets/logo.png';

export default function List() {
    const [techs, setTechs] = useState([]);

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