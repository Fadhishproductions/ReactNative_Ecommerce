import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useFonts, Manrope_400Regular } from "@expo-google-fonts/manrope";
import * as SplashScreen from "expo-splash-screen"; // ✅ Use SplashScreen instead of AppLoading
import { useCallback } from "react";
import { useEffect } from "react";

const BestSellerTag = () => {
  let [fontsLoaded] = useFonts({
    Manrope_400Regular,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const onLayoutRootView = useCallback(async () => {
    if (!fontsLoaded) {
      await SplashScreen.preventAutoHideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // Return null instead of AppLoading
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <View style={styles.tag}>
        <Text style={styles.text}>Best Seller</Text>
        <View style={styles.arrow} />
      </View>
      <View style={styles.topArrow} />
      <View style={styles.bottomArrow} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    position: "absolute",
    top: 20,
    left:1,
    zIndex: 10, 
  },
  tag: {
    backgroundColor: "#E44A4A", 
    padding:1,
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  text: {
    color: "white",
    fontSize: 12,
    margin: 2,
    fontFamily: "Manrope_400Regular",  
    fontWeight: "700",
  },
  arrow: {
    position: "absolute",
    top: 0,
    right: -9.8,
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderTopWidth: 11,
    borderBottomWidth: 11,
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
    borderLeftColor: "#E44A4A",
  },
  topArrow: {
    position: "absolute",
    right: -19,
    width: 0,
    height: 0,
    borderTopWidth: 12,
    borderRightWidth: 11,
    borderLeftWidth: 14,
    borderTopColor: "#E44A4A",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    opacity:0.9
  },
  bottomArrow: {
    position: "absolute",
    top: 10.9,
    right: -18.5,
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 9,
    borderBottomWidth: 11,
    borderRightColor: "transparent",
    borderBottomColor: "#B24040",
    borderLeftColor: "transparent",
  },
});

export default BestSellerTag;
