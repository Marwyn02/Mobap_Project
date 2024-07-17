import { StatusBar } from "expo-status-bar";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";

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

// useEffect(() => {
//   const userData = data.filter((item) => item.user === name);
//   setFilteredData(userData);
//   const totalPrice = userData.reduce((sum, item) => sum + item.price, 0);
//   setTotal(totalPrice);
// }, [name]);

// const [name, setName] = useState();
// const [address, setAddress] = useState();
// const [submit, setSubmit] = useState(false);

// const [filteredData, setFilteredData] = useState([]);
// const [total, setTotal] = useState(0);

// const onSubmit = () => {
//   setSubmit(!submit);
// };
