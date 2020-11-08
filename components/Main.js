import React, { useState } from 'react';
import { View } from 'react-native';
import { DISHES } from '../shared/dishes';
import DishDetail from './DishDetail';
import Menu from './Menu';

const Main = () => {

    const [dishes, setDishes] = useState(DISHES)
    const [selectedDish, setSelectedDish] = useState(null)

    const onDishSelect = (dishId) => {
        setSelectedDish(dishId)
    }

    return (
        <View >
            <Menu dishes={dishes} onPress={(dishId) => onDishSelect(dishId)}/>
            <DishDetail dish={dishes.filter((dish) => dish.id === selectedDish)[0]} />
        </View>
        
    );
}

export default Main;