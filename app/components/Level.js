import React from "react";
import { Text } from "react-native";

const Level = ({ level }) => {
  return (
    <Text className="text-lg tracking-widest uppercase font-bold py-10 px-5">
      Level {level}
    </Text>
  );
};

export default Level;
