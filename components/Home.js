import React, {useEffect} from 'react';
import { View, ScrollView, Text } from 'react-native';
import { Card } from 'react-native-elements';
import { useStateValue } from "./stateProvider";
import { baseUrl } from '../shared/baseUrl';

function Home(props) {

    const [{dishes, promos, leaders}, dispatch] = useStateValue();


    function RenderItem ({item}) {
        if(item!= null){
           return(
           <Card>
               <Card.Title>{item.name}</Card.Title>
               <Card.FeaturedSubtitle>{item.designation}</Card.FeaturedSubtitle>
               <Card.Image source={{uri: baseUrl +'/'+ item.image }} />
               <Text style={{margin: 10}}>
                   {item.description}
               </Text>
           </Card>)
        }else{
            return(<View></View>)
        }
    }

    

    return (
        <ScrollView>
            <RenderItem item = {dishes?.filter((dish) => dish.featured)[0]}/>
            <RenderItem item = {promos?.filter((promo) => promo.featured)[0]}/>
            <RenderItem item = {leaders?.filter((leader) => leader.featured)[0]}/>
        </ScrollView>
    )
}

export default Home;