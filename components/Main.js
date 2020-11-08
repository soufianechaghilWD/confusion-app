import React from 'react';
import DishDetail from './DishDetail';
import Menu from './Menu';
import Home from './Home';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();



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

function MyDrawer() {
  return (
    <Drawer.Navigator initialRouteName="home" drawerStyle={{backgroundColor: '#D1C4E9'}}>
      <Drawer.Screen name="home" component={Home} />
      <Drawer.Screen name="menu" component={MyStack} />
    </Drawer.Navigator>
  )
}
const Main = () => {

    return (
        <NavigationContainer>
          <MyDrawer />
        </NavigationContainer>
    );
}

export default Main;