import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Question = ({ isCorrect, currentQuestion }) => {
  return (
    <View style={styles.container}>
      {isCorrect === false ? (
        <Text style={styles.incorrectAnswer}>Incorrect answer!</Text>
      ) : isCorrect === true ? (
        <Text style={styles.correctAnswer}>Correct answer!</Text>
      ) : (
        <Text style={styles.questionText}>{currentQuestion}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
    backgroundColor: "white",
    width: "100%",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  incorrectAnswer: {
    textTransform: "uppercase",
    textAlign: "center",
    backgroundColor: "red",
    color: "white",
    borderRadius: 50,
    fontWeight: "bold",
    fontSize: 24,
    paddingVertical: 8,
    letterSpacing: 2,
  },
  correctAnswer: {
    textTransform: "uppercase",
    textAlign: "center",
    backgroundColor: "green",
    color: "white",
    borderRadius: 50,
    fontWeight: "bold",
    fontSize: 24,
    paddingVertical: 8,
    letterSpacing: 2,
  },
  questionText: {
    paddingVertical: 8,
    fontSize: 18,
  },
});

export default Question;
