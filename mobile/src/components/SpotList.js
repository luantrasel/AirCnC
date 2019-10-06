import React, { useState, useEffect } from 'react';
import { withNavigation } from 'react-navigation';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';

import api from '../services/api';

function SpotList(props){
    const [spots, setSpots] = useState([]);

    useEffect(() => {
        async function loadSpots() {
            const response = await api.get('/spots', {
                params: {
                    tech: props.tech
                }
            });

            setSpots(response.data);
        }

        loadSpots();
    },[]);

    function handleNavigate(id){
        /* para o navigation funcionar aqui dentro do compontente, foi necessario o comando
           withNavigation que está bem no final. na linha do export default */
        props.navigation.navigate('Book', { id }); 

    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Empresas que usam <Text style={styles.bold}>{props.tech}</Text></Text>
            <FlatList
                style={styles.list}
                data={spots}
                keyExtractor={spot => spot._id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={styles.listItem}>
                        <Image style={styles.thumbnail} source={{uri: item.thumbnail_url}}/>
                        <Text style={styles.company}>{item.company}</Text>
                        <Text style={styles.price}>{item.price ? `R$${item.price}/dia` : 'GRATUITO'}</Text>
                        {/* nao da pra colocar direto handleNavigate(item._id) pois senao ele ia direto executar a funcao, por isso temque colocar o () => {handleNavigate(item._id)} */}
                        <TouchableOpacity onPress={() => handleNavigate(item._id)} style={styles.button}>
                            <Text style={styles.buttonText}>Solicitar Reserva</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        marginTop: 30
    },

    title: {
        fontSize: 20,
        color: '#444',
        paddingHorizontal: 20,
        marginBottom: 15,
    },

    bold: {
        fontWeight: 'bold'
    },

    list: {
        paddingHorizontal: 20
    },

    listItem: {
        marginRight: 15
    }, 

    thumbnail: {
        width: 200,
        height: 120,
        resizeMode: 'cover',
        borderRadius: 2
    },

    company: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10
    },

    price: {
        fontSize: 15,
        color: '#999',
        marginTop: 5
    },

    button: {
        height: 32,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        marginTop: 15
    },

    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15
    }

});

export default withNavigation(SpotList);