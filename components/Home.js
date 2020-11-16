import React, { useState, useEffect } from 'react';
import { View, Text, Animated, Easing } from 'react-native';
import { Card } from 'react-native-elements';
import { useStateValue } from "./stateProvider";
import { baseUrl } from '../shared/baseUrl';
import Loading from './Loading'

function Home(props) {

    const [{dishes, promos, leaders}, dispatch] = useStateValue();
    const [animatedValue, setAnimatedValue] = useState(new Animated.Value(0));
    

    const animate = () => {
        animatedValue.setValue(0)
        Animated.timing(
            animatedValue,
            {
                toValue: 8,
                duration: 8000,
                easing: Easing.linear
            }
        ).start(() => animate())
    }

    useEffect(() => {
        animate()
    }, [])

    const xpos1 = animatedValue.interpolate({
        inputRange: [0, 1, 3, 5, 8],
        outputRange: [1200, 600, 0, -600, -1200]
    })
    const xpos2 = animatedValue.interpolate({
        inputRange: [0, 2, 4, 6, 8],
        outputRange: [1200, 600, 0, -600, -1200]
    })
    const xpos3 = animatedValue.interpolate({
        inputRange: [0, 3, 5, 7, 8],
        outputRange: [1200, 600, 0, -600, -1200 ]
    })

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
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>

            <Animated.View style={{ width: '100%', transform: [{translateX: xpos1}]}}>
                {dishes.length === 0 ? <Loading /> : 
                <RenderItem item = {dishes?.filter((dish) => dish.featured)[0]}/>}
            </Animated.View>
            <Animated.View style={{ width: '100%',  transform: [{translateX: xpos2}]}}>
                {promos.length === 0 ? <Loading /> :
                <RenderItem item = {promos?.filter((promo) => promo.featured)[0]}/>            
                }
            </Animated.View>
            <Animated.View style={{ width: '100%',  transform: [{translateX: xpos3}]}}>
                {leaders.length === 0 ? <Loading /> :
                <RenderItem item = {leaders?.filter((leader) => leader.featured)[0]}/>
                }
            </Animated.View>

        </View>

    )
}

export default Home;