const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {  
    entry: './src/index.ts',    //指定入口文件
    output: {   
        path: path.resolve(__dirname,'dist'), //指定打包后的文件存放的目录
        filename: 'bundle.js',  //打包后的文件名
    },
    module: {   //指定webpack打包时要使用的模块
        rules: [    //指定要加载的规则
            {
                test: /\.ts$/,  //test指定的是规则生效的文件，可以使用正则
                use: 'ts-loader',    //针对上面的文件使用ts-loader
                exclude: /node-modules/,    //要排除的文件
            },
            {
                test: /\.less$/, //设置less文件的处理
                use: [
                    'style-loader', //执行顺序从下往上
                    'css-loader',
                    'less-loader'
                ]

            }
        ]
    },
    //放置插件
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({ //自动生成html文件，并引入先关的资源
            // title:'贪吃蛇',   //添加title配置项，设置生成的html title为KITTATES
            template: './src/index.html',   //生成的html模板是根据这个template生成的
        }),    
    ],
    resolve: {
        extensions: ['.ts','.js'],    //ts、js都可以作为模块使用
    }
}