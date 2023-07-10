import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { decrementQty, incrementQty } from "../ProductReducer";
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
} from "../CartReducer";

const LaundaryItem = ({ item, index }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const addItemToCart = () => {
    dispatch(addToCart(item));
    dispatch(incrementQty(item));
  };

  return (
    <View key={index}>
      <Pressable
        style={{
          backgroundColor: "white",
          borderRadius: 10,
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          margin: 14,
        }}
      >
        <View>
          <Image
            source={{
              uri: item.image,
            }}
            style={{
              width: 70,
              height: 70,
              borderRadius: 10,
            }}
          />
        </View>
        <View>
          <Text
            style={{
              width: 83,
              fontSize: 17,
              fontWeight: "500",
              marginBottom: 7,
            }}
          >
            {item.name}
          </Text>
          <Text
            style={{
              width: 60,
              color: "gray",
              fontSize: 15,
            }}
          >
            $ {item.price}
          </Text>
        </View>

        {cart.some((c) => c.id === item.id) ? (
          <Pressable
            style={{
              flexDirection: "row",
              paddingHorizontal: 10,
              paddingVertical: 10,
            }}
          >
            <Pressable
              style={{
                width: 26,
                height: 26,
                borderRadius: 13,
                borderColor: "#BEBEBE",
                backgroundColor: "#E0E0E0",
                justifyContent: "center",
                alignContent: "center",
              }}
              onPress={() => {
                dispatch(decrementQuantity(item)); //cart
                dispatch(decrementQty(item)); //product
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "#E32636",
                  paddingHorizontal: 6,
                  fontWeight: "600",
                  textAlign: "center",
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

            <Pressable
              style={{
                width: 26,
                height: 26,
                borderRadius: 13,
                borderColor: "#BEBEBE",
                backgroundColor: "#E0E0E0",
                justifyContent: "center",
                alignContent: "center",
              }}
              onPress={() => {
                dispatch(incrementQuantity(item)); //cart
                dispatch(incrementQty(item)); //product
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "#E32636",
                  paddingHorizontal: 6,
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                +
              </Text>
            </Pressable>
          </Pressable>
        ) : (
          <TouchableOpacity
            style={{
              width: 70,
            }}
            onPress={addItemToCart}
          >
            <Text
              style={{
                borderColor: "gray",
                borderWidth: 0.8,
                padding: 5,
                textAlign: "center",
                color: "#E32636",
                marginVertical: 10,
                borderRadius: 4,
                fontSize: 17,
                fontWeight: "bold",
              }}
            >
              Add
            </Text>
          </TouchableOpacity>
        )}
      </Pressable>
    </View>
  );
};

export default LaundaryItem;
