import React from "react";
import { Text, StyleSheet } from "react-native";

const Level = ({ level }) => {
  return <Text style={styles.levelText}>Level {level}</Text>;
};

const styles = StyleSheet.create({
  levelText: {
    fontSize: 18,
    letterSpacing: 2,
    textTransform: "uppercase",
    fontWeight: "bold",
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
});

export default Level;
