import React from 'react'
import { FlatList, Alert } from 'react-native';
import { ListItem } from "react-native-elements";
import { Loading } from './Loading';
import { baseUrl } from '../shared/baseUrl'
import { useStateValue } from "./stateProvider";
import Swipeout from 'react-native-swipeout';
import * as Animatable from 'react-native-animatable';


function Favorite(props) {

    const [{dishes, favorites}, dispatch] = useStateValue();


    const renderMenuItem = ({item, index}) => {
        
        
        const rightButton = [
            {
                text: 'Delete', 
                type: 'delete',
                onPress: () => {
                    Alert.alert(
                        'Delete Favorite?',
                        'Are you sure you wish to delete the favorite dish ' + item.name + '?',
                        [
                            { 
                            
                                text: 'Cancel', 
                                onPress: () => console.log(item.name + 'Not Deleted'),
                                style: ' cancel'
                            },
                            {
                                text: 'OK',
                                onPress: () => dispatch({
                                    type: "DELETE__FAVORITES",
                                    payload: item.id
                                })
                            }
                        ],
                        { cancelable: false }
                    );
                    
                }
            }
        ];


        return (

            <Swipeout right={rightButton} autoClose={true}>
                <Animatable.View animation="fadeInRightBig" duration={2000}>
                    <ListItem
                    key={index}
                    title={item.name}
                    subtitle={item.description}
                    hideChevron={true}
                    onPress={() => props.navigation.navigate('Dishdetail', {dishId: item.id })}
                    leftAvatar={{ source: {uri: baseUrl + "/"+item.image}}}
                    />
                </Animatable.View>
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
