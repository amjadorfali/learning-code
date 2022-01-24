"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.crudControllers = exports.removeOne = exports.updateOne = exports.createOne = exports.getMany = exports.getOne = void 0;

const getOne = model => async (req, res) => {};

exports.getOne = getOne;

const getMany = model => async (req, res) => {};

exports.getMany = getMany;

const createOne = model => async (req, res) => {};

exports.createOne = createOne;

const updateOne = model => async (req, res) => {};

exports.updateOne = updateOne;

const removeOne = model => async (req, res) => {};

exports.removeOne = removeOne;

const crudControllers = model => ({
  removeOne: removeOne(model),
  updateOne: updateOne(model),
  getMany: getMany(model),
  getOne: getOne(model),
  createOne: createOne(model)
});

exports.crudControllers = crudControllers;