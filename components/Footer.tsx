import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { AntDesign,Feather } from "@expo/vector-icons"; // For heart icon
import { useFonts,Manrope_700Bold} from "@expo-google-fonts/manrope";

const Footer = ({name , onWishlistPress , isWishlisted }) => {

    const [isLoading, setIsLoading] = useState(false);
     
    let [fontsLoaded] = useFonts({
         Manrope_700Bold,
             });

    const handleAddToCart = async () => {
      setIsLoading(true);
  
       setTimeout(() => {
        setIsLoading(false);
        Alert.alert("Success", `${name} added to cart!`, [{ text: "OK" }]);
        
      }, 1500);
    };
  return (
    <>
    <View style={styles.footer}>
      {/* Wishlist Button (Heart Icon) */}
      <TouchableOpacity  style={[styles.wishlistButton, { borderColor: isWishlisted ? "red" : "#156615" }]} onPress={onWishlistPress}>
  {/* Fake bold effect by adding a second heart behind */}
  <AntDesign name="hearto" size={24} color={isWishlisted ? "red" : "#156615"} style={styles.heartShadow} />
  <Feather name="heart" size={24} color={isWishlisted ? "red" : "#156615"} />
</TouchableOpacity>

       {/* Add to Cart Button with Loading */}
      <TouchableOpacity style={styles.button} onPress={handleAddToCart} disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={[styles.buttonText,{fontFamily:"Manrope_700Bold"}]}>Add to Cart</Text>
        )}
      </TouchableOpacity>
    </View>
    </>
  );
}; 

const styles = StyleSheet.create({
 
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 15,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",

    elevation: 5, 
    
  },
  wishlistButton: {
    backgroundColor: "white",
    width: 42,
    height: 42,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
   },
  heartShadow: {
    position: "absolute",
    left: 8, // Slight offset to make it look bolder
    top: 8,
    opacity: 0.9, // Makes it look like a stroke
  },
  
button: {
    backgroundColor: "#156651",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    width:258,
    height:43
},
buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default Footer;
