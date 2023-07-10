import { View, Text, ScrollView, Pressable, Image } from 'react-native'
import React from 'react'

const Services = () => {

    const services = [
        {
            id: "0",
            image:"https://thumb.ac-illust.com/ab/aba5e59e240cd1ec25f3b3eb916441dc_t.jpeg",
            name:"Washing"
        },
        {
            id: "1",
            image:"https://cdn-icons-png.flaticon.com/512/4352/4352835.png",
            name:"Laundary"
        },
        {
            id: "2",
            image:"https://cdn4.iconfinder.com/data/icons/hotel-and-restaurant-2-7/50/138-512.png",
            name:"Wash & Iron"
        },
        {
            id: "3",
            image:"https://img.freepik.com/premium-vector/stack-clean-clothes-pile-neatly-folded-shirts-t-shirts-jeans-trousers-dresses-washed-clothes_625536-71.jpg",
            name:"Cleaning"
        },
    ]

  return (
    <View style={{padding: 10}}>
    <Text style={{
        fontSize:16,
        fontWeight:"500",
        marginBottom: 7,
    }}>Services Available</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {services.map((service, index)=>(
            <Pressable style={{
                margin: 10,
                backgroundColor:"white",
                padding:20,
                borderRadius: 7
            }} key={index}>
                <Image
                source={{
                    uri: service.image
                }}
                style={{
                    width: 70,
                    height: 70
                }} />
                <Text style={{
                    textAlign:'center',
                    marginTop: 10,
                }}>{service.name}</Text>
            </Pressable>
        ))}
      </ScrollView>
    </View>
  )
}

export default Services