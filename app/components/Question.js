import React from "react";
import { View, Text } from "react-native";

const Question = ({ isCorrect, currentQuestion }) => {
  return (
    <View className="text-black text-center font-bold bg-white w-screen rounded-t-3xl py-5 px-5">
      {isCorrect === false ? (
        <Text className="uppercase text-center bg-red-500 text-white rounded-full font-bold text-2xl py-2 tracking-widest">
          Incorrect answer!
        </Text>
      ) : isCorrect === true ? (
        <Text className="uppercase text-center bg-green-500 rounded-full text-white font-bold text-2xl py-2 tracking-widest">
          Correct answer!
        </Text>
      ) : (
        <Text className="py-2 text-lg">{currentQuestion}</Text>
      )}
    </View>
  );
};

export default Question;
