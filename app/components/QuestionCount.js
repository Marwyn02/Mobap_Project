import React from "react";
import { Text } from "react-native";

const QuestionCount = ({
  showResult,
  currentQuestionIndex,
  questions,
  quiz,
}) => {
  return (
    <>
      {!showResult ? (
        <Text className="text-white text-center mb-4 font-bold text-lg">
          Question {currentQuestionIndex + 1} / {questions}
        </Text>
      ) : (
        <Text className="text-white text-center mb-72 text-4xl bg-green-600 w-full py-5 font-bold">
          Quiz {quiz} Complete!
        </Text>
      )}
    </>
  );
};

export default QuestionCount;
