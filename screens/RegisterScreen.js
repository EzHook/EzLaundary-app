import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons, Ionicons, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigation = useNavigation();

  const register = () => {
    if(email === "" || password === "" || phoneNumber === ""){
      Alert.alert('Insufficient Data', 'Please fill all the fields!', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      { cancelable: false}
      );
    }

    createUserWithEmailAndPassword(auth, email, password).then((userCredentials) => {
      console.log("User credentials",userCredentials);
      const user = userCredentials._tokenResponse.email;
      const myUserUid = auth.currentUser.uid; 

      setDoc(doc(db, "users", `${myUserUid}`), {
        email: user,
        phone: phoneNumber
      })
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
            Register
          </Text>
          <Text
            style={{
              fontSize: 18,
              marginTop: 8,
              fontWeight: "800",
            }}
          >
            Create a new account
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
            <Feather name="phone" size={24} color="black" />
            <TextInput
              placeholder="Phone number"
              style={{
                fontSize: 18,
                borderBottomWidth: 1,
                borderBottomColor: "gray",
                width: 300,
                marginVertical: 10,
                marginLeft: 20,
                marginTop: 10,
              }}
              value={phoneNumber}
              onChangeText={(number) => setPhoneNumber(number)}
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
            onPress={register}
          >
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontSize: 18,
              }}
            >
              Register
            </Text>
          </Pressable>

          <Pressable
            style={{
              marginTop: 40,
            }}
            onPress={() => navigation.goBack()}
          >
            <Text
              style={{
                alignItems: "center",
                fontSize: 17,
                color: "gray",
                fontWeight: "500",
              }}
            >
              Already have an account? Login
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
