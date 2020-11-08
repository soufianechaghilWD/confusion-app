import React from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements'



const Menu = (props) => {

    const renderItem = ({ item, i }) => (
        <ListItem key={i} bottomDivider onPress={() => props.onPress(item.id)}>
            <Avatar source={require('./images/uthappizza.png')} />
            <ListItem.Content>
                <ListItem.Title >{item.name}</ListItem.Title>
                <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    );


    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={props.dishes}
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