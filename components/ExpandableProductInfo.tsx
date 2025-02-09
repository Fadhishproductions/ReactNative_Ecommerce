import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useFonts, Manrope_400Regular,Manrope_700Bold ,Manrope_500Medium } from "@expo-google-fonts/manrope";

const ExpandableProductInfo = ({ description, dimensions }) => {
  const [descExpanded, setDescExpanded] = useState(false);
  const [sizeExpanded, setSizeExpanded] = useState(false);
 let [fontsLoaded] = useFonts({
    Manrope_400Regular,Manrope_700Bold,
    Manrope_500Medium
   });
  return (
      <>
    <View style={styles.container}>
      {/* Product Description Section */}
      <TouchableOpacity style={{flexDirection:"row",justifyContent:"space-between"}} onPress={() => setDescExpanded(!descExpanded)}>
        <Text style={[styles.title,{fontFamily:"Manrope_700Bold"}]}>
          Product Description  
        </Text>
        <Text >
          {descExpanded ? <AntDesign name="up" size={20} color={"#404040"} /> : 
                      <AntDesign name="down" size={20} color={"#404040"} />}
        </Text>
      </TouchableOpacity>
      {descExpanded && 
          <Text style={[styles.longDescription,{fontFamily:"Manrope_400Regular"}]}>{description.long}</Text>
       }
  </View>

<View style={styles.container}>
      {/* Size Section */}
      <TouchableOpacity style={{flexDirection:"row",justifyContent:"space-between"}} onPress={() => setSizeExpanded(!sizeExpanded)}>
        <Text style={[styles.title,{fontFamily:"Manrope_700Bold"}]}>Size </Text>
        <Text > {sizeExpanded ? 
                      <AntDesign name="up" size={20} color={"#404040"} /> : 
                      <AntDesign name="down" size={20} color={"#404040"} />}
        </Text>
       </TouchableOpacity>
      {sizeExpanded && (
        <View style={styles.sizeContainer}>
          {Object.entries(dimensions).map(([key, value], index, array) => (
      <View key={key} style={[styles.sizeItem, index === array.length - 1 && { borderBottomWidth: 0 }]}>
        <Text style={[styles.label,{fontFamily:"Manrope_500Medium"}]}>{formatKey(key)}</Text>
        <Text style={[styles.value,{fontFamily:"Manrope_500Medium"}]}>{value}</Text>
      </View>
    ))}
          {sizeExpanded && (
        <>
           <Image
            source={{ uri: description.image.url }}
            style={[styles.image, { width: description.image.width, height: description.image.height }]}
            resizeMode="contain"
          />
        </>
      )}
        </View>
      )}
    </View>
    </>
  );
};

// Function to format keys into readable labels
const formatKey = (key) => {
  return key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());
};

// Styles
const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderColor: "#ddd",
    paddingTop: 10,
    padding: 16,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 18, 
  },
  longDescription: {
    fontSize: 14,
    color: "#555",
    marginBottom: 16,
    marginTop:10
  },
  image: {
    alignSelf: "center",
    marginBottom: 16,
  },
  sizeContainer: {
    borderTopWidth: 0,
    borderColor: "#ddd",
    paddingTop: 10,
  },
  sizeItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  label: {
    fontSize: 14,
   },
  value: {
    fontSize: 14,
   },
});

export default ExpandableProductInfo;
