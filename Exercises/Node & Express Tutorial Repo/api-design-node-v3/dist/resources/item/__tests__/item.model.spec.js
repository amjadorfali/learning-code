"use strict";

var _item = require("../item.model");

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Item model', () => {
  describe('schema', () => {
    test('name', () => {
      const name = _item.Item.schema.obj.name;
      expect(name).toEqual({
        type: String,
        required: true,
        trim: true,
        maxlength: 50
      });
    });
    test('status', () => {
      const status = _item.Item.schema.obj.status;
      expect(status).toEqual({
        type: String,
        required: true,
        enum: ['active', 'complete', 'pastdue'],
        default: 'active'
      });
    });
    test('notes', () => {
      const notes = _item.Item.schema.obj.notes;
      expect(notes).toEqual(String);
    });
    test('due', () => {
      const due = _item.Item.schema.obj.due;
      expect(due).toEqual(Date);
    });
    test('createdBy', () => {
      const createdBy = _item.Item.schema.obj.createdBy;
      expect(createdBy).toEqual({
        type: _mongoose.default.SchemaTypes.ObjectId,
        ref: 'user',
        required: true
      });
    });
    test('list', () => {
      const list = _item.Item.schema.obj.list;
      expect(list).toEqual({
        type: _mongoose.default.SchemaTypes.ObjectId,
        ref: 'list',
        required: true
      });
    });
  });
});