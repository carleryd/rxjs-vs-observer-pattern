module.exports = {
  entry: __dirname + "/src/app.js",
  output: {
    path: __dirname + "/bin",
    publicPath: "/bin/",
    filename: "app.bundle.js"
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel-loader"
    }]
  }
};
