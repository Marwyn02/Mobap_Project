import React from "react";
import { Text, View } from "react-native";

const QuestionCount = ({
  showResult,
  currentQuestionIndex,
  correctAnswer,
  questions,
  quiz,
}) => {
  return (
    <>
      {!showResult ? (
        <View className="flex flex-row justify-between items-center px-2.5">
          <Text className="text-black text-center mb-4 font-bold bg-white rounded-full px-3 py-0.5">
            Question: {currentQuestionIndex + 1} / {questions}
          </Text>
          <Text className="text-black mb-4 font-bold bg-white rounded-full px-3 py-0.5">
            Score: <Text className="text-green-600">{correctAnswer}</Text>
          </Text>
        </View>
      ) : (
        <Text className="text-white text-center mb-72 text-4xl bg-green-600 w-full py-5 font-bold">
          Quiz {quiz} Complete!
        </Text>
      )}
    </>
  );
};

export default QuestionCount;
