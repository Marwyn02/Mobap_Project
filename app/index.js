import { router } from "expo-router";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function Page() {
  // const [name, setName] = useState();
  // const [address, setAddress] = useState();
  // const [submit, setSubmit] = useState(false);

  // const [filteredData, setFilteredData] = useState([]);
  // const [total, setTotal] = useState(0);

  // const onSubmit = () => {
  //   setSubmit(!submit);
  // };

  const playButton = () => {
    router.push("(tabs)");
  };

  // useEffect(() => {
  //   const userData = data.filter((item) => item.user === name);
  //   setFilteredData(userData);
  //   const totalPrice = userData.reduce((sum, item) => sum + item.price, 0);
  //   setTotal(totalPrice);
  // }, [name]);
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title} className="text-white mb-5">
          Code Crusaders
        </Text>
        <Pressable
          className="bg-yellow-600 p-5 rounded-md"
          onPress={playButton}
        >
          <Text className="text-center text-white font-bold">Play</Text>
        </Pressable>
      </View>
    </View>
  );
}

// const data = [
//   {
//     id: 1,
//     name: "Apple",
//     price: 10,
//     user: "Marwyn",
//   },
//   {
//     id: 2,
//     name: "Pear",
//     price: 12,
//     user: "Marwyn",
//   },
//   {
//     id: 3,
//     name: "Grapes",
//     price: 15,
//     user: "Sheen",
//   },
// ];

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
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});

/* {!submit && (
          <View>
            <View>
              <Text>Name</Text>
              <TextInput
                className="border border-black"
                onChangeText={(text) => setName(text)}
              />
            </View>
            <View>
              <Text>Address</Text>
              <TextInput
                className="border border-black"
                onChangeText={(text) => setAddress(text)}
              />
            </View>
          </View>
        )}

        <Pressable onPress={onSubmit}>
          <Text>{!submit ? "Submit" : "Back to form"}</Text>
        </Pressable>

        {submit && (
          <View>
            <Text className="mb-5">Hello, {name}!</Text>
            <View>
              <Text className="text-lg font-semibold">Orders</Text>
              {submit ? (
                filteredData.length > 0 ? (
                  <View>
                    {filteredData.map((d) => (
                      <View key={d.id}>
                        <Text>
                          {d.name} - ${d.price}
                        </Text>
                      </View>
                    ))}
                    <View className="mt-5">
                      <Text>Total - ${total}</Text>
                    </View>
                  </View>
                ) : (
                  <Text>No Orders</Text>
                )
              ) : (
                <Text>No Orders</Text>
              )}
            </View>
          </View>
)} */
