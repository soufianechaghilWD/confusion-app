import React, {useEffect} from 'react';
import { View, ScrollView, Text } from 'react-native';
import { Card } from 'react-native-elements';
import { useStateValue } from "./stateProvider";
import { baseUrl } from '../shared/baseUrl';
import Loading from './Loading'

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
            {dishes.length === 0 ? <Loading /> : 
            <RenderItem item = {dishes?.filter((dish) => dish.featured)[0]}/>}
            {promos.length === 0 ? <Loading /> :
            <RenderItem item = {promos?.filter((promo) => promo.featured)[0]}/>            
            }
            {leaders.length === 0 ? <Loading /> :
            <RenderItem item = {leaders?.filter((leader) => leader.featured)[0]}/>
            }
        </ScrollView>
    )
}

export default Home;