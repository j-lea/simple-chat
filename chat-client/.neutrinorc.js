// .neutrinorc.js
const react = require('@neutrinojs/react');

module.exports = {
  use: [
      react({
        babel: {
          presets: [
            [
              '@babel/preset-flow',
              {
                useBuiltIns: 'usage',
              },
            ],
          ]
        }
      })
  ],
};