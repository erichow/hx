const path = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')

const NODE_ENV = process.env.NODE_ENV

module.exports = {
	mode: NODE_ENV,
	devtool: NODE_ENV === 'development' ? 'source-map' : 'none',
	entry: {
		'hx.min': NODE_ENV === 'development' ? './src/test.js' : './src/index.js',
	},
	output: {
		path: path.resolve(__dirname, './dist'), // 所有输出文件的目标路径
		publicPath: '/dist/', // 输出解析文件的目录
		filename: '[name].js',
		library: 'hx', // 指定的就是你使用require时的模块名
		libraryTarget: 'umd', // libraryTarget会生成不同umd的代码,可以只是commonjs标准的，也可以是指amd标准的，也可以只是通过script标签引入的
		umdNamedDefine: true, // 会对 UMD 的构建过程中的 AMD 模块进行命名。否则就使用匿名的 define
		libraryExport: 'default', // 对外暴露default属性，就可以直接调用default里的属性
		globalObject: 'this', // 定义全局变量,兼容node和浏览器运行，避免出现"window is not defined"的情况
	},
	resolve: {
		alias: {
			'@': path.resolve('src'), // 这样配置后 @ 可以指向 src 目录
			'@m': path.resolve('src', 'modules'), // 这样配置后 @ 可以指向 src 目录
		},
	},
}
