'use strict';

var stream = require('stream'),
    util = require('util');

var untildify = require('untildify');

var Transform = stream.Transform;

var format = void 0;

var Custom = function Custom(options) {
  if (!options) {
    throw new Error('Options are missing.');
  }
  if (!options.js) {
    throw new Error('JavaScript is missing.');
  }

  /* eslint-disable global-require */
  format = require(untildify(options.js));
  /* eslint-enable global-require */

  options.objectMode = true;

  Reflect.apply(Transform, this, [options]);
};

util.inherits(Custom, Transform);

/* eslint-disable no-underscore-dangle */
Custom.prototype._transform = function (chunk, encoding, callback) {
  /* eslint-enable no-underscore-dangle */
  var result = format(chunk);

  this.push(result);
  callback();
};

module.exports = Custom;