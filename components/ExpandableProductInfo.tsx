import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
 
const ExpandableProductInfo = ({ description, dimensions }) => {
  const [descExpanded, setDescExpanded] = useState(false);
  const [sizeExpanded, setSizeExpanded] = useState(false);

  return (
      <>
    <View style={styles.container}>
      {/* Product Description Section */}
      <TouchableOpacity style={{flexDirection:"row",justifyContent:"space-between"}} onPress={() => setDescExpanded(!descExpanded)}>
        <Text style={styles.title}>
          Product Description  
        </Text>
        <Text style={styles.title}>
          {descExpanded ? <AntDesign name="up" size={20} color={"#404040"} /> : 
                      <AntDesign name="down" size={20} color={"#404040"} />}
        </Text>
      </TouchableOpacity>
      {descExpanded && 
          <Text style={styles.longDescription}>{description.long}</Text>
       }
  </View>

<View style={styles.container}>
      {/* Size Section */}
      <TouchableOpacity style={{flexDirection:"row",justifyContent:"space-between"}} onPress={() => setSizeExpanded(!sizeExpanded)}>
        <Text style={styles.title}>Size </Text>
        <Text style={styles.title}> {sizeExpanded ? 
                      <AntDesign name="up" size={20} color={"#404040"} /> : 
                      <AntDesign name="down" size={20} color={"#404040"} />}
        </Text>
       </TouchableOpacity>
      {sizeExpanded && (
        <View style={styles.sizeContainer}>
          {Object.entries(dimensions).map(([key, value]) => (
            <View key={key} style={styles.sizeItem}>
              <Text style={styles.label}>{formatKey(key)}</Text>
              <Text style={styles.value}>{value}</Text>
            </View>
          ))}
          {descExpanded && (
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
    fontWeight: 700,
    marginBottom: 8,
  },
  longDescription: {
    fontSize: 14,
    color: "#555",
    marginBottom: 16,
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
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
  },
  value: {
    fontSize: 14,
    color: "#555",
  },
});

export default ExpandableProductInfo;
