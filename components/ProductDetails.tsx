import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Share } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { 
  useFonts,Manrope_700Bold,
  Manrope_600SemiBold,
  Manrope_400Regular,
  Manrope_800ExtraBold
} from "@expo-google-fonts/manrope";

const ProductDetails = ({ variants, rating, description, name }) => {
  const [selectedVariant, setSelectedVariant] = useState(variants[0]);
  const router = useRouter(); 
  let [fontsLoaded] = useFonts({
             Manrope_700Bold,
             Manrope_600SemiBold,
             Manrope_400Regular,
             Manrope_800ExtraBold
                 });

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: `Check out this amazing product: ${name} - Available in multiple colors!`,
      });

      if (result.action === Share.sharedAction) {
        console.log("Shared successfully!");
      } else if (result.action === Share.dismissedAction) {
        console.log("Share dismissed");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Product Details Container */}
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={[styles.productName,{fontFamily:"Manrope_400Regular"}]}>{name}</Text>
          <TouchableOpacity onPress={handleShare} style={styles.iconContainer}>
            <Icon name="share-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.priceContainer}>
          <Text style={[styles.currentPrice,{fontFamily:"Manrope_800ExtraBold"}]}>
            ${selectedVariant.price.current.toFixed(2)}
          </Text>
          <Text style={[styles.originalPrice,{fontFamily:"Manrope_400Regular"}]}>
            ${selectedVariant.price.original.toFixed(2)}
          </Text>
          <View style={styles.discountTag}>
            <Text style={[styles.discountText,{fontFamily:"Manrope_400Regular"}]}>
              {selectedVariant.price.discount}
            </Text>
          </View>
        </View>

       
        <TouchableOpacity 
          style={styles.ratingContainer} 
          onPress={() =>router.push("/reviews")}
        >
          <Text style={styles.star}>⭐</Text>
          <Text style={[styles.ratingText,{fontFamily:"Manrope_400Regular"}]}>
            {rating.score} ({rating.totalReviews})
          </Text>
        </TouchableOpacity>

        <Text style={[styles.shortDescription,{fontFamily:"Manrope_400Regular"}]}>{description.short}</Text>
      </View>

      {/* Full-width Separator */}
      <View style={styles.fullWidthSeparator} />

      {/* Color Variants */}
      <View style={styles.variableContainer}>
        <Text style={[styles.colorTitle,{fontFamily:"Manrope_700Bold"}]}>Colors</Text>
        <View style={styles.colorContainer}>
          {variants.map((variant, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.colorOption,
                {
                  borderWidth: selectedVariant.name === variant.name ? 2 : 1,
                  borderColor:
                    selectedVariant.name === variant.name ? "#156651" : "#E0E0E0",
                },
              ]}
              onPress={() => setSelectedVariant(variant)}
            >
              <View
                style={{
                  width: 35,
                  height: 35,
                  backgroundColor: variant.colorCode,
                  marginRight: 8,
                  borderRadius: 5,
                }}
              />
              <Text style={[styles.colorName,{fontFamily:"Manrope_400Regular"}]}>{variant.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    padding: 20, 
    marginTop:1,
    backgroundColor: "#fff", 
    borderTopLeftRadius: 17, 
    borderTopRightRadius: 17, 
    elevation: 1 
  },
  variableContainer:{
    padding: 20, 
    marginTop:1,
    backgroundColor: "#fff", 
  },
  // Title + Share Icon
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  productName: { fontSize: 16,},
  iconContainer: { padding: 5 },

  // Price & Discount
  priceContainer: { flexDirection: "row", alignItems: "center", marginTop: 5 },
  currentPrice: { fontSize: 32, fontWeight: "800" },
  originalPrice: {
    fontSize: 14,
    textDecorationLine: "line-through",
    color: "#404040",
    marginLeft: 10,
  },
  discountTag: {
    backgroundColor: "#E44A4A",
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 10,
  },
  discountText: { color: "white", fontSize: 12, fontWeight: "400" },

  // Rating
  ratingContainer: { flexDirection: "row", alignItems: "center", marginTop: 5 },
  star: { fontSize: 12 },
  ratingText: { fontSize: 12, marginLeft: 5, fontWeight: "400" },

   shortDescription: { fontSize: 16, color: "#404040", marginTop: 10, },

   fullWidthSeparator: {
    height: 1,
    backgroundColor: "#F5F5F5", 
    width: "100%",  
  },

   colorTitle: { fontSize: 18},
  colorContainer: { flexDirection: "row", flexWrap: "wrap", marginTop: 10 },
  colorOption: {
    width: "45%",
    padding: 8,
    margin: 5,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  colorName: { fontSize: 14, color: "#404040" },
});

export default ProductDetails;
