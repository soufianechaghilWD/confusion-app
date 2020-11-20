import React, { useState, useEffect } from 'react'
import { View, Button, StyleSheet } from 'react-native';
import { Card, Icon, Input, CheckBox } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';


function Login() {

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


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 20,
    },
    formInput: {
        margin: 40
    },
    formCheckbox: {
        margin: 40,
        backgroundColor: null
    },
    formButton: {
        margin: 60
    }
});


export default Login
