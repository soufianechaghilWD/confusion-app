import React from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { Tile, Avatar } from 'react-native-elements'
import { useStateValue } from "./stateProvider";
import { baseUrl } from '../shared/baseUrl';


const Menu = (props) => {

    const [{dishes}, dispatch] = useStateValue();

    const renderItem = ({ item, i }) => (
        <Tile
        key={i}
        title={item.name}
        imageSrc={{uri: baseUrl +'/'+ item.image}}
        featured
        caption={item.description}
        onPress={() => props.navigation.navigate('Dishdetail', {dishId: item.id })}
        />
    );

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={dishes}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 0,
    }
});

export default Menu;