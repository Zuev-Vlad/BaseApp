const plugins = [];
if (process.env.NODE_ENV === 'development') {
  plugins.push('react-refresh/babel');
}

module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins,
};

// module.exports = {
//   env: {
//     plugins: [
//       "@babel/plugin-transform-runtime"
//     ],
//     test: {
//       presets: [
//         [
//           "@babel/preset-env",
//           {
//             modules: "commonjs",
//             debug: false,
//           },
//         ],
//         "@babel/preset-flow",
//         "@babel/preset-react",
//       ],
//       plugins: [
//         "@babel/plugin-syntax-dynamic-import",
//         "@babel/plugin-proposal-class-properties",
//       ],
//     },
//     production: {
//       presets: [
//         ["@babel/preset-env", { modules: false }],
//         "@babel/preset-flow",
//         "@babel/preset-react",
//       ],
//       plugins: [
//         "@babel/plugin-syntax-dynamic-import",
//         "@babel/plugin-proposal-class-properties",
//       ],
//     },
//     development: {
//       presets: [
//         ["@babel/preset-env", { modules: false }],
//         "@babel/preset-flow",
//         "@babel/preset-react",
//       ],
//       plugins: [
//         "@babel/plugin-syntax-dynamic-import",
//         "@babel/plugin-proposal-class-properties",
//       ],
//     },
//   },
// };
