import { View, Pressable, Text } from "react-native";

const ResultButton = ({ doPress }) => {
  return (
    <View>
      <Pressable
        onPress={doPress}
        className="bg-green-600 px-6 py-2.5 mb-14 mx-20 rounded-full active:bg-green-800 duration-300"
      >
        <Text className="text-white text-center font-semibold tracking-wider">
          Show Result
        </Text>
      </Pressable>
    </View>
  );
};

export default ResultButton;
