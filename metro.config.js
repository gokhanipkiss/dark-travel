const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);
const { assetExts, sourceExts } = defaultConfig.resolver;

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    assetExts: assetExts.filter((ext) => ext !== 'svg'),
    sourceExts: [...sourceExts, 'svg'],
  },

  /////////////// auto-linking sorunu olduğunu düşünürsen ekle
  // dependencies: {
  //   'react-native-vector-icons': {
  //     platforms: {
  //       android: null, // disable Android platform, other platforms will still autolink if provided
  //     },
  //   },
  // },
  ///////////////////

};

module.exports = mergeConfig(defaultConfig, config);