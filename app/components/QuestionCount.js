import React from "react";
import { Text, View, StyleSheet } from "react-native";

const QuestionCount = ({
  showResult,
  currentQuestionIndex,
  correctAnswer,
  questions,
  quiz,
}) => {
  return !showResult ? (
    <View style={styles.questionContainer}>
      <Text style={styles.questionText}>
        Question: {currentQuestionIndex + 1} / {questions}
      </Text>
      <Text style={styles.scoreText}>
        Score: <Text style={styles.scoreValue}>{correctAnswer}</Text>
      </Text>
    </View>
  ) : (
    <Text style={styles.quizCompleteText}>Quiz {quiz} Complete!</Text>
  );
};

const styles = StyleSheet.create({
  questionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  questionText: {
    color: "black",
    textAlign: "center",
    marginBottom: 16,
    fontWeight: "bold",
    backgroundColor: "white",
    borderRadius: 50,
    paddingHorizontal: 12,
    paddingVertical: 2,
  },
  scoreText: {
    color: "black",
    marginBottom: 16,
    fontWeight: "bold",
    backgroundColor: "white",
    borderRadius: 50,
    paddingHorizontal: 12,
    paddingVertical: 2,
  },
  scoreValue: {
    color: "green",
  },
  quizCompleteText: {
    color: "white",
    textAlign: "center",
    marginBottom: 288,
    fontSize: 32,
    backgroundColor: "green",
    width: "100%",
    paddingVertical: 20,
    fontWeight: "bold",
  },
});

export default QuestionCount;
