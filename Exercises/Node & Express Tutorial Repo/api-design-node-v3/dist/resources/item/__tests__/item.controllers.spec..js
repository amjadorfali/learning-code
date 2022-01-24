"use strict";

var _item = _interopRequireDefault(require("../item.controllers"));

var _lodash = require("lodash");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('item controllers', () => {
  test('has crud controllers', () => {
    const crudMethods = ['getOne', 'getMany', 'createOne', 'removeOne', 'updateOne'];
    crudMethods.forEach(name => expect((0, _lodash.isFunction)(_item.default[name])).toBe(true));
  });
});