import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { clearCart, decrementQuantity, incrementQuantity } from "../CartReducer";
import { decrementQty, incrementQty } from "../ProductReducer";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

const CartScreen = () => {
  const route = useRoute();
  const cart = useSelector((state) => state.cart.cart);
  const navigation = useNavigation();
  const total = cart
    .map((item) => item.price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0);

  const dispatch = useDispatch();

  const userUid = auth.currentUser.uid;

  const placeOrder = async() => {
    navigation.navigate("Order");
    dispatch(clearCart());
    await setDoc(
      doc(db, "users",`${userUid}`),
      {
        orders: {...cart},
        pickUpDetails: route.params,
      },{
        merge: true
      }
    );
  }
  return (
    <>
    <ScrollView>
      {total === 0 ? (
        <View
          style={{
            justifyContent: "center",
          }}
        >
          <Text>Your cart is Empty</Text>
        </View>
      ) : (
        <>
          <View
            style={{
              padding: 10,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Text style={{ marginLeft: 20, fontWeight: "600", fontSize: 20 }}>
              Your Bucket
            </Text>
          </View>

          <Pressable
            style={{
              backgroundColor: "white",
              borderRadius: 12,
              marginLeft: 10,
              marginRight: 10,
              padding: 14,
            }}
          >
            {cart.map((item, index) => (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginVertical: 15,
                }}
                key={index}
              >
                <Text
                  style={{
                    width: 100,
                    fontWeight: "600",
                    fontSize: 16,
                  }}
                >
                  {item.name}
                </Text>

                {/* + & - buttons */}
                <Pressable
                  style={{
                    flexDirection: "row",
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    alignItems: "center",
                    borderColor: "#BEBEBE",
                    borderWidth: 0.5,
                    borderRadius: 10,
                  }}
                >
                  <Pressable>
                    <Text
                      style={{
                        fontSize: 20,
                        color: "#E32636",
                        paddingHorizontal: 6,
                        fontWeight: "600",
                      }}
                      onPress={() => {
                        dispatch(decrementQuantity(item)); //cart
                        dispatch(decrementQty(item)); //product
                      }}
                    >
                      -
                    </Text>
                  </Pressable>

                  <Pressable>
                    <Text
                      style={{
                        fontSize: 19,
                        color: "#E32636",
                        paddingHorizontal: 8,
                        fontWeight: "600",
                      }}
                    >
                      {item.quantity}
                    </Text>
                  </Pressable>

                  <Pressable>
                    <Text
                      style={{
                        fontSize: 20,
                        color: "#E32636",
                        paddingHorizontal: 6,
                        fontWeight: "600",
                      }}
                      onPress={() => {
                        dispatch(incrementQuantity(item)); //cart
                        dispatch(incrementQty(item)); //product
                      }}
                    >
                      +
                    </Text>
                  </Pressable>
                </Pressable>

                <Text
                  style={{
                    fontWeight: "600",
                    fontSize: 16,
                  }}
                >
                  ${item.price * item.quantity}
                </Text>
              </View>
            ))}
          </Pressable>

          <View style={{ marginHorizontal: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 30 }}>
              Billing Details
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "white",
              padding: 10,
              borderRadius: 7,
              marginTop: 15,
              marginHorizontal: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginVertical:10
              }}
              >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "400",
                  color: "gray",
                }}
              >
                Item Total
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "400",
                }}
              >
                ${total}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginVertical: 10,
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "400",
                  color: "gray",
                }}
              >
                Delivery Fee | 1.2KM
              </Text>
              <Text
              style={{
                  fontSize: 18,
                  fontWeight: "400",
                  color:"#E32636",
                }}>
                  FREE
              </Text>
            </View>

            <View style={{
              flexDirection:"row",
              alignItems:"center",
              marginVertical: 10,
            }}>
              <Text style={{
                  fontSize: 18,
                  fontWeight: "500",
                  color:"gray",
              }}>Free Delivery on your order</Text>
            </View>
            <View
              style={{
                borderColor:"gray",
                height:1,
                borderWidth:0.5,
                marginTop:10,
              }} />
            
            <View
            style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginVertical: 10,
              }}>
              <Text style={{
                  fontSize: 18,
                  fontWeight: "500",
                  color:"gray",
              }}>Selected Date</Text>
              <Text style={{
                 fontSize: 18,
                  fontWeight: "400",
                  color:"#E32636",
              }}>
              {/* {route.params.pickUpDate} */}
              </Text>
            </View>

            <View
            style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginVertical: 10,
              }}>
              <Text style={{
                  fontSize: 18,
                  fontWeight: "500",
                  color:"gray",
              }}>No. Of Days</Text>
              <Text style={{
                 fontSize: 18,
                  fontWeight: "400",
                  color:"#E32636",
              }}>
              {route.params.no_Of_days}
              </Text>
            </View>

            <View
            style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginVertical: 10,
              }}>
              <Text style={{
                  fontSize: 18,
                  fontWeight: "500",
                  color:"gray",
              }}>Selected Pickup Time</Text>
              <Text style={{
                 fontSize: 18,
                  fontWeight: "400",
                  color:"#E32636",
              }}>
              {route.params.selectedTime}
              </Text>
            </View>
              <View
              style={{
                borderColor:"gray",
                height:1,
                borderWidth:0.5,
                marginTop:10,
              }} />
              <View
            style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginVertical: 10,
              }}>
              <Text style={{
                  fontSize: 18,
                  fontWeight: "bold",
              }}>To Pay</Text>
              <Text style={{
                 fontSize: 18,
                  fontWeight: "bold",
              }}>
              ${total + 95}
              </Text>
            </View>
          </View>
        </>
      )}
    </ScrollView>

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
        }}>{cart.length} items | $ {total + 95}</Text>
        <Text style={{
          fontSize:8,
          fontWeight:"400",
          color:"white",
          marginVertical:5
        }}>extra charges might apply</Text>
      </View>

      <TouchableOpacity>
        <Text style={{
          fontSize:17,
          fontWeight:"600",
          color:"white",
        }}
        onPress={placeOrder}>Place The Order</Text>
      </TouchableOpacity>
    </Pressable>
    )}
    </>
  );
};

export default CartScreen;
