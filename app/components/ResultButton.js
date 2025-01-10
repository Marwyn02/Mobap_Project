import { View, Pressable, Text, StyleSheet } from "react-native";

const ResultButton = ({ doPress }) => {
  return (
    <View>
      <Pressable
        onPress={doPress}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
      >
        <Text style={styles.buttonText}>Show Result</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "green",
    paddingHorizontal: 24,
    paddingVertical: 10,
    marginBottom: 56,
    marginHorizontal: 80,
    borderRadius: 50,
    transitionDuration: "300ms",
  },
  buttonPressed: {
    backgroundColor: "darkgreen",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "600",
    letterSpacing: 1.25,
  },
});

export default ResultButton;
