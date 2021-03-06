import React, { useState, useEffect } from 'react'
import { Card } from 'react-native-elements';
import { FlatList, Text , SafeAreaView, ScrollView, View, StyleSheet } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements'
import { useStateValue } from "./stateProvider";
import { baseUrl } from '../shared/baseUrl';
import Loading from './Loading';
import * as Animatable from 'react-native-animatable';


function About(props) {

    const [{leaders}, dispatch] = useStateValue();




    const renderItem = ({ item, i }) => (
        <ListItem key={i} >
            <Avatar source={{uri: baseUrl +'/'+ item.image}} />
            <ListItem.Content>
                <ListItem.Title >{item.name}</ListItem.Title>
                <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    );

    return (
        <ScrollView>
            <Card>
                <Card.Title>Our History</Card.Title>
                <Text>Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.
                        The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.
                </Text>
                <Card.Title style={{marginTop: 20}}>Corporate Leadership</Card.Title>
                {leaders.length === 0 ? <Loading /> : 
                <SafeAreaView style={styles.container}>
                    <Animatable.View animation="fadeInDown" duration={2000}>
                        <FlatList
                            data={leaders}
                            renderItem={renderItem}
                            keyExtractor={item => item.id.toString()}
                        />
                    </Animatable.View>
                </SafeAreaView>}
                
            </Card>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 0,
    }
});
export default About;
