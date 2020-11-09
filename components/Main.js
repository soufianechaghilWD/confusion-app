import React from 'react';
import DishDetail from './DishDetail';
import Menu from './Menu';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { Icon } from 'react-native-elements'
import { Image, StyleSheet, ScrollView, Text, SafeAreaView, View } from 'react-native'

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();



function MyStack(props) {
  return (
    <Stack.Navigator >
      <Stack.Screen name="menu" component={Menu} options={{
          title: 'menu',
          headerStyle: {
            backgroundColor: '#512DA8',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            color: '#fff',
          },
          headerLeft: () => (<Icon name="menu" size={24} color="white" onPress={() => props.navigation.toggleDrawer()} />)
        }}  />
      <Stack.Screen name="Dishdetail" component={DishDetail} options={{
          title: 'Dish detail',
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
function homeStack(props) {
  return(
    <Stack.Navigator>
      <Stack.Screen name="home" component={Home} options={{
        title: 'Home',
        headerStyle: {
          backgroundColor: '#512DA8',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          color: '#fff',
        },
        headerLeft: () => (<Icon name="menu" size={24} color="white" onPress={() => props.navigation.toggleDrawer()} />)
      }}/>
    </Stack.Navigator>
  )
}
function aboutStack(props) {
  return(
    <Stack.Navigator>
      <Stack.Screen name="about" component={About} options={{
        title: 'About',
        headerStyle: {
          backgroundColor: '#512DA8',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          color: '#fff',
        },
        headerLeft: () => (<Icon name="menu" size={24} color="white" onPress={() => props.navigation.toggleDrawer()} />)
      }}/>
    </Stack.Navigator>
  )
}
function contactStack(props) {
  return(
    <Stack.Navigator>
      <Stack.Screen name="contact" component={Contact} options={{
        title: 'Contact',
        headerStyle: {
          backgroundColor: '#512DA8',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          color: '#fff',
        },
        headerLeft: () => (<Icon name="menu" size={24} color="white" onPress={() => props.navigation.toggleDrawer()} />)
      }}/>
    </Stack.Navigator>
  )
}

const CustomDrawerContentComponent = (props) => (
  <ScrollView>
    <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
      <View style={styles.drawerHeader}>
        <View style={{flex:1}}>
        <Image source={require('./images/logo.png')} style={styles.drawerImage} />
        </View>
        <View style={{flex: 2}}>
          <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
        </View>
      </View>
      <DrawerItemList {...props} />
    </SafeAreaView>
  </ScrollView>
);


function MyDrawer() {
  return (
    <Drawer.Navigator initialRouteName="home" drawerStyle={{backgroundColor: '#D1C4E9'}} drawerContent={CustomDrawerContentComponent}>
      <Drawer.Screen name="home" component={homeStack}  options={{
        drawerLabel: 'Home',  
        drawerIcon: ({tintColor}) => (
          <Icon name="home" type="font-awesome" size={24} color={tintColor}  />
        )
        }} />
      <Drawer.Screen name="about" component={aboutStack} options={{
        drawerLabel: 'About',
        drawerIcon: ({tintColor}) => (
          <Icon name="info-circle" type="font-awesome" size={24} color={tintColor}  />
        )
      }}/>
      <Drawer.Screen name="menu" component={MyStack}  options={{
        title: 'Menu',
        drawerIcon: ({tintColor}) => (
          <Icon name="list" type="font-awesome" size={24} color={tintColor}  />
        )
      }}/>
      <Drawer.Screen name="contact" component={contactStack} options={{
        title: 'Contact',
        drawerIcon: ({tintColor}) => (
          <Icon name="address-card" type="font-awesome" size={22} color={tintColor}  />
        )
      }}/>
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: '#512DA8',
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  drawerHeaderText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  },
  drawerImage: {
    margin: 10,
    width: 80,
    height: 60
  }
});

export default Main;