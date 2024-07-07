import { router } from "expo-router";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

const end = () => {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title} className="text-white mb-5">
          You beat Code Crusaders!
        </Text>
        <Pressable
          className="bg-yellow-600 p-5 rounded-md"
          onPress={() => router.push("/")}
        >
          <Text className="text-center text-white font-bold">Start again</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default end;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
    backgroundColor: "#000",
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
