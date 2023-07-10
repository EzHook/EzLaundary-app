import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SliderBox } from "react-native-image-slider-box";

const Carousel = () => {
  const images = [
    "https://img.freepik.com/free-vector/laundry-dry-cleaning-concept-illustration_114360-7391.jpg",
    "https://static.vecteezy.com/system/resources/thumbnails/009/265/409/small_2x/laundry-day-at-home-a-set-of-illustrations-with-a-washing-machine-laundry-and-cleaning-products-dirty-clean-linen-the-concept-of-cleaning-the-apartment-free-vector.jpg",
  ];

  return (
    <View>
      <SliderBox
        images={images}
        autoPlay
        circleLoop
        dotColor={"#13274F"}
        inactiveDotColor="#90A4AE"
        ImageComponentStyle={{
          borderRadius: 6,
          width: "94%",
        }}
      />
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({});
