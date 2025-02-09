import React, { useState, useRef } from "react";
import { 
  View, 
  Image, 
  FlatList, 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  Dimensions 
} from "react-native";
import BestSellerTag from "./BestSellerTag";

const { width } = Dimensions.get("window");

interface ProductImageGalleryProps {
  images?: { gallery: { url: string }[] };
  isBestSeller?: boolean;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ images,isBestSeller}) => {
  const imageList = images?.gallery?.map(item => item.url) || [];
  const [selectedImage, setSelectedImage] = useState(imageList.length > 0 ? imageList[0] : "");
  const flatListRef = useRef<FlatList<string>>(null);

  const handleSelectImage = (image: string, index: number) => {
    setSelectedImage(image);
    flatListRef.current?.scrollToIndex({ animated: true, index });
  };

  return (
    <View style={styles.container}>
      {/* Best Seller Tag */}
         {isBestSeller && <BestSellerTag/>}

      {/* Scrollable Main Image */}
      <FlatList
        ref={flatListRef}
        data={imageList}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.imageWrapper}>
            <Image source={{ uri: item }} style={styles.mainImage} />
          </View>
        )}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setSelectedImage(imageList[index]);
        }}
        contentContainerStyle={{ alignItems: "center" }} // Centers items
      />

      {/* Thumbnails */}
      <View style={styles.thumbnailContainer}>
        {imageList.map((image, index) => (
          <TouchableOpacity key={index} onPress={() => handleSelectImage(image, index)}>
            <Image
              source={{ uri: image }}
              style={[styles.thumbnail, selectedImage === image && styles.selectedThumbnail]}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor:'white',
    margin:0
   },
   
  imageWrapper: {
    width, // Makes sure the image takes full screen width
    justifyContent: "center",
    alignItems: "center",
   },
  mainImage: {
    width: 264, // Reduce width slightly for padding
    height: 264,
    resizeMode: "contain",
    alignSelf: "center", // Ensures the image is centered
   },
  thumbnailContainer: {
    flexDirection: "row",
    marginTop:10,
    marginBottom:10
  },
  thumbnail: {
    width: 54,
    height: 54,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  selectedThumbnail: {
    borderWidth: 2,
    borderColor: "#156651",
  },
});

export default ProductImageGallery;
