# tech-no.io

## Installation
If you've never used Node or yarn before, you'll need to install them.
If you use homebrew, do:

```
brew install node
brew install yarn
```

Otherwise, you can download and install from [here](http://nodejs.org/download/) and [here](https://yarnpkg.com/en/docs/install).

### Install dependencies
```
yarn install
```

This runs through all dependencies listed in `package.json` and downloads them into the `node_modules` folder in your project directory.

### Running build scripts
```
yarn run dev
```

This will compile your assets and start an express server with [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware) and [webpack-hot-middleware](https://github.com/glenjamin/webpack-hot-middleware).

### Preview production environment
```
yarn run build
yarn start
```

### Testing with AVA
This repo includes a basic js test suite using [AVA](https://github.com/avajs/ava).

To run the tests simply do:
```
yarn test
```

### Code style
The code style in this repo follows the [XO](https://github.com/sindresorhus/xo) style guide. It also contains a small [editor config](http://editorconfig.org/) setup which helps maintain tab rules and spacing across editors.

## License
This repo is licensed under [The MIT License (MIT)](LICENSE).
