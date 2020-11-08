import React, { useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { Card } from 'react-native-elements';
import { DISHES } from '../shared/dishes';
import { LEADERS } from '../shared/leaders';
import { PROMOTIONS } from '../shared/promotions';


function Home() {

    function RenderItem ({item}) {
        if(item!= null){
           return(
           <Card>
               <Card.Title>{item.name}</Card.Title>
               <Card.FeaturedSubtitle>{item.designation}</Card.FeaturedSubtitle>
               <Card.Image source={require('./images/uthappizza.png')} />
               <Text style={{margin: 10}}>
                   {item.description}
               </Text>
           </Card>)
        }else{
            return(<View></View>)
        }
    }

    const [dishes, setDishes] = useState(DISHES)
    const [leaders, setLeaders] = useState(LEADERS)
    const [promotions, setPromotions] = useState(PROMOTIONS)


    return (
        <ScrollView>
            <RenderItem item = {dishes.filter((dish) => dish.featured)[0]}/>
            <RenderItem item = {promotions.filter((promo) => promo.featured)[0]}/>
            <RenderItem item = {leaders.filter((leader) => leader.featured)[0]}/>
        </ScrollView>
    )
}

export default Home
