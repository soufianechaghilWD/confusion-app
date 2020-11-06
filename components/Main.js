import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { DISHES } from '../shared/dishes';
import Menu from './Menu';

const Main = () => {

    const [dishes, setDishes] = useState(DISHES)


    return (
        <Menu dishes={dishes} />
    );
}

export default Main;