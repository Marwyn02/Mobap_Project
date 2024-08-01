import { router } from "expo-router";
import { ScrollView, Image, Text, Pressable } from "react-native";

const comic = () => {
  const handleBackButton = () => {
    router.push("/");
  };

  return (
    <ScrollView className="flex bg-black">
      <Pressable
        className="z-50 mx-5 mt-10 bg-white border rounded-full px-3 py-1.5 active:bg-gray-400 duration-100"
        onPress={handleBackButton}
      >
        <Text className="text-center">Back to home</Text>
      </Pressable>
      <Image
        source={require("../../public/comic.png")}
        className="w-screen h-auto -mt-96"
        resizeMode="contain"
      />
    </ScrollView>
  );
};

export default comic;
