import { View, Text, SafeAreaView, Pressable, Button } from 'react-native'
import React from 'react'
import { auth } from '../firebase'
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {

    const user = auth.currentUser;
    const navigation = useNavigation();

    const signOutUser = () => {
        signOut(auth).then(()=>{
            navigation.replace("Login");
        }).catch((err)=>{
            console.log(err);
        })
    }

  return (
    <SafeAreaView style={{
        flex: 1,
        justifyContent:"center",
        alignItems:"center",
    }}>
        <Pressable style={{
            padding:10,
            margin:10
        }}>
            <Text style={{
                fontWeight:"600",
                fontSize: 19,
                textAlign:"center"
            }}>Welcome</Text>
            <Text style={{
                fontWeight:"600",
                fontSize: 19,
                color:"blue",
                padding:10
            }}>{user.email}</Text>
        </Pressable>

        <Button title='Sign Out' color="#E32636" onPress={signOutUser}></Button>
    </SafeAreaView>
  )
}

export default ProfileScreen