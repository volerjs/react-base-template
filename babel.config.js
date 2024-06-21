const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
    "presets": [
        [
            "@babel/preset-env",
            {
                "useBuiltIns": "usage",
                "corejs": 3
            }
        ],
        "@babel/preset-react",
        "@babel/preset-typescript",
    ],
    "plugins": [
        isDevelopment && require.resolve('react-refresh/babel')
    ].filter(Boolean)
}