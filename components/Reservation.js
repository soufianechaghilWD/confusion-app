import React, { useState } from 'react';
import { Text, View, ScrollView, StyleSheet, Picker, Switch, Button, Modal, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Animatable from 'react-native-animatable';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';



function Reservation () {

    const [guests, setGuests] = useState(1)
    const [smoking, setSmoking] = useState(false)
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [modal, setModal] = useState(false)

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };
  const toggleModal = () => {
    setModal(!modal)
    }
    const handleReservation = () => {
        Alert.alert(
            'Your Reservation OK?',
            'Number of guests : ' + guests+"\nSmoking : "+smoking+" \nDate and Time : "+date,
            [
                { 
                
                    text: 'Cancel', 
                    onPress: () => console.log('Not Reserved'),
                    style: ' cancel'
                },
                {
                    text: 'OK',
                    onPress: () => {
                        presentLocalNotification(date)
                        console.log('Reserved')
                    }
                }
            ],
            { cancelable: false }
        );
        console.log(JSON.stringify({guests: guests, smoking: smoking, date: date}));
        //toggleModal()
    }
    
    const resetForm = () => {
        setGuests(1)
        setSmoking(false)
        setDate(new Date())
        setModal(false)
    }

    const  obtainNotificationPermission = async () =>  {
        let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
        if (permission.status !== 'granted') {
            permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
            if (permission.status !== 'granted') {
                Alert.alert('Permission not granted to show notifications');
            }
        }
        return permission;
    }

    const presentLocalNotification = async (date) => {
        await obtainNotificationPermission();
        Notifications.presentLocalNotificationAsync({
            title: 'Your Reservation',
            body: 'Reservation for '+ date + ' requested',
            ios: {
                sound: true
            },
            android: {
                sound: true,
                vibrate: true,
                color: '#512DA8'
            }
        });
    }

        return(
            <Animatable.View animation="zoomIn" duration={2000}>
            <ScrollView>
                <View style={styles.formRow}>
                <Text style={styles.formLabel}>Number of Guests</Text>
                <Picker
                    style={styles.formItem}
                    selectedValue={guests}
                    onValueChange={(itemValue, itemIndex) => setGuests(itemValue)}>
                    <Picker.Item label="1" value="1" />
                    <Picker.Item label="2" value="2" />
                    <Picker.Item label="3" value="3" />
                    <Picker.Item label="4" value="4" />
                    <Picker.Item label="5" value="5" />
                    <Picker.Item label="6" value="6" />
                </Picker>
                </View>
                <View style={styles.formRow}>
                <Text style={styles.formLabel}>Smoking/Non-Smoking?</Text>
                <Switch
                    style={styles.formItem}
                    value={smoking}
                    onTintColor='#512DA8'
                    onValueChange={(value) => setSmoking(value)}>
                </Switch>
                </View>
                <View style={styles.formRow}>
                <Text style={styles.formLabel}>Date and Time</Text>
                <View>
                <View style={styles.button}>
                    <Button onPress={showDatepicker} title="Choose Date" />
                </View>
                <View>
                    <Button onPress={showTimepicker} title="Choose Time" />
                </View>
                {show && (
                    <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                    />
                )}
                </View>
                </View>
                <View style={styles.formRow}>
                <Button
                    onPress={() => handleReservation()}
                    title="Reserve"
                    color="#512DA8"
                    accessibilityLabel="Learn more about this purple button"
                    />
                </View>
                <Modal animationType = {"slide"} transparent = {false}
                    visible = {modal}
                    onDismiss = {() => toggleModal }
                    onRequestClose = {() => toggleModal }>
                    <View style = {styles.modal}>
                        <Text style = {styles.modalTitle}>Your Reservation</Text>
                        <Text style = {styles.modalText}>Number of Guests: {guests}</Text>
                        <Text style = {styles.modalText}>Smoking?: {smoking ? 'Yes' : 'No'}</Text>
                        <Text style = {styles.modalText}>Date and Time: {JSON.stringify(date)}</Text>
                        <View>
                        <Button 
                            onPress = {() =>{toggleModal(); resetForm()}}
                            color="#512DA8"
                            title="Close" 
                            />
                    </View>
                    </View>
                    
                   
                </Modal>
                
            </ScrollView>
            </Animatable.View>

        );

};

const styles = StyleSheet.create({
    button: {
        marginBottom: 10
    },
    formRow: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row',
      margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
     },
     modalTitle: {
         fontSize: 24,
         fontWeight: 'bold',
         backgroundColor: '#512DA8',
         textAlign: 'center',
         color: 'white',
         marginBottom: 20
     },
     modalText: {
         fontSize: 18,
         margin: 10
     }
});

export default Reservation;