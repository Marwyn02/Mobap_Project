import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

const end = () => {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>You beat Code Crusaders!</Text>
        <Text style={styles.subTitle}>You have defeated Glitch King!</Text>

        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
          onPress={() => router.push("/")}
        >
          <Text style={styles.buttonText}>Start again</Text>
        </Pressable>

        <Text style={styles.thankYouText}>Thank you for playing our game.</Text>
      </View>
    </View>
  );
};

export default end;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#000",
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    color: "white",
    fontSize: 24,
    padding: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subTitle: {
    color: "white",
    fontWeight: "bold",
    backgroundColor: "black",
    paddingVertical: 12,
    textAlign: "center",
    fontSize: 20,
    marginTop: 20,
  },
  button: {
    backgroundColor: "yellow",
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 20,
  },
  buttonPressed: {
    backgroundColor: "orange",
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
  thankYouText: {
    color: "white",
    textAlign: "center",
    padding: 20,
    marginTop: 8,
  },
});
