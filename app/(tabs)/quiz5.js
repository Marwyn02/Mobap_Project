import React, { useState, useEffect, useRef } from "react";
import {
  ImageBackground,
  View,
  Text,
  Pressable,
  StyleSheet,
  Alert,
  Modal,
  Animated,
  Easing,
} from "react-native";
import Question from "../components/Question";
import { router } from "expo-router";
import ResultButton from "../components/ResultButton";

const finalDeletionQuery = "DROP WORLDbase";
const userDeletionQuery = "DELETE 'Glitch King' FROM WORLDbase";
// const finalDeletionQuery = "DR";
// const userDeletionQuery = "DE";

// Get RANDOM questions from the data questions
const getRandomItem = (array, num) => {
  const shuffledArray = array.sort(() => 0.5 - Math.random());
  return shuffledArray.slice(0, num);
};

// Shuffle the question choices
const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

export default function FinalBossBattle() {
  const [questions, setQuestions] = useState([]);
  const [shuffledChoices, setShuffledChoices] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [deletionQuery, setDeletionQuery] = useState("");
  const [userQuery, setUserQuery] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const [timeLeft, setTimeLeft] = useState(15);
  const [showGif, setShowGif] = useState(null);
  const [redScreenOpacity, setRedScreenOpacity] = useState(0); // Opacity of the red screen
  const fadeAnim = useRef(new Animated.Value(0)).current; // For red screen animation

  // Pick 49 questions in random when component mounts
  useEffect(() => {
    setQuestions(getRandomItem(data, 49));
  }, []);

  // Shuffle the 3 choices in every questions
  useEffect(() => {
    if (questions.length > 0) {
      setShuffledChoices(shuffle([...questions[currentQuestionIndex].options]));
    }
  }, [questions, currentQuestionIndex]);

  // 15 seconds timer per questions
  useEffect(() => {
    if (!showModal && timeLeft > 0 && !selectedAnswer) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleTimeout();
    }
  }, [timeLeft, selectedAnswer, showModal]);

  // Increasing redness of the screen everytime the player gets wrong answer
  useEffect(() => {
    if (redScreenOpacity > 0) {
      Animated.timing(fadeAnim, {
        toValue: redScreenOpacity,
        duration: 500,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    }
  }, [redScreenOpacity]);

  // Increasing redness opacity for the screen function
  const handleTimeout = () => {
    if (!selectedAnswer) {
      setRedScreenOpacity((prev) => Math.min(prev + 0.1, 1));
      handleAnswerSelection(null, null, true);
    }
  };

  // Submits the player answer
  const handleAnswerSelection = (key, selectedOption, timeout = false) => {
    if (gameCompleted) return;

    const currentQuestion = questions[currentQuestionIndex];
    const correctAnswer = currentQuestion.correctAnswer;
    setTimeLeft(null);

    const nextLetterBoss = finalDeletionQuery[deletionQuery.length];
    const nextLetterUser = userDeletionQuery[userQuery.length];

    setSelectedAnswer(key);

    if (timeout || selectedOption !== null) {
      if (selectedOption === correctAnswer) {
        setIsCorrect(true);
        setUserQuery(userQuery + nextLetterUser);
        setScore(score + 1); // No score i guess
      } else {
        // If the user's answer is WRONG
        setRedScreenOpacity((prev) => Math.min(prev + 0.1, 1)); // Increase opacity everytime the player loses
        setIsCorrect(false);
        setDeletionQuery(deletionQuery + nextLetterBoss); // Add query to the boss
      }
    } else {
      setIsCorrect(false);
    }

    setTimeout(() => {
      setIsCorrect(null);
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1); // Proceed to next question
        setSelectedAnswer(null);
        setTimeLeft(15);
      } else {
        Alert.alert("Game Over", "No more questions left.");
        setSelectedAnswer(null);
      }
    }, 1500);
  };

  // Proceed to the result page to see the score
  const onShowResult = () => {
    setTimeout(() => {
      router.replace("/end");
    }, 1000);
  };

  // Play the lossing gif animation if the player losses
  const playLossingSequence = () => {
    setShowGif("Scene5");
    setTimeout(() => {
      router.replace("/lost");
    }, 5000); // 9 seconds for Scene5.gif
  };

  // Play the winning gif animation if the player wins
  const playWinningSequence = () => {
    setShowGif("Scene5");
    setTimeout(() => {
      router.replace("/end");
    }, 9000); // 9 seconds for Scene5.gif
  };

  // Validate the query of the boss and player
  useEffect(() => {
    if (gameCompleted) return; // Exit early if the game is already completed

    setTimeout(() => {
      if (deletionQuery === finalDeletionQuery) {
        // If the boss query is complete
        setGameCompleted(true);
        playLossingSequence();
      } else if (userQuery === userDeletionQuery) {
        // If the player query is complete
        setGameCompleted(true);
        playWinningSequence();
      }
    }, 1500);
  }, [
    deletionQuery,
    finalDeletionQuery,
    userQuery,
    userDeletionQuery,
    gameCompleted,
  ]);

  const currentQuestion = questions[currentQuestionIndex];
  return (
    <ImageBackground
      source={require("../../public/boss.jpg")}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <Modal
        visible={showModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text className="text-lg mb-3 font-semibold">
              Are you ready to face the Glitch King?
            </Text>
            <Pressable
              className="px-8 py-4 rounded-md bg-orange-400 active:bg-orange-500"
              onPress={() => setShowModal(false)}
            >
              <Text className="text-white font-semibold">Start Battle</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {redScreenOpacity > 0 && (
        <Animated.View style={[styles.redScreen, { opacity: fadeAnim }]}>
          <View style={styles.redScreenOverlay} />
        </Animated.View>
      )}

      {showGif ? (
        <View style={styles.gifContainer}>
          {showGif === "Scene5" && (
            <ImageBackground
              source={require("../../public/Scene5.gif")}
              style={styles.gifBackground}
              resizeMode="cover"
            />
          )}
        </View>
      ) : (
        !showModal && (
          <View style={styles.container}>
            <View className="flex flex-col justify-center items-center gap-y-2 py-10 px-5">
              {/* Boss Health */}
              <Text className="text-center text-lg font-bold text-red-900 bg-red-200 rounded-full tracking-wide px-3 py-0.5">
                Glitch King
              </Text>

              <Text className="text-sm text-red-600 font-bold tracking-widest bg-white px-3 py-0.5 rounded-full">
                {deletionQuery}
              </Text>
            </View>

            <View style={styles.container}>
              {/* Player health bar */}
              <View className="flex flex-col justify-center items-center space-y-2 p-3">
                <View className="flex flex-row bg-white rounded-full px-2 py-0.5">
                  <Text className="text-sm font-bold text-blue-600 mr-2">
                    Your Query:
                  </Text>
                  <Text className="text-black font-bold">{userQuery}</Text>
                </View>

                <Text className="text-black text-center font-bold bg-white rounded-full px-3 py-0.5">
                  {timeLeft !== null
                    ? timeLeft > 1
                      ? `${timeLeft} seconds left`
                      : timeLeft < 2
                      ? `${timeLeft} second left`
                      : ""
                    : "Loading..."}
                </Text>
              </View>

              {!gameCompleted ? (
                <View>
                  <Question
                    isCorrect={isCorrect}
                    currentQuestion={currentQuestion.question}
                  />

                  <View className="bg-white flex flex-col flex-wrap gap-y-2 py-6 px-3">
                    {shuffledChoices.map((option, index) => (
                      <Pressable
                        key={index}
                        className={`
                            h-auto bg-white border border-gray-500 flex flex-row items-center py-1 rounded-full active:bg-blue-50 w-[380px] ${
                              selectedAnswer === index && isCorrect === true
                                ? "bg-green-400 border-green-400"
                                : isCorrect === false &&
                                  selectedAnswer === index
                                ? "bg-red-400 border-red-400"
                                : ""
                            }`}
                        onPress={() => handleAnswerSelection(index, option)}
                        disabled={selectedAnswer !== null}
                      >
                        <Text className="uppercase text-center text-green-600 font-medium text-base bg-green-200 px-3.5 py-1.5 rounded-full ml-2 mr-3">
                          {String.fromCharCode(65 + index)}
                        </Text>
                        {option.length > 25 ? (
                          <Text className="text-start text-black text-xs flex flex-wrap w-[300px] mr-5">
                            {option}
                          </Text>
                        ) : (
                          <Text className="text-start text-black text-base">
                            {option}
                          </Text>
                        )}
                      </Pressable>
                    ))}
                  </View>
                </View>
              ) : (
                <ResultButton doPress={onShowResult} />
              )}
            </View>
          </View>
        )
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 0,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  timerText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    marginTop: 10,
  },
  gifContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  gifBackground: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  halfScreenGif: {
    width: "100%",
    height: "50%",
  },
  redScreenOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 0, 0, 0.5)", // Red overlay
  },
  redScreen: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
});

const data = [
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
