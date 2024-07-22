import { useState, useEffect } from "react";
import {
  ImageBackground,
  View,
  Pressable,
  TextInput,
  Text,
  StyleSheet,
} from "react-native";
import { router } from "expo-router";
import Question from "../components/Question";
import QuestionCount from "../components/QuestionCount";

const getRandomItem = (array, num) => {
  const shuffledArray = array.sort(() => 0.5 - Math.random());
  return shuffledArray.slice(0, num);
};

export default function quiz4() {
  const [questions, setQuestions] = useState([]);
  const [isCorrect, setIsCorrect] = useState(null);
  const [value, setValue] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    setQuestions(getRandomItem(data, 5)); // Pick a random question when component mounts
  }, []);

  const onSubmit = () => {
    if (questions.length === 0) return;

    const currentQuestion = questions[currentQuestionIndex];
    const correctAnswer = currentQuestion.a;

    if (value !== "" && value !== null && value !== undefined) {
      if (value.trim().toLowerCase() === correctAnswer.trim().toLowerCase()) {
        setIsCorrect(true);
        setCorrectAnswersCount((prevCount) => prevCount + 1);
      } else {
        setIsCorrect(false);
      }
    } else {
      setIsCorrect(false);
    }

    setTimeout(() => {
      setIsCorrect(null);
      setValue("");

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setShowResult(true);
      }
    }, 2000);
  };

  const onShowResult = () => {
    setTimeout(() => {
      router.replace({
        pathname: "/result4",
        params: {
          correctAnswersCount,
          totalQuestions: questions.length,
        },
      });
    }, 2000);
  };

  if (questions.length === 0) {
    return <Text>Loading...</Text>; // Show loading while question is being selected
  }
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <ImageBackground
      source={require("../../public/Scene4.gif")}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <Text className="text-2xl font-bold py-10 px-5">Level 4</Text>
      <View style={styles.container}>
        <QuestionCount
          showResult={showResult}
          currentQuestionIndex={currentQuestionIndex}
          questions={questions.length}
          quiz={4}
        />

        {!showResult ? (
          <>
            <Question
              isCorrect={isCorrect}
              currentQuestion={currentQuestion.q}
            />

            <View className="bg-white px-20 pt-10 pb-24">
              <TextInput
                multiline
                value={value}
                onChangeText={setValue}
                placeholder="Enter your answer here"
                blurOnSubmit={true}
                className={`bg-gray-200 border border-black px-5 py-3.5 text-lg text-black w-[375px] rounded-full duration-300 ${
                  value.length > 30 && "rounded-lg"
                }`}
              />
              <Pressable
                className={`bg-blue-400 active:bg-blue-200 py-3 rounded-full mt-5 ${
                  value === "" && "bg-gray-300"
                }`}
                onPress={onSubmit}
                disabled={value === ""}
              >
                <Text className="text-center text-white font-semibold">
                  Enter
                </Text>
              </Pressable>
            </View>
          </>
        ) : (
          <View>
            <Pressable
              onPress={() => onShowResult()}
              className="bg-green-600 px-6 py-2.5 mb-10 rounded-full active:bg-green-800 duration-300"
            >
              <Text className="text-white font-semibold tracking-wider">
                Show Result
              </Text>
            </Pressable>
          </View>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end", // Align content at the bottom
    alignItems: "center", // Center content horizontally
    padding: 0,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center", // Center content vertically
  },
});

const data = [
  {
    id: 1,
    q: "To select all columns from the table 'users' in SQL.",
    a: "SELECT * FROM users",
  },
  {
    id: 2,
    q: "To select only the 'name' and 'email' columns from the table 'users' in SQL.",
    a: "SELECT name, email FROM users",
  },
  {
    id: 3,
    q: "Write an SQL query to retrieve all the records from the employees table whwre the employees salary is greater than $50,000",
    a: "SELECT * FROM employees WHERE salary > 50000",
  },
  {
    id: 4,
    q: "To delete a user with id 1 from the table 'users' in SQL.",
    a: "DELETE FROM users WHERE id = 1",
  },
  {
    id: 5,
    q: "To delete all users from the table 'users' where the 'age' is less than 18 in SQL.",
    a: "DELETE FROM users WHERE age < 18",
  },
  {
    id: 6,
    q: "To select all columns from the table 'orders' where the 'user_id' is 5 in SQL.",
    a: "SELECT * FROM orders WHERE user_id = 5",
  },
  {
    id: 7,
    q: "To count the number of users in the table 'users' in SQL.",
    a: "SELECT COUNT(*) FROM users",
  },
  {
    id: 8,
    q: "To find the maximum price from the table 'products' in SQL.",
    a: "SELECT MAX(price) FROM products",
  },
  {
    id: 9,
    q: "To find the minimum price from the table 'products' in SQL.",
    a: "SELECT MIN(price) FROM products",
  },
  {
    id: 10,
    q: "To find the average price from the table 'products' in SQL.",
    a: "SELECT AVG(price) FROM products",
  },
  {
    id: 11,
    q: "To select all columns from the table 'users' where the name starts with 'A' in SQL.",
    a: "SELECT * FROM users WHERE name LIKE 'A%'",
  },
  {
    id: 12,
    q: "To select all distinct cities from the table 'users' in SQL.",
    a: "SELECT DISTINCT city FROM users",
  },
  {
    id: 13,
    q: "To join the tables 'users' and 'orders' on 'user_id' in SQL.",
    a: "SELECT * FROM users JOIN orders ON users.id = orders.user_id",
  },
  {
    id: 14,
    q: "To select all columns from the table 'users' where the age is between 20 and 30 in SQL.",
    a: "SELECT * FROM users WHERE age BETWEEN 20 AND 30",
  },
  {
    id: 15,
    q: "To select all columns from the table 'users' where the column 'email' is not null in SQL.",
    a: "SELECT * FROM users WHERE email IS NOT NULL",
  },
  {
    id: 16,
    q: "To order the results of the table 'users' by 'name' in ascending order in SQL.",
    a: "SELECT * FROM users ORDER BY name ASC",
  },
  {
    id: 17,
    q: "To order the results of the table 'users' by 'age' in descending order in SQL.",
    a: "SELECT * FROM users ORDER BY age DESC",
  },
  {
    id: 18,
    q: "To limit the results of the table 'users' to 10 rows in SQL.",
    a: "SELECT * FROM users LIMIT 10",
  },
  {
    id: 19,
    q: "To select all columns from the table 'users' and alias the column 'name' as 'username' in SQL.",
    a: "SELECT name AS username, * FROM users",
  },
  // {
  //   id: 20,
  //   q: "To create a new table 'customers' with columns 'id', 'name', and 'email' in SQL.",
  //   a: "CREATE TABLE customers (id INT PRIMARY KEY, name VARCHAR(1255), email VARCHAR(255))",
  // },
  // {
  //   id: 21,
  //   q: "To add a new column 'phone' to the table 'customers' in SQL.",
  //   a: "ALTER TABLE customers ADD phone VARCHAR(255)",
  // },
  {
    id: 22,
    q: "To drop the table 'old_customers' in SQL.",
    a: "DROP TABLE old_customers",
  },
  {
    id: 23,
    q: "To select all columns from the table 'products' where the price is greater than 100 in SQL.",
    a: "SELECT * FROM products WHERE price > 100",
  },
  {
    id: 24,
    q: "To select the first 5 rows from the table 'orders' in SQL.",
    a: "SELECT * FROM orders LIMIT 5",
  },
  {
    id: 25,
    q: "To find the total price of all products in the table 'products' in SQL.",
    a: "SELECT SUM(price) FROM products",
  },
  {
    id: 26,
    q: "To select all columns from the table 'customers' where the 'email' ends with 'example.com' in SQL.",
    a: "SELECT * FROM customers WHERE email LIKE '%example.com'",
  },
  {
    id: 27,
    q: "To select all columns from the table 'orders' where the 'order_date' is in the year 2023 in SQL.",
    a: "SELECT * FROM orders WHERE YEAR(order_date) = 2023",
  },
  {
    id: 28,
    q: "To select the top 3 highest prices from the table 'products' in SQL.",
    a: "SELECT * FROM products ORDER BY price DESC LIMIT 3",
  },
  {
    id: 29,
    q: "To update the 'status' of orders to 'shipped' where the 'order_id' is 100 in SQL.",
    a: "UPDATE orders SET status = 'shipped' WHERE order_id = 100",
  },
];
