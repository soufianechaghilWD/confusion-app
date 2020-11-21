import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, ScrollView, Image } from 'react-native';
import { Input, CheckBox, Button, Icon } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';
//import * as ImagePicker from 'expo-image-picker';
//import * as Permissions from 'expo-permissions';
import { baseUrl } from '../shared/baseUrl';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import { Asset } from 'expo-asset';
//import * as ImageManipulator from 'expo-image-manipulator';

const Tab = createBottomTabNavigator();


function LoginIn() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [remembre, setRemembre] = useState(false)


    useEffect(() => {
        console.log(SecureStore)
        SecureStore.getItemAsync('userinfo')
        .then((userdata) => {
            let userinfo = JSON.parse(userdata);
            if (userinfo) {
                setUsername(userinfo.username)
                setPassword(userinfo.password)
                setRemembre(true)
            }
        })
    }, [])


    const handleLogin = () => {
        console.log(JSON.stringify({username: username, password: password, remembere: remembre}));
        if (remembre)
            SecureStore.setItemAsync('userinfo', JSON.stringify({username: username, password: password}))
                .catch((error) => console.log('Could not save user info', error));
        else
            SecureStore.deleteItemAsync('userinfo')
                .catch((error) => console.log('Could not delete user info', error));

    }


    return (
        <View style={styles.container}>
                <Input
                    placeholder="Username"
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    onChangeText={(username) => setUsername(username)}
                    value={username}
                    containerStyle={styles.formInput}
                    />
                <Input
                    placeholder="Password"
                    leftIcon={{ type: 'font-awesome', name: 'key' }}
                    onChangeText={(password) => setPassword(password)}
                    value={password}
                    containerStyle={styles.formInput}
                    />
                <CheckBox title="Remember Me"
                    center
                    checked={remembre}
                    onPress={() => setRemembre(!remembre)}
                    containerStyle={styles.formCheckbox}
                    />
                <View style={styles.formButton}>
                    <Button
                        onPress={() => handleLogin()}
                        title="Login"
                        color="#512DA8"
                        />
                </View>
            </View>
    )
}

function Singup () {

    const [username, setUsername] = useState('')
    const [firstname, setFristname] = useState('')
    const [lastname, setLastname] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [remember, setRemembr] = useState(false)
    const [imageUrl, setImageUrl] = useState(baseUrl + '/images/logo.png')



    const getImageFromCamera = async () => {
        const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
        const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if (cameraPermission.status === 'granted' && cameraRollPermission.status === 'granted') {
            let capturedImage = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4, 3],
            });
            if (!capturedImage.cancelled) {
                console.log(capturedImage);
                this.processImage(capturedImage.uri);
            }
        }

    }

    const processImage = async (imageUri) => {
        let processedImage = await ImageManipulator.manipulate(
            imageUri, 
            [
                {resize: {width: 400}}
            ],
            {format: 'png'}
        );
        console.log(processedImage);
        this.setState({imageUrl: processedImage.uri });

    }

  


    const handleRegister = () => {
        console.log(JSON.stringify(this.state));
        if (this.state.remember)
            SecureStore.setItemAsync('userinfo', JSON.stringify({username: this.state.username, password: this.state.password}))
                .catch((error) => console.log('Could not save user info', error));
    }


    return(
            <ScrollView>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image 
                        source={{uri: imageUrl}} 
                        loadingIndicatorSource={require('./images/logo.png')}
                        style={styles.image} 
                        />
                    <Button
                        title="Camera"
                        onPress={() => console.log('hey there')}
                        />
                    <Button
                        title="Gallery"
                        onPress={() => console.log('hey there')}
                    />
                </View>
                <Input
                    placeholder="Username"
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    onChangeText={(username) => setUsername(username)}
                    value={username}
                    containerStyle={styles.formInput}
                    />
                <Input
                    placeholder="Password"
                    leftIcon={{ type: 'font-awesome', name: 'key' }}
                    onChangeText={(password) => setPassword(password)}
                    value={password}
                    containerStyle={styles.formInput}
                    />
                <Input
                    placeholder="First Name"
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    onChangeText={(firstname) => setFristname(firstname)}
                    value={firstname}
                    containerStyle={styles.formInput}
                    />
                <Input
                    placeholder="Last Name"
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    onChangeText={(lastname) => setLastname(lastname)}
                    value={lastname}
                    containerStyle={styles.formInput}
                    />
                <Input
                    placeholder="Email"
                    leftIcon={{ type: 'font-awesome', name: 'envelope-o' }}
                    onChangeText={(email) => setEmail(email)}
                    value={email}
                    containerStyle={styles.formInput}
                    />
                <CheckBox title="Remember Me"
                    center
                    checked={remember}
                    onPress={() => setRemembr(!remember)}
                    containerStyle={styles.formCheckbox}
                    />
                <View style={styles.formButton}>
                    <Button
                        onPress={() => handleRegister()}
                        title="Register"
                        icon={
                            <Icon
                                name='user-plus'
                                type='font-awesome'            
                                size={24}
                                color= 'white'
                            />
                        }
                        buttonStyle={{
                            backgroundColor: "#512DA8"
                        }}
                        />
                </View>
            </View>
            </ScrollView>
        );
}


function Login () {
    return (
        <Tab.Navigator>
            <Tab.Screen name="login" component={LoginIn} options={{
                    tabBarLabel: 'login',
                    tabBarIcon: ({ color, size }) => (
                        <Icon
                            name='user-plus'
                            type='font-awesome'            
                            size={size}
                            iconStyle={{ color: color }}
                            />
                    ),
                    }}
            />
            <Tab.Screen name="singup" component={Singup} options={{
                    tabBarLabel: 'signup',
                    tabBarIcon: ({ color, size }) => (
                        <Icon
                        name='sign-in'
                        type='font-awesome'            
                        size={size}
                        iconStyle={{ color: color }}
                        />
                    ),
                    }}/>
        </Tab.Navigator>
    )
}

// const styles = StyleSheet.create({
//     container: {
//         justifyContent: 'center',
//         margin: 20,
//     },
//     formInput: {
//         margin: 40
//     },
//     formCheckbox: {
//         margin: 40,
//         backgroundColor: null
//     },
//     formButton: {
//         margin: 60
//     }
// });

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 20,
    },
    imageContainer: {
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    image: {
      margin: 10,
      width: 80,
      height: 60
    },
    formInput: {
        margin: 20
    },
    formCheckbox: {
        margin: 20,
        backgroundColor: null
    },
    formButton: {
        margin: 60
    }
});
export default Login
