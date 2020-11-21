import React from 'react'
import { Card, Button, Icon } from 'react-native-elements';
import { Text, ScrollView } from 'react-native';
import * as Animatable from 'react-native-animatable';
//import * as MailComposer from 'expo-mail-composer';

function Contact() {


    const sendMail = () =>  {
        MailComposer.composeAsync({
            recipients: ['confusion@food.net'],
            subject: 'Enquiry',
            body: 'To whom it may concern:'
        })
    }

    return (
        <ScrollView>
            <Animatable.View animation="fadeInDown" duration={2000}>
                <Card>
                    <Card.Title>Contact Information</Card.Title>
                    <Text>121, Clear Water Bay Road</Text>
                    <Text>Clear Water Bay, Kowloon</Text>
                    <Text>HONG KONG</Text>
                    <Text>Tel: +852 1234 5678</Text>
                    <Text>Fax: +852 8765 4321</Text>
                    <Text>Email:confusion@food.net</Text>
                    <Button
                        title="Send Email"
                        buttonStyle={{backgroundColor: "#512DA8"}}
                        icon={<Icon name='envelope-o' type='font-awesome' color='white' />}
                        onPress={() => console.log('hey')}
                    /> 
                </Card>
            </Animatable.View>
        </ScrollView>
        
    )
}

export default Contact
