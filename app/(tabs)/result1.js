import { router, useLocalSearchParams } from "expo-router";
import { Pressable, View, Text, StyleSheet } from "react-native";

export default function Result1() {
  const { correctAnswersCount, totalQuestions } = useLocalSearchParams();
  const percentage = (correctAnswersCount / totalQuestions) * 100;

  const handleRetry = () => {
    router.replace("/quiz1");
  };

  const handleNextQuiz = () => {
    router.replace("/quiz2");
  };
  return (
    <View style={styles.container}>
      <Text className="text-white text-center text-2xl mb-4">
        Quiz 1 Result
      </Text>
      <Text className="text-white text-center text-lg">
        You got {correctAnswersCount} out of {totalQuestions} correct.
      </Text>

      {percentage < 80 && (
        <Text className="text-xs text-gray-500 text-center mt-1">
          Unfortunately, you did not pass the quiz as you did not reach the
          required{" "}
          <Text className="text-orange-400 font-semibold">80% score</Text>.
          Please retry the quiz to improve your understanding and try again.
        </Text>
      )}

      {percentage < 80 ? (
        <Pressable onPress={handleRetry}>
          <Text className="text-white font-semibold underline my-5">
            Retry quiz
          </Text>
        </Pressable>
      ) : (
        <Pressable onPress={handleNextQuiz}>
          <Text className="text-white font-semibold underline my-5">
            Click to Proceed
          </Text>
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
});
