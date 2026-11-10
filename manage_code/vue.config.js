// var webpack = require('webpack');
const path = require('path')

function resolve(dir) {
	return path.join(__dirname, dir)
}

function publicPath() {
	if (process.env.NODE_ENV == 'production') {
		return "././";
	} else {
		return "/";
	}
}
// vue.config.js
module.exports = {
	// publicPath:"././",
	publicPath: publicPath(),
	configureWebpack: config => {
        config.optimization = {
			...(config.optimization || {}),
			minimize: false,
		}
        config.resolve = {
            ...config.resolve,
            fallback: {
                path: require.resolve("path-browserify")
            }
        };
    },
	lintOnSave: false,
	devServer: {
		client:{
            overlay: {
                errors:true,
                runtimeErrors:false,
                warnings:false
            },
        },
		open:true,
		host: "localhost", //指定使用一个 host。默认是 localhost，这里默认值即可
		port: 8081, //指定端口
		hot: true, // 开启热更新
		https: false, // 是否开启https模式
		proxy: { // 请求代理服务器
			[process.env.VUE_APP_BASE_API]: { //带上api前缀的
				target: process.env.VUE_APP_BASE_API_URL, //代理目标地址
				changeOrigin: true,
				secure: false,
				pathRewrite: { // 在发出请求后将/api替换为''空值，这样不影响接口请求
					['^' + process.env.VUE_APP_BASE_API]: process.env.VUE_APP_BASR_API_PREFIX
				}
			}
		}
	},
	chainWebpack(config) {
		config.module
			.rule('svg')
			.exclude.add(resolve('src/icons'))
			.end()
		config.module
			.rule('icons')
			.test(/\.svg$/)
			.include.add(resolve('src/icons'))
			.end()
			.use('svg-sprite-loader')
			.loader('svg-sprite-loader')
			.options({
				symbolId: 'icon-[name]'
			})
			.end()
		config.plugin('define').tap((definitions) => {
			Object.assign(definitions[0], {
				__VUE_OPTIONS_API__: 'true',
				__VUE_PROD_DEVTOOLS__: 'false',
				__VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false'
			})
			return definitions
		})
	}
}
