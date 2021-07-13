const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: 'development',
  entry: "./src/index.js",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new CopyWebpackPlugin([
      {
         from: "./src/index.html", to: "index.html" 
      },
      {
        from: "./src/search.html", to: "search.html"
      },
      {
          from: "./src/img/pteth.png", to: "pteth.png"
      },
      {
          from: "./src/styles.css", to: "styles.css"
      },
      {
          from: "./src/img/background.png", to: "background.png"
      },
      {
          from: "./src/img/Logo.svg", to: "Logo.svg"
      },
    ]),
  ],
  devServer: { contentBase: path.join(__dirname, "dist"), compress: true },
};
