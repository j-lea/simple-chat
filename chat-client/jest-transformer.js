const config = {
    babelrc: false,
    presets: [
        "@babel/react",
        [
            '@babel/preset-flow',
            {
                useBuiltIns: 'usage',
            },
        ],
    ],
    plugins: [
        "transform-class-properties",
        "transform-es2015-modules-commonjs"
    ]
};
module.exports = require("babel-jest").createTransformer(config);