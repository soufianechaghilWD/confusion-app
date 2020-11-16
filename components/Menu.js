import React from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { Tile, Avatar } from 'react-native-elements'
import { useStateValue } from "./stateProvider";
import { baseUrl } from '../shared/baseUrl';
import Loading from './Loading';
import * as Animatable from 'react-native-animatable';


const Menu = (props) => {

    const [{dishes}, dispatch] = useStateValue();

    const renderItem = ({ item, i }) => (
        <Animatable.View animation="fadeInRightBig" duration={2000}>
            <Tile
            key={i}
            title={item.name}
            imageSrc={{uri: baseUrl +'/'+ item.image}}
            featured
            caption={item.description}
            onPress={() => props.navigation.navigate('Dishdetail', {dishId: item.id })}
            />
        </Animatable.View>
    );

    return (
        <SafeAreaView style={styles.container}>
            {dishes.length === 0 ? <Loading /> : 
            <FlatList
            data={dishes}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            />
            }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 0,
    }
});

export default Menu;