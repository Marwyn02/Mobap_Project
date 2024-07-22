import React, { useState } from "react";
import {
  ImageBackground,
  View,
  Text,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";
import Question from "../app/components/Question";
import { router } from "expo-router";

const questions = [
  {
    question: "What is a blockchain?",
    options: [
      "A decentralized ledger",
      "A centralized database",
      "A cloud storage service",
    ],
    correctAnswer: "A decentralized ledger",
  },
  {
    question: "What does SQL stand for?",
    options: [
      "Structured Query Language",
      "Sequential Query Language",
      "Static Query Language",
    ],
    correctAnswer: "Structured Query Language",
  },
  {
    question: "Which of these is NOT a NoSQL database?",
    options: ["MySQL", "MongoDB", "Cassandra"],
    correctAnswer: "MySQL",
  },
  {
    question: "What is a JOIN in SQL used for?",
    options: [
      "To combine rows from two or more tables",
      "To filter rows based on a condition",
      "To sort rows in ascending order",
    ],
    correctAnswer: "To combine rows from two or more tables",
  },
  {
    question: "What is Web3?",
    options: [
      "A framework for building web applications",
      "A protocol for decentralized applications",
      "A programming language for web development",
    ],
    correctAnswer: "A protocol for decentralized applications",
  },
  {
    question: "Which of these is NOT a Web3 library?",
    options: ["Web3.js", "Solidity", "Truffle"],
    correctAnswer: "Solidity",
  },
  {
    question: "What does IPFS stand for?",
    options: [
      "InterPlanetary File System",
      "Internet Protocol File Sharing",
      "Integrated Public File Storage",
    ],
    correctAnswer: "InterPlanetary File System",
  },
  {
    question: "What is a smart contract?",
    options: [
      "A legally binding digital contract",
      "A program that runs on a blockchain",
      "An encrypted data storage solution",
    ],
    correctAnswer: "A program that runs on a blockchain",
  },
  {
    question: "What is the primary purpose of Docker?",
    options: [
      "To containerize applications",
      "To automate database management",
      "To optimize web server performance",
    ],
    correctAnswer: "To containerize applications",
  },
  {
    question:
      "Which database management system is known for its horizontal scaling?",
    options: ["MongoDB", "SQLite", "PostgreSQL"],
    correctAnswer: "MongoDB",
  },
  {
    question: "What does CRUD stand for in database operations?",
    options: [
      "Create, Read, Update, Delete",
      "Compute, Review, Update, Deploy",
      "Control, Receive, Update, Discard",
    ],
    correctAnswer: "Create, Read, Update, Delete",
  },
  {
    question: "Which SQL statement is used to delete data from a database?",
    options: ["REMOVE", "DELETE", "DROP"],
    correctAnswer: "DELETE",
  },
  {
    question: "What is a primary key in a database table?",
    options: [
      "A unique identifier for each row",
      "A column that holds text data",
      "A method for indexing rows",
    ],
    correctAnswer: "A unique identifier for each row",
  },
  {
    question: "In SQL, what does the SELECT statement do?",
    options: [
      "Retrieve data from a database",
      "Insert new data into a database",
      "Update existing data in a database",
    ],
    correctAnswer: "Retrieve data from a database",
  },
  {
    question: "What is React Native?",
    options: [
      "A JavaScript library for building user interfaces",
      "A native app development framework",
      "A database management system",
    ],
    correctAnswer: "A JavaScript library for building user interfaces",
  },
  {
    question: "What is Redux?",
    options: [
      "A state management library for JavaScript apps",
      "A server-side scripting language",
      "A cloud computing platform",
    ],
    correctAnswer: "A state management library for JavaScript apps",
  },
  {
    question: "What does API stand for?",
    options: [
      "Application Programming Interface",
      "Advanced Program Integration",
      "Automated Programming Interface",
    ],
    correctAnswer: "Application Programming Interface",
  },
  {
    question: "Which of these is NOT a HTTP method?",
    options: ["GET", "POST", "PUSH"],
    correctAnswer: "PUSH",
  },
  {
    question: "What is a promise in JavaScript?",
    options: [
      "An object representing the eventual completion or failure of an asynchronous operation",
      "A function that returns another function",
      "A method for iterating over arrays",
    ],
    correctAnswer:
      "An object representing the eventual completion or failure of an asynchronous operation",
  },
  {
    question: "What does MVC stand for in web development?",
    options: [
      "Model-View-Controller",
      "Model-View-Component",
      "Multi-View-Component",
    ],
    correctAnswer: "Model-View-Controller",
  },
  {
    question: "What is Git?",
    options: [
      "A version control system",
      "A database management system",
      "A cloud computing platform",
    ],
    correctAnswer: "A version control system",
  },
  {
    question: "What is GraphQL?",
    options: [
      "A query language for APIs",
      "A database management system",
      "A JavaScript framework",
    ],
    correctAnswer: "A query language for APIs",
  },
  {
    question: "Which of these is NOT a React Native component?",
    options: ["ScrollView", "Button", "Div"],
    correctAnswer: "Div",
  },
  {
    question: "What is a CDN?",
    options: [
      "Content Delivery Network",
      "Central Database Network",
      "Customer Data Network",
    ],
    correctAnswer: "Content Delivery Network",
  },
  {
    question: "What does SSL stand for?",
    options: ["Secure Sockets Layer", "Single Sign-On", "Server Side Language"],
    correctAnswer: "Secure Sockets Layer",
  },
  {
    question: "What is OAuth used for?",
    options: [
      "Authorization and authentication",
      "Database querying",
      "File storage",
    ],
    correctAnswer: "Authorization and authentication",
  },
  {
    question: "What is a RESTful API?",
    options: [
      "An API that follows principles of REST architecture",
      "An API for real-time data processing",
      "An API for recursive data retrieval",
    ],
    correctAnswer: "An API that follows principles of REST architecture",
  },
  {
    question: "What is CORS?",
    options: [
      "Cross-Origin Resource Sharing",
      "Centralized Object Retrieval System",
      "Cloud Object Retrieval Service",
    ],
    correctAnswer: "Cross-Origin Resource Sharing",
  },
  {
    question: "What is a SQL injection?",
    options: [
      "A code injection technique",
      "A database connection error",
      "A data serialization issue",
    ],
    correctAnswer: "A code injection technique",
  },
  {
    question: "What is the DOM?",
    options: [
      "Document Object Model",
      "Data Object Model",
      "Distributed Object Management",
    ],
    correctAnswer: "Document Object Model",
  },
  {
    question: "What is Babel?",
    options: [
      "A JavaScript compiler",
      "A database management system",
      "A cloud computing platform",
    ],
    correctAnswer: "A JavaScript compiler",
  },
  {
    question: "What is JSX?",
    options: [
      "JavaScript XML",
      "JavaScript XML Style",
      "JavaScript XML Syntax",
    ],
    correctAnswer: "JavaScript XML",
  },
  {
    question: "What is a CDN?",
    options: [
      "Content Delivery Network",
      "Central Database Network",
      "Customer Data Network",
    ],
    correctAnswer: "Content Delivery Network",
  },
  {
    question: "What is a JWT?",
    options: ["JSON Web Token", "JavaScript Web Token", "Java Web Token"],
    correctAnswer: "JSON Web Token",
  },
  {
    question: "What is a nonce in blockchain?",
    options: [
      "A number used once",
      "A blockchain transaction",
      "A cryptographic key",
    ],
    correctAnswer: "A number used once",
  },
  {
    question: "What is asynchronous programming?",
    options: [
      "Non-blocking execution of tasks",
      "Sequential execution of tasks",
      "Synchronous execution of tasks",
    ],
    correctAnswer: "Non-blocking execution of tasks",
  },
  {
    question: "What is event delegation?",
    options: [
      "Handling events on parent elements",
      "Passing events between components",
      "Dispatching multiple events",
    ],
    correctAnswer: "Handling events on parent elements",
  },
  {
    question: "What is memoization?",
    options: [
      "Caching the results of function calls",
      "Storing data in memory",
      "Encrypting data in transit",
    ],
    correctAnswer: "Caching the results of function calls",
  },
  {
    question: "What is XSS?",
    options: [
      "Cross-Site Scripting",
      "XML Serialization Service",
      "Xcode Server Solution",
    ],
    correctAnswer: "Cross-Site Scripting",
  },
  {
    question: "What is a singleton pattern?",
    options: [
      "Ensures a class has only one instance",
      "A design pattern for UI components",
      "A pattern for database connections",
    ],
    correctAnswer: "Ensures a class has only one instance",
  },
  {
    question: "What is the difference between var, let, and const?",
    options: [
      "Different ways to declare variables in JavaScript",
      "Types of data structures",
      "Programming languages",
    ],
    correctAnswer: "Different ways to declare variables in JavaScript",
  },
  {
    question: "What is a callback function?",
    options: [
      "A function passed as an argument to another function",
      "A function used for mathematical calculations",
      "A function that returns a promise",
    ],
    correctAnswer: "A function passed as an argument to another function",
  },
  {
    question: "What is the difference between state and props in React?",
    options: [
      "State is mutable, props are immutable",
      "Props are mutable, state is immutable",
      "They are the same",
    ],
    correctAnswer: "State is mutable, props are immutable",
  },
  {
    question: "What is a pure function?",
    options: [
      "A function that returns the same result given the same arguments",
      "A function that manipulates DOM elements",
      "A function without arguments",
    ],
    correctAnswer:
      "A function that returns the same result given the same arguments",
  },
  {
    question: "What is Hoisting in JavaScript?",
    options: [
      "JavaScript moves variable and function declarations to the top of their containing scope",
      "Handling errors in JavaScript",
      "A JavaScript framework",
    ],
    correctAnswer:
      "JavaScript moves variable and function declarations to the top of their containing scope",
  },
  {
    question: "What is a closure in JavaScript?",
    options: [
      "A function that has access to its outer function scope even after the outer function has finished executing",
      "A way to handle errors in JavaScript",
      "A JavaScript framework",
    ],
    correctAnswer:
      "A function that has access to its outer function scope even after the outer function has finished executing",
  },
  {
    question: "What is a higher-order function?",
    options: [
      "A function that takes another function as an argument or returns a function",
      "A function that runs on a higher level of memory",
      "A JavaScript framework",
    ],
    correctAnswer:
      "A function that takes another function as an argument or returns a function",
  },
  {
    question: "What is event bubbling?",
    options: [
      "When an event occurs in a DOM element, it moves up the DOM hierarchy",
      "When an event occurs in a DOM element, it moves down the DOM hierarchy",
      "A way to handle errors in JavaScript",
    ],
    correctAnswer:
      "When an event occurs in a DOM element, it moves up the DOM hierarchy",
  },
  {
    question: "What is the difference between == and === in JavaScript?",
    options: [
      "== compares values, === compares values and types",
      "== compares values and types, === compares values",
      "== and === are the same",
    ],
    correctAnswer: "== compares values, === compares values and types",
  },
  {
    question: "What is the spread operator (...)?",
    options: [
      "Allows an iterable to expand in places where zero or more arguments are expected",
      "A way to handle errors in JavaScript",
      "A JavaScript framework",
    ],
    correctAnswer:
      "Allows an iterable to expand in places where zero or more arguments are expected",
  },
  {
    question: "What is the arrow function syntax in JavaScript?",
    options: [
      "A shorthand syntax for writing function expressions",
      "A way to handle errors in JavaScript",
      "A JavaScript framework",
    ],
    correctAnswer: "A shorthand syntax for writing function expressions",
  },
  {
    question: "What is the difference between var and let/const?",
    options: [
      "Var is function-scoped, let/const are block-scoped",
      "Var is block-scoped, let/const are function-scoped",
      "Var and let/const are the same",
    ],
    correctAnswer: "Var is function-scoped, let/const are block-scoped",
  },
  {
    question: "What is the use of the async/await keywords in JavaScript?",
    options: [
      "To write asynchronous code that looks synchronous",
      "To handle errors in JavaScript",
      "A JavaScript framework",
    ],
    correctAnswer: "To write asynchronous code that looks synchronous",
  },
  {
    question: "What is the role of the package.json file in Node.js projects?",
    options: [
      "To define project dependencies and configurations",
      "To handle errors in JavaScript",
      "A JavaScript framework",
    ],
    correctAnswer: "To define project dependencies and configurations",
  },
];

const finalDeletionQuery = "DROP WORLDbase"; // Example final deletion query
const userDeletionQuery = "DELETE 'Glitch king' FROM bug"; // Hypothetical user deletion query

export default function FinalBossBattle() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [deletionQuery, setDeletionQuery] = useState("");
  const [userQuery, setUserQuery] = useState("");
  const [isCorrect, setIsCorrect] = useState(null); // If its correct or incorrect
  const [selectedAnswer, setSelectedAnswer] = useState(null); // Tracks the user answer to condition it on the selection
  const [score, setScore] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false); // Track if game is completed

  const handleAnswerSelection = (key, selectedOption) => {
    if (gameCompleted) return; // Exit if game is already completed

    const correctAnswer = questions[currentQuestionIndex].correctAnswer;

    // Check if deletion query is completed
    if (deletionQuery === finalDeletionQuery) {
      setGameCompleted(true); // Mark game as completed
      Alert.alert("You failed!", "Glitch king deleted the worldbase.");
      return;
    } else if (userQuery === userDeletionQuery) {
      setGameCompleted(true); // Mark game as completed

      Alert.alert(
        "Congratulations!",
        "You defeated the glitch king and protected the worldbase"
      );
      return;
    }

    const nextLetterBoss = finalDeletionQuery[deletionQuery.length]; // Get the next letter from the final deletion query
    const nextLetterUser = userDeletionQuery[userQuery.length]; // Get the next letter from the user deletion query

    setSelectedAnswer(key);
    if (selectedOption === correctAnswer) {
      setUserQuery(userQuery + nextLetterUser);
      setIsCorrect(true);
      setScore(score + 1);
    } else {
      setIsCorrect(false);
      setDeletionQuery(deletionQuery + nextLetterBoss);
      // Handle incorrect answer (could penalize, skip question, etc.)
    }

    setTimeout(() => {
      setIsCorrect(null);
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
      } else {
        // Handle no more questions case (optional)
        Alert.alert("Game Over", "No more questions left.");
        setSelectedAnswer(null);
      }
    }, 1500);
  };

  return (
    <ImageBackground
      source={require("../../public/Scene5.gif")}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View className="flex flex-col justify-center items-center py-10 px-5">
        {/* Boss Health */}
        <View>
          <Text className="text-center text-2xl font-bold text-red-900 tracking-wider">
            BOSS
          </Text>
          <View className="bg-white px-4 py-1 rounded-full">
            <Text className="font-bold tracking-widest">{deletionQuery}</Text>
          </View>
        </View>
      </View>
      <View style={styles.container}>
        <View className="flex flex-col justify-center items-center p-5">
          {/* Your Health */}
          <View>
            <Text className="text-center text-xl font-bold text-blue-600 tracking-widest">
              YOU
            </Text>
            <View className="bg-white px-4 py-1 rounded-full">
              <Text className="font-bold tracking-widest text-cyan-600">
                {userQuery}
              </Text>
            </View>
          </View>
        </View>

        {!gameCompleted ? (
          <View>
            <Question
              isCorrect={isCorrect}
              currentQuestion={questions[currentQuestionIndex].question}
            />
            <View className="bg-white flex flex-col flex-wrap gap-y-2 py-6 px-3">
              {questions[currentQuestionIndex].options.map((option, index) => (
                <View key={index} className="p-1 w-full">
                  <Pressable
                    className={`bg-white border border-gray-500 flex flex-row items-center py-2 px-3 rounded-full active:bg-blue-50 w-full ${
                      selectedAnswer === index && isCorrect === true
                        ? "bg-green-400 border-green-400"
                        : isCorrect === false && selectedAnswer === index
                        ? "bg-red-400 border-red-400"
                        : ""
                    }`}
                    onPress={() => handleAnswerSelection(index, option)}
                    disabled={selectedAnswer !== null}
                  >
                    <Text className="text-center text-black text-base">
                      {option}
                    </Text>
                  </Pressable>
                </View>
              ))}
            </View>
          </View>
        ) : (
          <View>
            <Pressable
              onPress={() => router.replace("/end")}
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
