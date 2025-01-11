const { getDefaultConfig } = require("expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);

const config = {
  ...defaultConfig,
  transformer: {
    ...defaultConfig.transformer,
    babelTransformerPath: require.resolve("react-native-css-transformer"),
  },
  resolver: {
    blacklistRE: /node_modules\/some-package\/.*/,
    sourceExts: [...defaultConfig.resolver.sourceExts, "jsx", "cjs"], // Add extensions without overwriting
  },
};

module.exports = config;
