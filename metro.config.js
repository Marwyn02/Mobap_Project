// const { getDefaultConfig } = require("expo/metro-config");

// const config = getDefaultConfig(__dirname);

// config.transformer = {
//   ...config.transformer,
//   babelTransformerPath: require.resolve("react-native-css-transformer"),
// };

// config.resolver = {
//   ...config.resolver,
//   assetExts: config.resolver.assetExts.filter((ext) => ext !== "css"),
//   sourceExts: [...config.resolver.sourceExts, "css"],
// };

// module.exports = config;

// metro.config.js
// const { getDefaultConfig } = require("expo/metro-config");

// const defaultConfig = getDefaultConfig(__dirname);

// module.exports = {
//   ...defaultConfig,
//   transformer: {
//     ...defaultConfig.transformer,
//     babelTransformerPath: require.resolve("react-native-css-transformer"),
//   },
//   resolver: {
//     sourceExts: ["jsx", "js", "ts", "tsx", "cjs"],
//   },
// };

const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const defaultConfig = getDefaultConfig(__dirname);

const config = withNativeWind({
  ...defaultConfig,
  transformer: {
    ...defaultConfig.transformer,
    babelTransformerPath: require.resolve("react-native-css-transformer"),
  },
  resolver: {
    blacklistRE: /node_modules\/some-package\/.*/,
    sourceExts: [...defaultConfig.resolver.sourceExts, "jsx", "cjs"], // Add extensions without overwriting
  },
});

module.exports = config;
