import { router, useLocalSearchParams } from "expo-router";
import { Pressable, View, Text, StyleSheet } from "react-native";

export default function Result4() {
  const { correctAnswersCount, totalQuestions } = useLocalSearchParams();
  const percentage = (correctAnswersCount / totalQuestions) * 100; // Divide the score to the items of the question

  // Retry the quiz 4 again
  const handleRetry = () => {
    router.replace("/quiz4");
  };

  // Proceed to the quiz 5
  const handleNextQuiz = () => {
    router.replace("/quiz5");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.resultTitle}>Quiz 4 Result</Text>
      <Text style={styles.resultText}>
        You got {correctAnswersCount} out of {totalQuestions} correct.
      </Text>

      {percentage < 80 ? (
        <Text style={styles.retryMessage}>
          Unfortunately, you did not pass the quiz as you did not reach the
          required
          <Text style={styles.requiredScore}> 4 score</Text>. Please retry the
          quiz to improve your understanding and try again.
        </Text>
      ) : (
        <View>
          <Text style={styles.passMessage}>You've passed the Quiz 4!</Text>
          <Text style={styles.proceedMessage}>
            Click the proceed to continue to Level 5.
          </Text>
        </View>
      )}

      {percentage < 80 ? (
        <Pressable onPress={handleRetry}>
          <Text style={styles.retryButton}>Retry quiz</Text>
        </Pressable>
      ) : (
        <Pressable onPress={handleNextQuiz}>
          <Text style={styles.proceedButton}>Click to Proceed</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
    backgroundColor: "#000",
  },
  resultTitle: {
    color: "white",
    textAlign: "center",
    fontSize: 24,
    marginBottom: 16,
  },
  resultText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
  },
  retryMessage: {
    fontSize: 12,
    color: "gray",
    textAlign: "center",
    marginTop: 4,
  },
  requiredScore: {
    color: "orange",
    fontWeight: "600",
  },
  passMessage: {
    fontSize: 18,
    color: "orange",
    textAlign: "center",
    marginTop: 4,
  },
  proceedMessage: {
    fontSize: 10,
    color: "gray",
    textAlign: "center",
  },
  retryButton: {
    fontSize: 18,
    color: "white",
    fontWeight: "600",
    textDecorationLine: "underline",
    marginVertical: 20,
  },
  proceedButton: {
    color: "white",
    fontWeight: "600",
    textDecorationLine: "underline",
    marginVertical: 20,
  },
});
