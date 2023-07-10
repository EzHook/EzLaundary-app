import { View, Text, SafeAreaView, KeyboardAvoidingView } from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { ActivityIndicator } from "react-native";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(()=>{
    setLoading(true)
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if(!authUser){
        setLoading(false)
      }
      if(authUser){
        navigation.navigate("Home");
      }
    })
    return unsubscribe;
  },[])

  const login = () => {
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      console.log("User Credentials", userCredential);
      const user = userCredential.user;
      console.log("user details",user);
    }).catch((err)=>{
      alert("Wrong Password/Email does not exist");
    })
  }


  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: 10,
        alignItems: "center",
      }}
    >
    {loading ? (
      <View style={{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        flex:1,
        padding:20,
      }}>
        <Text style={{
          marginRight:15,
          fontSize:18,
          fontWeight:"700",
          color:"gray"
        }}>Loading</Text>
        <ActivityIndicator size="large" color={"red"}/>
      </View>
    ) : (
      <KeyboardAvoidingView>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 100,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "#E32636",
            }}
          >
            Sign In
          </Text>
          <Text
            style={{
              fontSize: 18,
              marginTop: 8,
              fontWeight: "800",
            }}
          >
            Sign in to your account
          </Text>
        </View>

        <View
          style={{
            marginTop: 50,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons
              name="email-outline"
              size={24}
              color="black"
            />
            <TextInput
              placeholder="Email"
              style={{
                fontSize: 18,
                borderBottomWidth: 1,
                borderBottomColor: "gray",
                width: 300,
                marginVertical: 10,
                marginLeft: 20,
              }}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Ionicons name="key-outline" size={24} color="black" />
            <TextInput
              placeholder="Password"
              style={{
                fontSize: 18,
                borderBottomWidth: 1,
                borderBottomColor: "gray",
                width: 300,
                marginVertical: 20,
                marginLeft: 15,
              }}
              secureTextEntry={true}
              value={password}
              onChangeText={(pass) => setPassword(pass)}
            />
          </View>
          <Pressable
            style={{
              backgroundColor: "#E32636",
              width: 200,
              padding: 15,
              marginRight: "auto",
              marginLeft: "auto",
              marginTop: 50,
              borderRadius: 7,
            }}
            onPress={login}
          >
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontSize: 18,
              }}
            >
              Login
            </Text>
          </Pressable>

          <Pressable style={{
            marginTop:40
          }}
          onPress={()=>navigation.navigate("Register")}>
            <Text style={{
              alignItems:"center",
              fontSize: 17,
              color:"gray",
              fontWeight:"500"
            }}>Dont have an account? Sign Up</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    )}
     
    </SafeAreaView>
  );
};

export default LoginScreen;
