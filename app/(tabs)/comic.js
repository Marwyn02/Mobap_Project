import { router } from "expo-router";
import { ScrollView, Image, Text, Pressable, StyleSheet } from "react-native";

const comic = () => {
  const handleBackButton = () => {
    router.push("/");
  };

  return (
    <ScrollView style={styles.scrollView}>
      <Pressable
        style={({ pressed }) => [
          styles.backButton,
          pressed && styles.backButtonPressed,
        ]}
        onPress={handleBackButton}
      >
        <Text style={styles.backButtonText}>Back to home</Text>
      </Pressable>
      <Image
        source={require("../../public/comic.png")}
        style={styles.comicImage}
        resizeMode="contain"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "black",
  },
  backButton: {
    zIndex: 50,
    marginHorizontal: 20,
    marginTop: 40,
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 50,
    paddingHorizontal: 12,
    paddingVertical: 6,
    transitionDuration: "100ms",
  },
  backButtonPressed: {
    backgroundColor: "gray",
  },
  backButtonText: {
    textAlign: "center",
  },
  comicImage: {
    width: "100%",
    height: "auto",
    marginTop: -96,
  },
});

export default comic;
