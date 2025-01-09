import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Image
        source={require("./public/img.jpg")}
        style={styles.backgroundImage}
      >
        <Text style={{ color: "#bbb" }}>
          Open up App.js to start working on your app!
        </Text>
        <StatusBar style="auto" />
      </Image>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    alignItems: "center",
    justifyContent: "center",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
