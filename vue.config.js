module.exports = {
    devServer: {
        disableHostCheck: true,
        port: 8080,
        public: '0.0.0.0:8080'
    },
    outputDir: 'docs',
    publicPath: process.env.NODE_ENV === 'production' ? '/suggest_dish' : '/',
    pages: {
        index: {
            entry: 'src/main.js',
            title: 'おすすめごはん'
        }
    }
}