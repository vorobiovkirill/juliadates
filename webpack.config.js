const webpack = require('webpack');
const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlElementsWebpackPlugin = require('html-elements-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const SpritesmithPlugin = require('webpack-spritesmith');
const ImageminPlugin = require('imagemin-webpack-plugin').default
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const METADATA = require('./configs/metadata-config');

const config = {

	entry: './src/scripts/index.js',

	output: {
		publicPath: '/',
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/[name].bundle.js',
		sourceMapFilename: 'js/[file].map',
	},

	performance: {
		hints: false,
	},

	stats: {
		children: false,
	},

	resolve: {
		extensions: ['.js', '.sass', '.scss', '.html'],
		modules: [
			'node_modules',
		],
	},

	/**
	 * @link https://webpack.github.io/docs/webpack-dev-server.html
	 */
	devServer: {
		contentBase: path.resolve(__dirname, 'dist'),
		compress: true,
		historyApiFallback: true,
		port: 8080,
		inline: true,
		open: true,
		stats: {
			colors: true,
			hash: false,
			version: false,
			timings: false,
			assets: false,
			chunks: false,
			modules: false,
			reasons: false,
			children: false,
			source: false,
			errors: true,
			errorDetails: true,
			warnings: true,
			publicPath: false,
		}
	},

	module: {

		rules: [
			{
				test: /\.js?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.(sass|scss|css)$/,
				use: ExtractTextPlugin.extract({
					use: ['css-loader', 'sass-loader'],
					fallback: 'style-loader',
				})
			},
			{
				test: /\.html$/,
				use: 'html-loader',
			},
			{
				test: /\.(jpg|jpeg|gif|png|svg)$/,
				exclude: /node_modules/,
				use: 'url-loader?limit=100&name=img/[name].[ext]',
			},
			{
				test: /\.(woff|woff2|eot|ttf|svg)$/,
				exclude: /node_modules/,
				use: 'url-loader?limit=1024&name=fonts/[name].[ext]',
			},
		],

	},

	plugins: [
		/**
		 * @link https://github.com/webpack/extract-text-webpack-plugin
		 */
		new ExtractTextPlugin({
			filename: 'css/style.[hash].css',
		}),

		/**
		 * @link https://github.com/ampedandwired/html-webpack-plugin
		 */
		new HtmlWebpackPlugin({
			title: METADATA.title,
			description: METADATA.description,
			baseUrl: METADATA.baseUrl,
			metadata: METADATA,
			template: './src/index.html.ejs',
			chunksSortMode: 'dependency',
			inject: 'body',
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeRedundantAttributes: true,
				useShortDoctype: true,
				removeEmptyAttributes: true,
				removeStyleLinkTypeAttributes: true,
				keepClosingSlash: true,
				minifyJS: true,
				minifyCSS: true,
				minifyURLs: true,
			},
		}),

		/**
		 * @link https://github.com/numical/script-ext-html-webpack-plugin
		 */
		new ScriptExtHtmlWebpackPlugin({
			defaultAttribute: 'defer',
		}),

		new webpack.HotModuleReplacementPlugin(),

		/**
		 * @link https://github.com/AngularClass/angular2-webpack-starter/tree/master/config/html-elements-plugin
		 */
		new HtmlElementsWebpackPlugin({
			headTags: require('./configs/head-config'),
		}),

		/**
		 * @link https://www.npmjs.com/package/copy-webpack-plugin
		 */
		new CopyWebpackPlugin([
			{ from: 'src/images', to: 'images' },
			{ from: 'src/fonts', to: 'fonts' },
		]),

		/**
		 * @link https://www.npmjs.com/package/webpack-spritesmith
		 */
		new SpritesmithPlugin({
			src: {
				cwd: path.resolve(__dirname, 'src', 'icons/sprites_src'),
				glob: '*.png',
			},
			target: {
				image: path.resolve(__dirname, 'src', 'icons/sprites/sprite.[hash].png'),
				css: path.resolve(__dirname, 'src', 'styles/helpers/_generated-sprites.sass'),
			},
			spritesmithOptions: {
				algorithm: 'top-down',
				padding: 10,
			},
			apiOptions: {
				cssImageRef: '~sprite.[hash].png',
			},
		}),

		/**
		 * @link https://github.com/NMFR/optimize-css-assets-webpack-plugin
		 */
		new OptimizeCssAssetsPlugin(),

		/**
		 * @link https://github.com/Klathmon/imagemin-webpack-plugin
		 */
		new ImageminPlugin({
			test: /\.(jpe?g|png|gif|svg)$/i,
			pngquant: {
				quality: '60-70',
			},
			optipng: {
				optimizationLevel: 3,
			},
			gifsicle: {
				optimizationLevel: 1,
			},
			jpegtran: {
				progressive: true,
			},
		}),

	],

};

module.exports = config;
