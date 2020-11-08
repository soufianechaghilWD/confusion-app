import React from 'react';
import DishDetail from './DishDetail';
import Menu from './Menu';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="menu" component={Menu} options={{
          title: 'menu',
          headerStyle: {
            backgroundColor: '#512DA8',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            color: '#fff',
          },
        }}/>
      <Stack.Screen name="Dishdetail" component={DishDetail} options={{
          title: 'menu',
          headerStyle: {
            backgroundColor: '#512DA8',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            color: '#fff',
          },
        }}/>
    </Stack.Navigator>
  );
}

const Main = () => {

    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    );
}

export default Main;