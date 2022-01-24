"use strict";

var _auth = require("../auth");

var _mongoose = _interopRequireDefault(require("mongoose"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../../config"));

var _user = require("../../resources/user/user.model");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Authentication:', () => {
  describe('newToken', () => {
    test('creates new jwt from user', () => {
      const id = 123;
      const token = (0, _auth.newToken)({
        id
      });

      const user = _jsonwebtoken.default.verify(token, _config.default.secrets.jwt);

      expect(user.id).toBe(id);
    });
  });
  describe('verifyToken', () => {
    test('validates jwt and returns payload', async () => {
      const id = 1234;

      const token = _jsonwebtoken.default.sign({
        id
      }, _config.default.secrets.jwt);

      const user = await (0, _auth.verifyToken)(token);
      expect(user.id).toBe(id);
    });
  });
  describe('signup', () => {
    test('requires email and password', async () => {
      expect.assertions(2);
      const req = {
        body: {}
      };
      const res = {
        status(status) {
          expect(status).toBe(400);
          return this;
        },

        send(result) {
          expect(typeof result.message).toBe('string');
        }

      };
      await (0, _auth.signup)(req, res);
    });
    test('creates user and and sends new token from user', async () => {
      expect.assertions(2);
      const req = {
        body: {
          email: 'hello@hello.com',
          password: '293jssh'
        }
      };
      const res = {
        status(status) {
          expect(status).toBe(201);
          return this;
        },

        async send(result) {
          let user = await (0, _auth.verifyToken)(result.token);
          user = await _user.User.findById(user.id).lean().exec();
          expect(user.email).toBe('hello@hello.com');
        }

      };
      await (0, _auth.signup)(req, res);
    });
  });
  describe('signin', () => {
    test('requires email and password', async () => {
      expect.assertions(2);
      const req = {
        body: {}
      };
      const res = {
        status(status) {
          expect(status).toBe(400);
          return this;
        },

        send(result) {
          expect(typeof result.message).toBe('string');
        }

      };
      await (0, _auth.signin)(req, res);
    });
    test('user must be real', async () => {
      expect.assertions(2);
      const req = {
        body: {
          email: 'hello@hello.com',
          password: '293jssh'
        }
      };
      const res = {
        status(status) {
          expect(status).toBe(401);
          return this;
        },

        send(result) {
          expect(typeof result.message).toBe('string');
        }

      };
      await (0, _auth.signin)(req, res);
    });
    test('passwords must match', async () => {
      expect.assertions(2);
      await _user.User.create({
        email: 'hello@me.com',
        password: 'yoyoyo'
      });
      const req = {
        body: {
          email: 'hello@me.com',
          password: 'wrong'
        }
      };
      const res = {
        status(status) {
          expect(status).toBe(401);
          return this;
        },

        send(result) {
          expect(typeof result.message).toBe('string');
        }

      };
      await (0, _auth.signin)(req, res);
    });
    test('creates new token', async () => {
      expect.assertions(2);
      const fields = {
        email: 'hello@me.com',
        password: 'yoyoyo'
      };
      const savedUser = await _user.User.create(fields);
      const req = {
        body: fields
      };
      const res = {
        status(status) {
          expect(status).toBe(201);
          return this;
        },

        async send(result) {
          let user = await (0, _auth.verifyToken)(result.token);
          user = await _user.User.findById(user.id).lean().exec();
          expect(user._id.toString()).toBe(savedUser._id.toString());
        }

      };
      await (0, _auth.signin)(req, res);
    });
  });
  describe('protect', () => {
    test('looks for Bearer token in headers', async () => {
      expect.assertions(2);
      const req = {
        headers: {}
      };
      const res = {
        status(status) {
          expect(status).toBe(401);
          return this;
        },

        end() {
          expect(true).toBe(true);
        }

      };
      await (0, _auth.protect)(req, res);
    });
    test('token must have correct prefix', async () => {
      expect.assertions(2);
      let req = {
        headers: {
          authorization: (0, _auth.newToken)({
            id: '123sfkj'
          })
        }
      };
      let res = {
        status(status) {
          expect(status).toBe(401);
          return this;
        },

        end() {
          expect(true).toBe(true);
        }

      };
      await (0, _auth.protect)(req, res);
    });
    test('must be a real user', async () => {
      const token = `Bearer ${(0, _auth.newToken)({
        id: _mongoose.default.Types.ObjectId()
      })}`;
      const req = {
        headers: {
          authorization: token
        }
      };
      const res = {
        status(status) {
          expect(status).toBe(401);
          return this;
        },

        end() {
          expect(true).toBe(true);
        }

      };
      await (0, _auth.protect)(req, res);
    });
    test('finds user form token and passes on', async () => {
      const user = await _user.User.create({
        email: 'hello@hello.com',
        password: '1234'
      });
      const token = `Bearer ${(0, _auth.newToken)(user)}`;
      const req = {
        headers: {
          authorization: token
        }
      };

      const next = () => {};

      await (0, _auth.protect)(req, {}, next);
      expect(req.user._id.toString()).toBe(user._id.toString());
      expect(req.user).not.toHaveProperty('password');
    });
  });
});