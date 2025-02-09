import React, { useState } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";

const ReviewModal = ({ visible, onClose, onSubmit }) => {
  const [rating, setRating] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [review, setReview] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = () => {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedReview = review.trim();
    const numericRating = Number(rating);

    if (!trimmedName || !trimmedEmail || !trimmedReview) {
      Alert.alert("Error", "All fields are required!");
      return;
    }

    if (isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
      Alert.alert("Error", "Rating must be a number between 1 and 5.");
      return;
    }

    if (!validateEmail(trimmedEmail)) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }

    // Pass review data to parent
    onSubmit({ rating: numericRating, name: trimmedName, email: trimmedEmail, review: trimmedReview });

    // Reset fields
    setRating("");
    setName("");
    setEmail("");
    setReview("");
    onClose(); // Close modal after submission
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Submit a Review</Text>

          {/* Rating Input */}
          <TextInput
            style={styles.input}
            placeholder="Enter Rating (1-5)"
            keyboardType="numeric"
            value={rating}
            onChangeText={setRating}
          />

          {/* Name Input */}
          <TextInput
            style={styles.input}
            placeholder="Your Name"
            value={name}
            onChangeText={setName}
          />

          {/* Email Input */}
          <TextInput
            style={styles.input}
            placeholder="Your Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          {/* Review Details */}
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Write your review..."
            multiline
            numberOfLines={4}
            value={review}
            onChangeText={setReview}
          />

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>

          {/* Close Button */}
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

// Styles
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  textArea: {
    height: 80,
  },
  submitButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  submitText: {
    color: "#fff",
    fontWeight: "bold",
  },
  closeText: {
    textAlign: "center",
    marginTop: 10,
    color: "red",
    fontWeight: "bold",
  },
});

export default ReviewModal;
