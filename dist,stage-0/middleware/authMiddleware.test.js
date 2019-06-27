'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var chai = require('chai');
var expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);
var rewire = require('rewire');

var auth = rewire('./authMiddleware');
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');

var sandbox = sinon.sandbox.create();

describe('Auth Middleware', function () {
    var secret = void 0,
        req = void 0;

    beforeEach(function () {
        fakeNext = function fakeNext() {
            return sandbox.stub().resolves();
        };

        req = {
            user: {
                username: 'foo',
                id: 'id'
            }
        };

        secret = 'Fake_Secret';
    });

    afterEach(function () {
        sandbox.restore();
    });

    context('response function', function () {
        beforeEach(function () {
            jsonStub = sandbox.stub().returns(req);
            statusStub = sandbox.stub().returns({
                json: req
            });

            res = {
                status: sandbox.stub().returns({
                    json: jsonStub
                })
            };
        });

        afterEach(function () {
            sandbox.restore();
        });

        it('should reject when called with no args', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, undefined);
        }))
        // await expect(auth.respond(req,res)).to.have.been.calledOnce;
        );
    });

    context('Authenticate ', function () {
        beforeEach(function () {
            authenticateStub = sandbox.stub(expressJwt);
        });

        afterEach(function () {
            sandbox.restore();
        });

        it('should call authenticate', function () {
            expect(auth.authenticate).to.be.calledOn;
        });
    });

    context('generateAccessToken', function () {
        beforeEach(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.next = 2;
                            return sandbox.stub(jwt, 'sign').resolves('fake_jwt');

                        case 2:
                            jwtStub = _context2.sent;

                        case 3:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, undefined);
        })));

        afterEach(function () {
            sandbox.restore();
        });

        it('should called jwt', function (done) {
            req.token = jwtStub;
            expect(req.token).to.be.a("function");
            auth.generateAccessToken(req, res, fakeNext);
            expect(jwtStub).to.have.been.calledOnce;
            done();
        });

        it('should return token value', function (done) {
            auth.generateAccessToken(req, res, fakeNext);
            expect(req).to.have.a.property('token');
            done();
        });
    });
});
//# sourceMappingURL=authMiddleware.test.js.map