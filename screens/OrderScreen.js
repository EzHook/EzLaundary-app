import { View, Text, SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'
import LottieView from 'lottie-react-native'
import { Button } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const OrderScreen = () => {

    const navigation = useNavigation();

  return (
    <SafeAreaView>
        <LottieView 
        source={require("../assets/thumbs.json")} 
        style={{
            height: 360,
            width: 300,
            alignSelf: "center",
            marginTop:40,
            justifyContent:"center",
        }}
        autoPlay
        loop={false}
        speed={0.7}
        />
        <Text style={{
            marginTop:40,
            fontWeight:"600",
            fontSize:19,
            textAlign:"center"
        }}>
            Your order has been placed!
        </Text>
        
        <LottieView
        source={require("../assets/sparkle.json")}
        style={{
            height: 300,
            top:100,
            width:300,
            alignSelf:"center",
        }}
        autoPlay
        loop={false}
        speed={0.7}
        onAnimationFinish={()=>navigation.navigate("Home")}
         />
    </SafeAreaView>
  )
}

export default OrderScreen