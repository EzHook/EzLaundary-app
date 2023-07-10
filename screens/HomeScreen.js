import { Alert, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native";
import Carousel from "../components/Carousel";
import Services from "../components/Services";
import LaundaryItem from "../components/LaundaryItem";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../ProductReducer";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { collection, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const HomeScreen = () => {
  const navigation = useNavigation();
  const cart = useSelector((state)=> state.cart.cart);
  const [items, setItems] = useState([]);
  const total = cart.map((item) => item.price * item.quantity).reduce((curr, prev) => curr + prev,0);
  console.log(cart);
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
    "Your Location is loading"
  );
  const [locationServiceEnabled, setLocationServiceEnabled] = useState(false);

  useEffect(() => {
    checkIfLocationEnabled();
    getCurrentLocation();
  }, []);

  const checkIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();
    if (!enabled) {
      Alert.alert(
        //title
        "Location Services Not Enabled",
        //body
        "Please enable location services.",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          {
            text: "OK",
            onPress: () => console.log("No Pressed"),
          },
        ],
        { cancelable: false }
        //clicking out side of alert will not cancel
      );
    } else {
      setLocationServiceEnabled(enabled);
    }
  };

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        //title
        "Permission denied",
        //body
        "Please allow the app to use the location services.",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          {
            text: "OK",
            onPress: () => console.log("No Pressed"),
          },
        ],
        { cancelable: false }
        //clicking out side of alert will not cancel
      );
    }

    const { coords } = await Location.getCurrentPositionAsync();
    if (coords) {
      const { latitude, longitude } = coords;

      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      console.log(response);

      for (item of response) {
        let address = `${item.name} ${item.city} ${item.postalCode}`;
        setDisplayCurrentAddress(address);
      }
    }
  };

  const productArray = useSelector((state) => state.product.product);
  const dispatch = useDispatch();

  useEffect(()=>{
    if(productArray.length > 0) return;

    const fetchProducts = async() => {
      const colRef = collection(db,"types");
      const docSnap = await getDocs(colRef);

      docSnap.forEach((doc)=>{
        items.push(doc.data());
      });
      items?.map((service) =>dispatch(getProducts(service)))
    }

    fetchProducts();
    
  },[]);
  const laundaryData = [
    {
        id: "0",
        image: "https://thumb.ac-illust.com/18/18ca54c38a2a31cb205040bc5e9c2c4e_t.jpeg",
        name:"shirt",
        quantity: 0,
        price: 10,
    },
    {
        id: "1",
        image: "https://cdn.pixabay.com/photo/2012/04/26/14/33/t-shirt-42654_1280.png",
        name:"T-Shirt",
        quantity: 0,
        price: 10,
    },
    {
        id: "2",
        image: "https://w7.pngwing.com/pngs/40/893/png-transparent-t-shirt-dress-clothing-clothes-hanger-pieces-of-red-dress-tshirt-white-magenta.png",
        name:"dresses",
        quantity: 0,
        price: 10,
    },
    {
        id: "3",
        image: "https://cdn-icons-png.flaticon.com/512/2806/2806182.png",
        name:"jeans",
        quantity: 0,
        price: 10,
    },
    {
        id: "4",
        image: "https://img.freepik.com/premium-vector/sweater-vector-illustration-design_166235-73.jpg",
        name:"Sweater",
        quantity: 0,
        price: 10,
    },
    {
        id: "5",
        image: "https://cdn-icons-png.flaticon.com/512/3421/3421628.png",
        name:"Shorts",
        quantity: 0,
        price: 10,
    },
    {
        id: "6",
        image: "https://img.freepik.com/free-vector/red-tanktop-white-background_1308-74595.jpg",
        name:"Sleeveless",
        quantity: 0,
        price: 10,
    },
];
console.log("Product array",productArray);
  return (
    <>
    <ScrollView style={{
      backgroundColor: "#F0F0F0",
      flex:1
    }}
    showsVerticalScrollIndicator={false}>
    {/* location and Profile */}
      <View style={{
        flexDirection: "row",
        alignItems:"center",
        padding: 10,
      }}>
        <Ionicons style={{padding:5, margin:2}} name="location-sharp" size={24} color="#E32636" />
        <View>
            <Text style={{ fontSize: 18, fontWeight: "600"}}>Home</Text>
            <Text>{displayCurrentAddress}</Text>
        </View>
        <Pressable style={{
            marginLeft:"auto",
            marginRight: 7
        }}
        onPress={()=> navigation.navigate("Profile")}>
            <Image
            style={{
                height:40,
                width:40,
                borderRadius: 20,
            }}
            source={{
                uri:"https://yt3.ggpht.com/yti/AHyvSCA01w2Xe91K3Ff3BMh9UedRd_194GZf43BYY1Oe=s88-c-k-c0x00ffffff-no-rj-mo"
            }} />
        </Pressable>
      </View>

      {/* search bar */}
      <View style={{
        flexDirection:"row",
        alignItems: "center",
        justifyContent:"space-between",
        padding:10,
        margin:10,
        borderWidth:0.8,
        borderColor:"#C0C0C0",
        borderRadius: 7
      }}>
        <TextInput placeholder="Search for clothes or something" />
        <Ionicons name="search-sharp" size={24} color="#E32636"  />
      </View>

      {/* Image Carousel */}
      <Carousel />

      {/* Services */}

      <Services />

      {/* Render all the Items here */}

      {productArray.map((item, index)=>(
        <LaundaryItem item={item} index={index} />
      ))}

    </ScrollView>
    
    {total > 0 && ( //cart functionality
      <Pressable style={{
      backgroundColor:"#E32636",
      padding:10,
      marginBottom:30,
      margin: 15,
      borderRadius: 7,
      flexDirection:"row",
      alignItems:"center",
      justifyContent:"space-between"
    }}>
      <View>
        <Text style={{
          fontSize: 15,
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
      onPress={()=> navigation.navigate("Pickup")}>
        <Text style={{
          fontSize:17,
          fontWeight:"600",
          color:"white",
        }}>Proceed to pickup</Text>
      </TouchableOpacity>
    </Pressable>
    )}
    
  </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
