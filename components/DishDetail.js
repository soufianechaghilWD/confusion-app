import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Card} from 'react-native-elements';
import { DISHES } from '../shared/dishes';


function DishDetail({route}) {

    const [dishes, setDishes] = useState(DISHES);



    const { dishId } = route.params;
    const RenderDish = (props)  => {

        const dish = props.dish;
        
            if (dish != null) {
                return(
                    <Card>
                        <Card.Divider />
                        <Card.Image source={require('./images/uthappizza.png')} />
                        <Text>
                            {dish.description}
                        </Text>
                    </Card>
                );
            }
            else {
                return(<View></View>);
            }
    }

    return (
        <RenderDish dish={dishes.filter(item => item.id === dishId)[0]} />
    )
}

export default DishDetail;
