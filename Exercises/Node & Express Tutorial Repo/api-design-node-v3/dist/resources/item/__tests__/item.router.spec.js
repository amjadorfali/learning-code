"use strict";

var _item = _interopRequireDefault(require("../item.router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('item router', () => {
  test('has crud routes', () => {
    const routes = [{
      path: '/',
      method: 'get'
    }, {
      path: '/:id',
      method: 'get'
    }, {
      path: '/:id',
      method: 'delete'
    }, {
      path: '/:id',
      method: 'put'
    }, {
      path: '/',
      method: 'post'
    }];
    routes.forEach(route => {
      const match = _item.default.stack.find(s => s.route.path === route.path && s.route.methods[route.method]);

      expect(match).toBeTruthy();
    });
  });
});