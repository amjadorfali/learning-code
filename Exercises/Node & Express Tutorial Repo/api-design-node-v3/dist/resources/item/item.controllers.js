"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _item = require("./item.model");

const getOne = model => async (req, res) => {};

const getMany = model => async (req, res) => {};

const createOne = model => async (req, res) => {};

const updateOne = model => async (req, res) => {};

const removeOne = model => async (req, res) => {};

const crudControllers = model => ({
  removeOne: removeOne(model),
  updateOne: updateOne(model),
  getMany: getMany(model),
  getOne: getOne(model),
  createOne: createOne(model)
});

var _default = crudControllers(_item.List);

exports.default = _default;