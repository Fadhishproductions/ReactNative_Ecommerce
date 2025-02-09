import React, { useState } from "react";
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { 
  useFonts,Manrope_700Bold,
  Manrope_600SemiBold,
  Manrope_400Regular
} from "@expo-google-fonts/manrope";


const FrequentlyBought = ({ frequentlyBoughtWith }) => {
  const scrollX = new Animated.Value(0); // Animated value to track scroll position
  const navigation = useNavigation();
  let [fontsLoaded] = useFonts({
           Manrope_700Bold,
           Manrope_600SemiBold,
           Manrope_400Regular
               });
  return (
    <>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={[styles.title,{fontFamily:"Manrope_700Bold"}]}>Frequently bought</Text>
        <TouchableOpacity onPress={() => navigation.navigate("ProductsPage")}>
          <Text style={[styles.seeMore,{fontFamily:"Manrope_700Bold"}]}>See More </Text>
        </TouchableOpacity>
      </View>
    <View style={styles.container}>

      {/* Frequently Product List */}
      <FlatList
        data={frequentlyBoughtWith}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.name}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.images.primary }} style={styles.image} />
            <View style={styles.discountTag}>
              <Text style={[styles.discountText,{fontFamily:"Manrope_600SemiBold"}]}>{item.discount}</Text>
            </View>
            
          <View style={styles.details}>
            <Text style={[styles.productName,{fontFamily:"Manrope_400Regular"}]}>{item.name}</Text>
            <Text style={[styles.price,{fontFamily:"Manrope_700Bold"}]}>${item.price.toFixed(2)}</Text>
            <Text style={[styles.originalPrice,{fontFamily:"Manrope_400Regular"}]}>${item.originalPrice.toFixed(2)}</Text>
            <View style={styles.rating}>
              <Ionicons name="star" size={14} color="gold" />
              <Text style={[styles.ratingText,{fontFamily:"Manrope_400Regular"}]}>
                {item.rating.score} ({item.rating.totalReviews})
              </Text>
            </View>
           </View>
          </View>
        )}
        />

      {/* Scroll Indicator */}
      <View style={styles.scrollBar}>
        <Animated.View
          style={[
            styles.scrollIndicator,
            {
              width: scrollX.interpolate({
                inputRange: [0, frequentlyBoughtWith.length * 140], // Adjust based on item width
                outputRange: ["10%", "100%"],
                extrapolate: "clamp",
              }),
            },
          ]}
          />
      </View>
    </View>
          </>
  );
};

const styles = StyleSheet.create({
  container: { paddingLeft: 16,marginBottom:69},
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center",backgroundColor:"#FFFFFF",padding:16 },
  title: { fontSize: 20 },
  seeMore: { color: "#156651",fontSize:14 ,marginRight:14,textDecorationLine:"underline"},
  card: {
    width: 152,
    height: 246,
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    marginRight: 16,
    marginTop: 10,
    marginBottom:10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
   },
  image: { width: 120, height: 120, borderRadius: 8 },
  details:{
marginTop:10
  },
  discountTag: {
    position: "absolute",
    bottom: 105,
    left: 8,
    backgroundColor: "#E44A4A",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderTopLeftRadius:10,
    borderBottomEndRadius:10

  },
  discountText: { color: "white", fontSize: 12},
  productName: { fontSize: 14, marginTop: 5 },
  price: { fontSize: 20, fontWeight: "700", marginTop: 3 },
  originalPrice: {
    fontSize: 12,
    textDecorationLine: "line-through",
    color: "#404040",
    marginTop: 2,
  },
  rating: { flexDirection: "row", alignItems: "center", marginTop: 3 },
  ratingText: { marginLeft: 5, fontSize: 12,color:"#404040" },
  
  // Scroll Indicator Styles
  scrollBar: {
    height: 6,
    backgroundColor: "#E0E0E0",
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 10,
    width: "20%",  
    alignSelf: "center", 
  },
  scrollIndicator: {
    height: "100%",
    backgroundColor: "#0E6655",
    borderRadius: 10,
  },
});

export default FrequentlyBought;
