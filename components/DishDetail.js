import React from 'react';
import { View, Text } from 'react-native';
import { Card} from 'react-native-elements';


function DishDetail({dish}) {

    const RenderDish = (props)  => {

        const dish = props.dish;
        
            if (dish != null) {
                return(
                    <Card
                    featuredTitle={dish.name}
                    image={require('./images/uthappizza.png')}>
                        <Text style={{margin: 10}}>
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
        <RenderDish dish={dish} />
    )
}

export default DishDetail;
