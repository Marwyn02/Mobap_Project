import React from "react";
import { View, Text } from "react-native";

const Question = ({ isCorrect, currentQuestion }) => {
  return (
    <View className="text-black text-center font-bold bg-gray-100 w-screen">
      {isCorrect === false ? (
        <Text className="text-center text-red-500 font-semibold text-xl py-2">
          Incorrect answer!
        </Text>
      ) : isCorrect === true ? (
        <Text className="text-center text-green-500 font-semibold text-xl py-2">
          Correct answer!
        </Text>
      ) : (
        <Text className="px-5 py-2 text-lg">{currentQuestion}</Text>
      )}
    </View>
  );
};

export default Question;
