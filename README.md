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

- Once CSS loaders are in place you can extract (put them in their own file) CSS files with [MiniCssExtractPlugin](https://webpack.js.org/plugins/mini-css-extract-plugin/)

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

- The job of the css loader is to load CSS files and the job of the styl eloader is to generate and inject a style element that contains all the styles of the application
- With this configuraton, CSS definitions are included in the main.js files of the application which means you don't need to import them in the main indexx.html file

### Transpilers

The process of transforming code from one form of JS to another is called transpiling. Many browsers do not support the latest fetaures that were introduced is ES6 and ES7 and for this reason the code is usually transpiled to an older version of Javascript that implements the ES5 standard.

### Working with Javascript

Webpack knows nothing about transforming Javascript code. It's too lazy so it outsources the work to poor babel-loader, with babel.
Babel is a Javascript compiler and "transpiler".

- The transpilation process that is executed by Babel is defined with plugins, in practice, most developer use ready made presets that are groups of pre-configured plugins.
- Example of one is [@babel/preset-react](https://babeljs.io/docs/en/babel-preset-react/)

#### Working with JS modules in webpack

- Webpack makes it fun to work with ES modules, look at `src/commons/userApi.js`

## Production mode

- Webpack has two modes of operation: development and production
- In dev mode, webpack takes all the JS code and loads it in the browser
- In production mode, it applies many optimizations
  - minfication
  - scope hoisting
  - sets process.env.NODE_ENV to "production"

If you want to configure it in production mode, add a build script

```javascript
  "scripts": {
    "dev": "webpack --mode development",
    "start": "webpack-dev-server --mode development --open",
    "build": "webpack --mode production"
  },
```

- When you `npm run build` webpack will produce a minified bundle.

## Code splitting

Code splitting refers to an optimization technique aiming at:

- avoiding big bundles
- avoiding dependencies duplication

* The webpack community considers 200kb the max size for initial bundle

3 ways to do it

- multiple entry points : works well with smaller projects but not scalable
- optimization.splitChunks
- dynamic imports

### Code splitting with dynamic imports

- Dynamic imports load code conditionally for example, you can load some JS modules conditionally in response to user interaction like a click or a mouse move, or you can load certain code in reponse to route changes
- code is in my `index.html` and `index.js`
