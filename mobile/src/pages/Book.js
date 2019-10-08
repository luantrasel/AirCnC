import React, { useState } from 'react';
import { SafeAreaView, Alert, Text, StyleSheet, AsyncStorage, TextInput, TouchableOpacity } from 'react-native';

import moment from 'moment';
import DatePicker from 'react-native-datepicker'

import api from '../services/api';

export default function Book({ navigation }) {
    const dateFormat = "DD/MM/YYYY";
    const currentDate = moment(new Date()).format(dateFormat);
    const [date, setDate] = useState(currentDate);
    const id = navigation.getParam('id');

    async function handleSubmit(){
        const user_id = await AsyncStorage.getItem('user');

        await api.post(`/spots/${id}/bookings`, {
            date 
        }, {
            headers: {user_id}
        });

        Alert.alert('Solicitação de reserva enviada.');
        navigation.navigate('List');
    }

    function handleCancel(){
        navigation.navigate('List');
    }

    return (
        <SafeAreaView style={styles.container}> 
            <Text style={styles.label}>DATA DE INTERESSE *</Text>            

            {/*https://github.com/xgfe/react-native-datepicker*/}
            <DatePicker
                date={date}
                format={dateFormat}
                showIcon={false}
                mode="date"            
                style={styles.datePicker}
                customStyles={{
                    dateInput: {                        
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: '#ddd',
                        color: '#444',                        
                    }
                }}
                // sem os textos, fica bugado no iOS
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                minDate={currentDate}
                
                // placeholder="select date"        
                // minDate="2016-05-01"
                // maxDate="2016-06-01"                
                // customStyles={{
                //   dateIcon: {
                //     position: 'absolute',
                //     left: 0,
                //     top: 4,
                //     marginLeft: 0
                //   },
                //   dateInput: {
                //     marginLeft: 36                
                //   }
                //   // ... You can check the source to find the other keys.
                // }}
                onDateChange={date => setDate(date)}                
            />

        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}>Solicitar Reserva</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleCancel} style={[styles.button, styles.cancelButton]}>
            <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({  
    container: { 
        margin: 30        
    },
    
    label: {    
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
        marginTop: 30
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

    cancelButton: {
        backgroundColor: '#ccc',
        marginTop: 10
    },

    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    },

    datePicker: {
        marginBottom: 8,
        width: '100%'
    }
});