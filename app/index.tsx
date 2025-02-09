import ExpandableProductInfo from "@/components/ExpandableProductInfo";
import Footer from "@/components/Footer";
import FrequentlyBought from "@/components/FrequentlyBought";
import ProductDetails from "@/components/ProductDetails";
import ProductImageGallery from "@/components/ProductImageGallery";
import Reviews from "@/components/Reviews";
import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, ScrollView, StyleSheet } from "react-native";
import { useFonts, Manrope_400Regular } from "@expo-google-fonts/manrope";

const Index = () => {
  const [product, setProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isWishlisted,setIswishlisted] = useState(false)
  
  let [fontsLoaded] = useFonts({
      Manrope_400Regular,
    });
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://s8hemrsz5o.to.intercept.rest/productDetails");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
         setProduct(data.product);
      } catch (err: any) {
        setError(err.message);
        console.error("API error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <ScrollView contentContainerStyle={[styles.scrollViewContainer, ]}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
        ) : error ? (
          <Text style={[styles.errorText,{fontFamily: "Manrope_400Regular",}]}>Error: {error}</Text>
        ) : product ? (
          <> 
            <ProductImageGallery
              images={product.images}
              isBestSeller={Array.isArray(product.tags) && product.tags.includes("Best Seller")}
            />
            <ProductDetails name={product?.name} variants={product?.variants || []}  rating={product?.rating || {}} description={product?.description} />
            <ExpandableProductInfo description={product?.description} dimensions={product?.dimensions}/>
            <Reviews reviews={product?.reviews || {}}/>
            <FrequentlyBought frequentlyBoughtWith={product?.frequentlyBoughtWith || []} />

          </>
        ) : (
          <Text style={styles.errorText}>No product found</Text>
        )}
      </ScrollView>
        <Footer name={product?.name}  onWishlistPress={()=>setIswishlisted(!isWishlisted)} isWishlisted={isWishlisted} />
    </>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    paddingBottom: 20, // Prevents content from getting cut off
  },
  loader: {
    marginTop: 50,
  },
  errorText: {
    textAlign: "center",
    color: "red",
    marginTop: 20,
  },
});

export default Index;
