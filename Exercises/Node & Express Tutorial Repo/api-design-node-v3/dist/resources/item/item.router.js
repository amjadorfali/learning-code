"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

const controller = (req, res) => {
  res.send({
    message: 'hello'
  });
};

const router = (0, _express.Router)(); // /api/item

router.route('/').get(controller).post(controller);
router.route('/:id').get(controller).put(controller).delete(controller);
var _default = router;
exports.default = _default;