import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import ReviewModal from "./ReviewModal";
import { 
  useFonts,Manrope_700Bold,
  Manrope_600SemiBold,
  Manrope_400Regular,
  Manrope_800ExtraBold,
  Manrope_500Medium
} from "@expo-google-fonts/manrope";

const Reviews = ({ reviews }) => {
  const { summary, items, actions } = reviews;
  const [modalVisible, setModalVisible] = useState(false);
  let [fontsLoaded] = useFonts({
    Manrope_700Bold,
    Manrope_600SemiBold,
    Manrope_400Regular,
    Manrope_800ExtraBold,
    Manrope_500Medium
        });
  const handleReviewSubmit = (reviewData) => {
    console.log("Review Submitted:", reviewData);
    Alert.alert("Success", "Your review has been submitted!");
  };
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title,{fontFamily:"Manrope_700Bold"}]}>Reviews</Text>
        {actions.canAddReview && (
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={[styles.addReview,{fontFamily:"Manrope_700Bold"}]}>+ Add Review</Text>
          </TouchableOpacity>
        )}
        {/* Review Modal Component */}
    <ReviewModal
    visible={modalVisible}
    onClose={() => setModalVisible(false)}
    onSubmit={handleReviewSubmit}
  />
      </View>


    <View style={styles.rateContainer}>
      {/* Summary */}
      <View style={[styles.summaryContainer]}>
       <View style={styles.summary}>
        <Text style={[styles.rating,{fontFamily:"Manrope_800ExtraBold"}]}>{summary.averageRating.toFixed(1)}</Text>
        <Text style={styles.star}>★</Text>
       </View>
       <TouchableOpacity style={styles.totalReviewsButton}>
        <Text style={[styles.totalReviews,{fontFamily:"Manrope_700Bold"}]}>{summary.totalReviews} reviews</Text>
       </TouchableOpacity>
      </View>

      {/* Rating Distribution */}
      <View style={{flex:2}}>
        {Object.entries(summary.distribution)
          .reverse()
          .map(([stars, count]) => (
              <View key={stars} style={styles.ratingRow}>
              <Text style={[styles.starText,{fontFamily:"Manrope_500Medium"}]}>{stars}★</Text>
               <View style={styles.barContainer}>
                <View
                  style={[styles.barFill, { width: `${(count / summary.totalReviews) * 100}%` }]}
                  />
              </View>
            </View>
          ))}
      </View>
    </View> 

      {/* Reviews List */}
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.reviewItem}>
            <View style={styles.avatar}>
              <Text style={[styles.avatarText,{fontFamily:"Manrope_700Bold"}]}>{item.author.name[0]}</Text>
            </View>
            <View style={styles.reviewContent}>
              <Text style={[styles.author,{fontFamily:"Manrope_700Bold"}]}>{item.author.name}</Text>
              <Text style={[styles.reviewText,{fontFamily:"Manrope_500Medium"}]}>{item.content}</Text>
            </View>
              <View style={styles.stars}>
                {[...Array(5)].map((_, i) => (
                  <Text key={i} style={i < item.rating ? styles.filledStar : styles.emptyStar}>
                    ★
                  </Text>
                ))}
              </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
     
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
  },
  addReview: {
    fontSize: 14,
    color: "#156651",
    fontWeight: 700,
    textDecorationLine:"underline"
  },
  rateContainer:{
    flexDirection:"row",
    padding:10,
    justifyContent:"center",
    },
  summaryContainer:{
     justifyContent:"center",
     marginRight:44
  },

  totalReviewsButton:{
    backgroundColor:"#050505",
    borderRadius:52.5,
    width:105,
    height:30,
    justifyContent:"center",
    alignItems:'center',
   },
  summary: {
    flexDirection: "row",
    alignItems: "center",
     padding:8
  },
  rating: {
    fontSize: 34,
   },
  star: {
    fontSize: 42,
    color: "#156651",
    marginLeft: 4,
    borderRadius:1.5,
  },
  totalReviews: {
    marginLeft: 10,
    color: "#FFFFFF",
    fontSize:12
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 3,
  },
  starText: {
    width: 30,
    fontSize: 18,
    fontWeight:500,
    color:"#6A6A6A"
   },
  barContainer: {
    flex: 2,
    height: 6,
     borderRadius: 4,
    overflow: "hidden",
  },
  barFill: {
    height: 6,
    borderTopRightRadius:7.5,
    borderBottomRightRadius:7.5,
    backgroundColor: "#156651",
  },
  reviewItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 12,
    margin:10
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#1A7F65",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 14,
   },
  reviewContent: {
    marginLeft: 10,
    flex: 1,
  },
  author: {
    fontSize: 14,
    color:"#050505"
  },
  stars: {
    flexDirection: "row",
  },
  filledStar: {
    color: "#EBB65B",
    fontSize: 18,
  },
  emptyStar: {
    color: "#ddd",
    fontSize: 18,
  },
  reviewText: {
    color: "#868686",
    marginTop: 4,
  },
});

export default Reviews;
