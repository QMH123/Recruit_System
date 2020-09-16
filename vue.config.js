const path = require('path');
const webpack = require("webpack");
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '' : '/',
  outputDir: process.env.NODE_ENV === 'production' ? 'dist' : 'devdist',
  lintOnSave: false,
  
  chainWebpack: (config) => {
    
  },
  // configureWebpack: (config) => {
  //   config.resolve = { // 配置解析别名
  //     extensions: ['.js', '.json', '.vue'],  // 自动添加文件名后缀
  //     alias: {
  //       'vue': 'vue/dist/vue.js',
  //       '@': path.resolve(__dirname, './src'),
  //       '@c': path.resolve(__dirname, './src/components')
  //     }
  //   };
  // },
  configureWebpack: {
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            Popper: ['popper.js', 'default']
          })
    ]
  },
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      scss: { 
        prependData: '',
      }
    },
    // requireModuleExtension: false
    // 启用 CSS modules for all css / pre-processor files.
    // modules: false
  },
  // use thread-loader for babel & TS in production build
  // enabled by default if the machine has more than 1 cores
  parallel: require('os').cpus().length > 1,
  /**
   *  PWA 插件相关配置,see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
   */
  pwa: {},
  // webpack-dev-server 相关配置
  devServer: {
    open: false, // 编译完成是否打开网页
    host: '0.0.0.0', // 指定使用地址，默认localhost,0.0.0.0代表可以被外界访问
    port: 8080, // 访问端口
    https: false, // 编译失败时刷新页面
    // hot: true, // 开启热加载
    // hotOnly: false,
    proxy: {
      '/api': {
          target: "http://175.24.63.102:8181/", 
          changeOrigin: false,
          pathRewrite: {
              '^/api': ''
          }
      }
    },
    overlay: { // 全屏模式下是否显示脚本错误
      warnings: true,
      errors: true
    },
    before: app => {
    }
  },
  /**
   * 第三方插件配置
   */
  pluginOptions: {}
}
