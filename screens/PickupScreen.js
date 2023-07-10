import { View, Text } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import { TextInput } from "react-native";
import HorizontalDatepicker from "@awrminkhodaei/react-native-horizontal-datepicker";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { ScrollView } from "react-native";
import { Pressable } from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";

const PickupScreen = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState([]);
  const [selectedDelivery, setSelectedDelivery] = useState([]);
  const cart = useSelector((state)=> state.cart.cart);
  const total = cart.map((item) => item.price * item.quantity).reduce((curr, prev) => curr + prev,0);

  const deliveryTime = [
    {
      id: "0",
      name: "2-3 Days",
    },
    {
      id: "1",
      name: "3-4 Days",
    },
    {
      id: "2",
      name: "4-5 Days",
    },
    {
      id: "3",
      name: "5-6",
    },
    {
      id: "4",
      name: "Tommorrow",
    },
  ];

  const times = [
    {
      id: "0",
      time: "11:00 AM",
    },
    {
      id: "1",
      time: "12:00 PM",
    },
    {
      id: "2",
      time: "1:00 PM",
    },
    {
      id: "3",
      time: "2:00 PM",
    },
    {
      id: "4",
      time: "3:00 PM",
    },
    {
      id: "5",
      time: "4:00 PM",
    },
  ];

  const navigation = useNavigation();

  const proceedToCart = () => {
    if(!selectedDate || !selectedDelivery || !selectedTime) {
      Alert.alert('Invalid selection', 'Please Select all the fields!', [
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
    if(selectedDate && selectedDelivery && selectedTime) {
      navigation.replace("Cart", {
        selectedTime:selectedTime,
        no_Of_days:selectedDelivery,
        pickUpDate:selectedDate,
      });
    }
  }

  return (
    <>
    <SafeAreaView>
      <Text
        style={{
          fontSize: 16,
          fontWeight: "500",
          marginHorizontal: 10,
        }}
      >
        Enter your address
      </Text>
      <TextInput
        style={{
          padding: 40,
          borderWidth: 0.7,
          borderColor: "gray",
          paddingVertical: 80,
          borderRadius: 9,
          margin: 10,
        }}
      />
      <Text
        style={{
          fontSize: 16,
          fontWeight: "500",
          marginHorizontal: 10,
        }}
      >
        Pick a date
      </Text>
      <HorizontalDatepicker
        mode="gregorian"
        startDate={new Date("2023-04-20")}
        endDate={new Date("2023-08-30")}
        initialSelectedDate={new Date("2020-08-22")}
        onSelectedDateChange={(date) => setSelectedDate(date)}
        selectedItemWidth={170}
        unselectedItemWidth={38}
        itemHeight={38}
        itemRadius={10}
        selectedItemTextStyle={styles.selectedItemTextStyle}
        unselectedItemTextStyle={styles.selectedItemTextStyle}
        selectedItemBackgroundColor="#222831"
        unselectedItemBackgroundColor="#ececec"
        flatListContainerStyle={styles.flatListContainerStyle}
      />
      <Text
        style={{
          fontSize: 16,
          fontWeight: "500",
          marginHorizontal: 10,
        }}
      >
        Select Time
      </Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {times.map((item, index) => (
          <Pressable
            key={index}
            style={
              selectedTime.includes(item.time) ? {
                margin: 10,
                padding: 15,
                borderWidth: 0.7,
                borderRadius: 7,
                borderColor: "red",
              } : {
                margin: 10,
                padding: 15,
                borderWidth: 0.7,
                borderRadius: 7,
                borderColor: "gray",
              }
            }
            onPress={()=> setSelectedTime(item.time)}
          >
            <Text>{item.time}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <Text
        style={{
          fontSize: 16,
          fontWeight: "500",
          marginHorizontal: 10,
        }}
      >
       Delivery Date
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {deliveryTime.map((item, index) => (
          <Pressable style={
              selectedDelivery.includes(item.name) ? {
                margin: 10,
                padding: 15,
                borderWidth: 0.7,
                borderRadius: 7,
                borderColor: "red",
              } : {
                margin: 10,
                padding: 15,
                borderWidth: 0.7,
                borderRadius: 7,
                borderColor: "gray",
              }
            }
             onPress={()=> setSelectedDelivery(item.name)} key={index}>
            <Text>{item.name}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>


    {total > 0 && ( //cart functionality
      <Pressable style={{
      backgroundColor:"#E32636",
      padding:10,
      marginTop: "auto",
      marginBottom:30,
      margin: 15,
      borderRadius: 7,
      flexDirection:"row",
      alignItems:"center",
      justifyContent:"space-between"
    }}>
      <View>
        <Text style={{
          fontSize: 17,
          fontWeight:"600",
          color:"white"
        }}>{cart.length} items | $ {total}</Text>
        <Text style={{
          fontSize:8,
          fontWeight:"400",
          color:"white",
          marginVertical:5
        }}>extra charges might apply</Text>
      </View>

      <TouchableOpacity
      onPress={proceedToCart}>
        <Text style={{
          fontSize:17,
          fontWeight:"600",
          color:"white",
        }}>Proceed to cart</Text>
      </TouchableOpacity>
    </Pressable>
    )}
    </>
  );
};

const styles = StyleSheet.create({});
export default PickupScreen;
