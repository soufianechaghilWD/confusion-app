import React from 'react';
import { View, Text, ScrollView, FlatList } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { useStateValue } from "./stateProvider";
import { baseUrl } from '../shared/baseUrl';
import Loading from './Loading'

function DishDetail(props) {


    const [{dishes, comments, favorites}, dispatch] = useStateValue();


    function RenderComments(props) {

        const comments = props.comments;
                
        const renderCommentItem = ({item, index}) => {
            
            return (
                <View key={index} style={{margin: 10}}>
                    <Text style={{fontSize: 14}}>{item.comment}</Text>
                    <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
                    <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date} </Text>
                </View>
            );
        };
        
        return (
            <Card title='Comments' >
            <FlatList 
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={item => item.id.toString()}
                />
            </Card>
        );
    }



    const markFavorite = (dishId)  => {
        if(!favorites.some(x => x === dishId)){
            return dispatch({
                type: 'SET__FAVORITE',
                payload: dishId
            })
        }
    }

    const { dishId } = props.route.params;
    const RenderDish = (props)  => {
            if (props.dish != null) {
                return(
                    <Card>
                        <Card.Divider />
                        <Card.Image source={{uri: baseUrl+'/'+props.dish.image}} />
                        <Text>
                            {props.dish.description}
                        </Text>
                        <Icon 
                        raised
                        reverse
                        name={ props.favorite ? 'heart' : 'heart-o'}
                        type='font-awesome'
                        color='#f50'
                        onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                        />
                    </Card>
                );
            }
            else {
                return(<View></View>);
            }
    }

    return (
        
            dishes.length === 0 ? <Loading /> : 
                <ScrollView>
            <RenderDish dish={dishes[+dishId]}
            favorite={favorites.some(el => el === dishId)}
            onPress={() => markFavorite(dishId)} 
            />
            <RenderComments comments={comments.filter((comment) => comment.dishId === dishId)} />
            </ScrollView>
            
            

    )
}

export default DishDetail;