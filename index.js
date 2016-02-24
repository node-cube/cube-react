/*!
 * cube-jsx: index.js
 */
'use strict';
const babelCore = require('babel-core');
const pluginReactJsx = require('babel-plugin-transform-react-jsx');

const ReactProcessor = function (cube) {
  this.cube = cube;
};

ReactProcessor.type = 'script';
ReactProcessor.ext = '.jsx';

ReactProcessor.prototype.process = function (data, callback) {
  let code = data.code;
  let file = data.realPath;
  let res;
  try {
    res = babelCore.transform(code, {
      ast: true,
      code: true,
      plugins: [
        pluginReactJsx
      ]
    });
    data.code = res.code;
  } catch (e) {
    e.file = file;
    if (e.loc) {
      e.line = e.loc.line;
      e.column = e.loc.column;
    }
    e.message = e.message + '\n' + e.codeFrame;
    return callback(e);
  }
  callback(null, data);
};

module.exports = ReactProcessor;
