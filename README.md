# Learning the basics of webpack

### Webpack's loaders

- Loaders are 3rd-party extensions that help webpack deal with various files. For example there are loaders for CSS, for images, or for txt files.

```javascript
module.exports = {
  //starts with the module key, then you configure each loaders group inside rules
  module: {
    rules: [
      {
        // for each file you want to treat as a module, you configure it with a test key and use
        test: /\.filename$/,
        use: ["loader-b", "loader-a"],
      },
    ],
  },
  //
};
```

- Once CSS loaders are in place you can extract CSS files with [MiniCssExtractPlugin](https://webpack.js.org/plugins/mini-css-extract-plugin/).

- Order of the loaders is important

```javascript
//wrong!
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["css-loader", "style-loader"], //style-loader injects style into the page, and does not load the file, it should be second
      },
    ],
  },
  //
};
```

```javascript
//Webpack loaders are loaded from riht to left
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  //
};
```

### Working with Javascript

Webpack knows nothing about transforming Javascript code. It's too lazy so it outsources the work to poor babel-loader, with babel.
Babel is a Javascript compiler and "transpiler".
If takes modern Javascript syntax as input and is able to transform it to compatible code that can run in (almost) any browser.

#### Working with JS modules in webpack

- Webpack makes it fun to work with ES modules, look at `src/commons/userApi.js`
