const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: 'development',
    entry: "./app/js/index.js",
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, "dist"),
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: "./app/index.html", to: "index.html"
                },
                {
                    from: "./app/search.html", to: "search.html"
                },
                {
                    from: "./app/img/pteth.png", to: "pteth.png"
                },
                {
                    from: "./app/styles/index.css", to: "styles/index.css"
                },
                {
                    from: "./app/styles/background.png", to: "styles/background.png"
                },
                {
                    from: "./app/styles/search.css", to: "styles/search.css"
                },
                {
                    from: "./app/styles/Logo.svg", to: "styles/Logo.svg"
                },
            ]
        }),
    ],
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true
    },
    resolve: {
        fallback: { 
            "os": false,
            "https": false,
            "http": false,
            "crypto": false,
            "stream": false,

        },
    }
};
