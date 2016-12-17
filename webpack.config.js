'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const V8LazyParseWebpackPlugin = require('v8-lazy-parse-webpack-plugin');

const autoprefixer = require('autoprefixer');
const csswring = require('csswring');

const dev = process.env.NODE_ENV === 'development';
const production = process.env.NODE_ENV === 'production';

const config = {
  devtool: dev ? 'cheap-source-map' : undefined,

  entry: {
    // Entry point for the application.
    app: [
      // Entry point for your project. This is the main file that handles all
      // imports for the entire project.
      path.resolve(__dirname, 'client', 'entry.js'),
    ].concat(dev ?
    	[
			  'eventsource-polyfill', // necessary for hot reloading with IE
			  'webpack-hot-middleware/client?reload=true',
    	] :
			[]
    ),
  },

  output: {
    // Output destination.
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
    // Output filename. Hashing in production for cache busting.
    filename: `scripts/${production ? '[chunkhash:8]' : '[name]'}.js`,
    chunkFilename: `scripts/${production ? '[chunkhash:8]' : '[name]'}.js`,
  },

  resolve: {
    modules: [
      // These paths are treated as module roots. Which enables you to import
      // files from here without the ../../../ hell.
      // e.g. import Module from 'Module'; will make webpack look for the module in
      // assets/client/scripts/Module.js, if it doesnt find it, it will look in styles
      // and then finally in node_modules.
      path.resolve(__dirname, 'client', 'scripts'),
      path.resolve(__dirname, 'client', 'styles'),
      path.resolve(__dirname, 'client', 'media'),
      'node_modules',
    ],
    extensions: ['.js', '.jsx', '.json', '.scss'],
    // This section is useful for aliasing modules which aren't directly available for import.
    // e.g. TweenLite: path.resolve(__dirname, 'node_modules', 'gsap', 'src', 'uncompressed', 'TweenLite.js'),
    // will make it possible to do: import TweenLite from 'TweenLite'; within your scripts.
    alias: {
      // dat: 'three/examples/js/libs/dat.gui.min.js',
      // TweenLite: path.resolve(__dirname, 'node_modules', 'gsap', 'src',
      //   'uncompressed', 'TweenLite.js'),
      // TimelineLite: path.resolve(__dirname, 'node_modules', 'gsap', 'src',
      //   'uncompressed', 'TimelineLite.js'),
      // TweenMax: path.resolve(__dirname, 'node_modules', 'gsap', 'src',
      //   'uncompressed', 'TweenMax.js'),
      // TimelineMax: path.resolve(__dirname, 'node_modules', 'gsap', 'src',
      //   'uncompressed', 'TimelineMax.js'),
      // CSSPlugin: path.resolve(__dirname, 'node_modules', 'gsap', 'src',
      //   'uncompressed', 'plugins', 'CSSPlugin.js'),
      // EasePack: path.resolve(__dirname, 'node_modules', 'gsap', 'src',
      //   'uncompressed', 'easing', 'EasePack.js'),
    },
  },

  module: {
    // Loaders are triggered when an imported file matches a pattern
    // and then process that file according to the loader specified.
    rules: [
      {
        // Parse imported .json files as javascript objects.
        test: /\.json$/,
        loader: 'json-loader',
        exclude: /(node_modules)/,
      },
      {
        // Parse JSX with babel.
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
      },
      {
        test: /\.(glsl|frag|vert)$/,
        loader: 'raw-loader!glslify',
      },
      {
        test: /\.(obj)$/,
        loader: 'raw-loader',
      },
      {
        // Copy static files and update file reference if name is hashed.
        test: /\.(svg|woff|woff2|png|jpg|jpeg|gif|m4a|mp4|webm|pdf)$/,
        loader: 'file-loader',
        query: {
          limit: 10000,
          name: `media/${production ? '[hash:8]' : '[name]'}.[ext]`,
        },
        exclude: /social\.png$/,
      },
      {
        // Copy share image files.
        test: /social\.png$/,
        loader: 'file-loader',
        query: {
          limit: 10000,
          name: 'media/[name].[ext]',
        },
      },
      {
        // Process sass and extract it to a separate file in production.
        test: /\.scss$/,
        loader: dev ?
					'style-loader!css-loader?modules&localIdentName=[name]-[local]-[hash:8]&camelCase!postcss-loader!sass-loader' :
					ExtractTextPlugin.extract({
					  notExtractLoader: 'style',
					  loader: 'css-loader?modules&localIdentName=[hash:8]&camelCase!postcss-loader!sass-loader',
					}),
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      chunksSortMode: 'dependency',
      template: path.resolve(__dirname, 'client', 'index.html'),
      favicon: path.resolve(__dirname, 'client', 'favicon.ico'),
      filename: 'index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        minifyJS: true,
        minifyCSS: true,
      },
    }),
    // Add shims/polyfills etc here. These will only be included in the output if
    // they're used within your code, otherwise they will be ignored.
    // Read more about import/export loaders here: https://webpack.github.io/docs/shimming-modules.html
    new webpack.ProvidePlugin({
      // OBJLoader: 'imports-loader?THREE=three/src/Three!exports-loader?THREE.OBJLoader!three/examples/js/loaders/OBJLoader',
      // OrbitControls: 'imports-loader?this=>global.THREE!exports-loader?THREE.OrbitControls!three/examples/js/controls/OrbitControls',
      // TrackballControls: 'imports-loader?THREE=three/src/Three!exports-loader?THREE.TrackballControls!three/examples/js/controls/TrackballControls',
      // FirstPersonControls: 'imports-loader?THREE=three/src/Three!exports-loader?THREE.FirstPersonControls!three/examples/js/controls/FirstPersonControls',
      // DeviceOrientationControls: 'imports-loader?THREE=three/src/Three!exports-loader?THREE.DeviceOrientationControls!three/examples/js/controls/DeviceOrientationControls',
      // VRControls: 'imports-loader?THREE=three/src/Three!exports-loader?THREE.VRControls!three/examples/js/controls/VRControls',
      // VREffect: 'imports-loader?THREE=three/src/Three!exports-loader?THREE.VREffect!three/examples/js/effects/VREffect',
      // StereoEffect: 'imports-loader?THREE=three/src/Three!exports-loader?THREE.StereoEffect!three/examples/js/effects/StereoEffect',
      // CardboardEffect: 'imports-loader?THREE=three/src/Three!exports-loader?THREE.CardboardEffect!three/examples/js/effects/CardboardEffect',
      // EffectComposer: 'imports-loader?THREE=three/src/Three!exports-loader?THREE.EffectComposer!three/examples/js/postprocessing/EffectComposer',
      // FilmPass: 'imports-loader?THREE=three/src/Three!exports-loader?THREE.FilmPass!three/examples/js/postprocessing/FilmPass',
      // RenderPass: 'imports-loader?THREE=three/src/Three!exports-loader?THREE.RenderPass!three/examples/js/postprocessing/RenderPass',
      // ShaderPass: 'imports-loader?THREE=three/src/Three!exports-loader?THREE.ShaderPass!three/examples/js/postprocessing/ShaderPass',
      // SMAAPass: 'imports-loader?THREE=three/src/Three!exports-loader?THREE.SMAAPass!three/examples/js/postprocessing/SMAAPass',
      // TAARenderPass: 'imports-loader?THREE=three/src/Three!exports-loader?THREE.TAARenderPass!three/examples/js/postprocessing/TAARenderPass',
      // TexturePass: 'imports-loader?THREE=three/src/Three!exports-loader?THREE.TexturePass!three/examples/js/postprocessing/TexturePass',
      // 'THREE.CopyShader': 'imports-loader?THREE=three/src/Three!exports-loader?THREE.CopyShader!three/examples/js/shaders/CopyShader',
      // ExplodeModifier: 'imports-loader?THREE=three/src/Three!exports-loader?THREE.ExplodeModifier!three/examples/js/modifiers/ExplodeModifier',
      // TessellateModifier: 'imports-loader?THREE=three/src/Three!exports-loader?THREE.TessellateModifier!three/examples/js/modifiers/TessellateModifier',
      // Detector: 'exports-loader?Detector!three/examples/js/Detector.js',
      // Stats: 'exports-loader?Stats!three/examples/js/libs/stats.min',
    }),
    // In webpack 2.0 loaders cannot add options at the root of the config object.
    // They are passed here to the LoaderOptionsPlugin. This step is also setting minimize/debug.
    new webpack.LoaderOptionsPlugin({
      minimize: !dev,
      debug: dev,
      options: {
        context: __dirname,
        sassLoader: {
          // Options for sass processing.
          outputStyle: 'expanded',
          includePaths: [
            path.resolve(__dirname, 'node_modules'),
            path.resolve(__dirname, 'client', 'styles'),
          ],
        },
        postcss: [
          // Options for postcss. This adds vendor prefixes and compresses sass in production.
          // Possible to add more postcss plugins here if neccessary.
          autoprefixer({ browsers: ['last 2 version'] }),
        ].concat(dev ?
					[] :
					[csswring({ removeAllComments: true })]
        ),
      },
    }),
    // Splits code into vendor and app files. This is useful because code that
    // doesn't change frequently will be cached and returning users will only
    // have to download a smaller file (app.js) to get the updated code.
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: module => /node_modules/.test(module.resource),
    }),
    // In order to keep the module order intact with the vendor/app files, we need
    // to create an index file called manifest that operates as a lookup for your
    // imports.
    new webpack.optimize.CommonsChunkPlugin({ name: 'manifest' }),
  ].concat(dev ? [
    // Define dev specific options. Will make process.env.NODE_ENV equal to 'dev'
    // within your code to include dev specific code. Code within a dev condition
    // will be omitted in production.
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('dev'),
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ] : [
    // Define production specific options.
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new V8LazyParseWebpackPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false,
      },
      compress: {
        warnings: false,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true, // eslint-disable-line camelcase
        drop_console: true, // eslint-disable-line camelcase
        evaluate: true,
        if_return: true, // eslint-disable-line camelcase
        join_vars: true, // eslint-disable-line camelcase
        negate_iife: false, // eslint-disable-line camelcase
      },
    }),
    new ExtractTextPlugin(`styles/${production ? '[contenthash:8]' : '[name]'}.css`),
  ]),
};

module.exports = config;
