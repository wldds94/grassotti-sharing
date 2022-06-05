const path = require('path');

module.exports = {
    // context: __dirname,
    entry: path.resolve(__dirname, 'src', 'admin', 'index.js'), // path.join("src", "admin", "index.js"),
    output: {
        path: path.resolve( __dirname, "dist", "js", "admin"),
        filename: 'index.js',
    },
    module: {
        rules: [
          {
            test: /\.?js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react']
              }
            }
          },
          {
            test: /\.s[ac]ss$/i,
            use: [
              // Creates `style` nodes from JS strings
              "style-loader",
              // Translates CSS into CommonJS
              "css-loader",
              // Compiles Sass to CSS
              "sass-loader",
            ],
          },
        ]
    },
}

// module.exports = {
//     module: {
//         rules: [
//           {
//             test: /\.s[ac]ss$/i,
//             use: [
//               // Creates `style` nodes from JS strings
//               "style-loader",
//               // Translates CSS into CommonJS
//               "css-loader",
//               // Compiles Sass to CSS
//               "sass-loader",
//             ],
//           },
//         ],
//     },
// }