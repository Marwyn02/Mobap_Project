import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

const lost = () => {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>You Lost!</Text>

          <Text style={styles.subTitle}>
            You have been defeated by Glitch King!
          </Text>

          <Pressable
            style={({ pressed }) => [
              styles.retryButton,
              pressed && styles.retryButtonPressed,
            ]}
            onPress={() => router.push("/quiz5")}
          >
            <Text style={styles.retryButtonText}>Fight Glitch King again!</Text>
          </Pressable>
        </View>

        <Pressable onPress={() => router.push("/")}>
          <Text style={styles.homeButton}>Go home</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  innerContainer: {
    alignItems: "center",
  },
  title: {
    color: "red",
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
    marginHorizontal: 48,
    marginVertical: 20,
  },
  retryButton: {
    backgroundColor: "yellow",
    padding: 20,
    marginHorizontal: 40,
    borderRadius: 10,
  },
  retryButtonPressed: {
    backgroundColor: "orange",
  },
  retryButtonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
  homeButton: {
    textAlign: "center",
    color: "white",
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
});

export default lost;
