"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Item = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const itemSchema = new _mongoose.default.Schema({
  item: {
    title: String,
    time: String,
    isTrue: Boolean
  }
}, {
  timestamps: true
});

const Item = _mongoose.default.model('item', itemSchema);

exports.Item = Item;