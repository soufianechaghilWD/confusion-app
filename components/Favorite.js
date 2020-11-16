import React from 'react'
import { FlatList, View, Text } from 'react-native';
import { ListItem } from "react-native-elements";
import { Loading } from './Loading';
import { baseUrl } from '../shared/baseUrl'
import { useStateValue } from "./stateProvider";
import Swipeout from 'react-native-swipeout';

function Favorite(props) {

    const [{dishes, favorites}, dispatch] = useStateValue();


    const renderMenuItem = ({item, index}) => {
        
        
        const rightButton = [
            {
                text: 'Delete', 
                type: 'delete',
                onPress: () => dispatch({
                    type: "DELETE__FAVORITES",
                    payload: item.id
                })
            }
        ];


        return (

            <Swipeout right={rightButton} autoClose={true}>
                <ListItem
                key={index}
                title={item.name}
                subtitle={item.description}
                hideChevron={true}
                onPress={() => props.navigation.navigate('Dishdetail', {dishId: item.id })}
                leftAvatar={{ source: {uri: baseUrl + "/"+item.image}}}
                />
            </Swipeout>
        );
    };


    


    return (
        dishes.length === 0 ? <Loading /> :
        <FlatList 
            data={dishes.filter(dish => favorites.some(el => el === dish.id))}
            renderItem={renderMenuItem}
            keyExtractor={item => item.id.toString()}
            /> 
    )
}

export default Favorite
