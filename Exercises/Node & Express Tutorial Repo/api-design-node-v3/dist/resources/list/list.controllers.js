"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _crud = require("../../utils/crud");

var _list = require("./list.model");

var _default = (0, _crud.crudControllers)(_list.List);

exports.default = _default;