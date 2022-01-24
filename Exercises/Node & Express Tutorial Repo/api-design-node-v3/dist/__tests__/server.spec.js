"use strict";

var _supertest = _interopRequireDefault(require("supertest"));

var _server = require("../server");

var _user = require("../resources/user/user.model");

var _auth = require("../utils/auth");

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('API Authentication:', () => {
  let token;
  beforeEach(async () => {
    const user = await _user.User.create({
      email: 'a@a.com',
      password: 'hello'
    });
    token = (0, _auth.newToken)(user);
  });
  describe('api auth', () => {
    test('api should be locked down', async () => {
      let response = await (0, _supertest.default)(_server.app).get('/api/item');
      expect(response.statusCode).toBe(401);
      response = await (0, _supertest.default)(_server.app).get('/api/list');
      expect(response.statusCode).toBe(401);
      response = await (0, _supertest.default)(_server.app).get('/api/user');
      expect(response.statusCode).toBe(401);
    });
    test('passes with JWT', async () => {
      const jwt = `Bearer ${token}`;

      const id = _mongoose.default.Types.ObjectId();

      const results = await Promise.all([(0, _supertest.default)(_server.app).get('/api/item').set('Authorization', jwt), (0, _supertest.default)(_server.app).get(`/api/item/${id}`).set('Authorization', jwt), (0, _supertest.default)(_server.app).post('/api/item').set('Authorization', jwt), (0, _supertest.default)(_server.app).put(`/api/item/${id}`).set('Authorization', jwt), (0, _supertest.default)(_server.app).delete(`/api/item/${id}`).set('Authorization', jwt)]);
      results.forEach(res => expect(res.statusCode).not.toBe(401));
    });
  });
});