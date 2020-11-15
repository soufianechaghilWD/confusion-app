import React, { useState } from 'react';
import { View, Text, ScrollView, FlatList, Modal, Button, TextInput } from 'react-native';
import { Card, Icon, Input, Rating, AirbnbRating  } from 'react-native-elements';
import { useStateValue } from "./stateProvider";
import { baseUrl } from '../shared/baseUrl';
import Loading from './Loading'

function DishDetail(props) {


    const [{dishes, comments, favorites}, dispatch] = useStateValue();
    const [modal, setModal] = useState(false)
    const [input, setInput] = useState('')
    const [comment, setComment] = useState('')
    const [rating, setRating] = useState(3)

    function RenderComments(props) {

        const comments = props.comments;
                
        const renderCommentItem = ({item, index}) => {
            
            return (
                <View key={index} style={{margin: 10}}>
                    <Text style={{fontSize: 14}}>{item.comment}</Text>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        {Array(item.rating)
                        .fill()
                        .map((_, i) => (
                            <Text>🌟</Text>
                        ))}
                    </View>
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
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <Icon 
                            raised
                            reverse
                            name={ props.favorite ? 'heart' : 'heart-o'}
                            type='font-awesome'
                            color='#f50'
                            onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                            />
                            <Icon 
                            raised
                            reverse
                            name='pencil'
                            type='font-awesome'
                            color='#f50'
                            onPress={() => setModal(true)}
                            />
                        </View>
                        
                    </Card>
                );
            }
            else {
                return(<View></View>);
            }
    }
    const ratingCompleted = (rating) => {
        console.log("Rating is: " + rating)
        setRating(rating)
      }

    const handleSubmit = () => {
        console.log(input, comment, rating)
        dispatch({
            type: 'SET__COMMENTS',
            payload: [...comments, {id: comments.length, dishId: dishId, rating: rating, comment: comment, author: input, date: new Date()}]
        })
        setInput('')
        setComment('')
        setModal(false)
        console.log(comments)
    }

    return (
        
            dishes.length === 0 ? <Loading /> : 
                <ScrollView>
                    <Modal animationType = {"slide"} transparent = {false}
                    visible = {modal}
                    onDismiss = {() => setModal(false) }
                    onRequestClose = {() => setModal(false) }>
                    <View >
                        <Rating
                        showRating
                        onFinishRating={ratingCompleted}
                        style={{ paddingVertical: 10 }}
                        />
                        <Input
                            value={input}
                            placeholder='Author'
                            leftIcon={{ type: 'font-awesome', name: 'user' }}
                            onChangeText={value => setInput(value)}
                        />
                        <Input
                            value={comment}
                            onChangeText={value => setComment(value)}
                            placeholder='Comment'
                            leftIcon={{ type: 'font-awesome', name: 'comment' }}
                        />
                        <View style={{marginBottom: 20, marginLeft: 20, marginRight: 20}}>
                            <Button 
                                onPress = { handleSubmit }
                                color="#512DA8"
                                title="Submit" 
                                />
                        </View>
                        <View style={{marginLeft: 20, marginRight: 20}}>
                            <Button 
                                color="gray"
                                title="Cancel" 
                                onPress={() => setModal(false)}
                                />
                        </View>
                    </View>
                    
                   
                </Modal>
            <RenderDish dish={dishes[+dishId]}
            favorite={favorites.some(el => el === dishId)}
            onPress={() => markFavorite(dishId)} 
            />
            <RenderComments comments={comments.filter((comment) => comment.dishId === dishId)} />
            </ScrollView>
            
            

    )
}

export default DishDetail;