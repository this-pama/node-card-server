'use strict';

var _licence = require('../model/licence');

var _licence2 = _interopRequireDefault(_licence);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var chai = require('chai');
var expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);
var rewire = require('rewire');
var request = require('supertest');

var licence = rewire('./licence');

var mongoose = require('mongoose');
var sandbox = sinon.createSandbox();

var nodemailer = require('nodemailer');

describe('licence Route', function () {
    var dbFindStub = void 0;

    var config = sandbox.stub().returns({ port: 3000 });
    var db = sandbox.stub().callsFake(function (db) {
        return db(db);
    });
    afterEach(function () {
        var licence = rewire('./licence');
        sandbox.restore();
    });

    context('GET /', function () {

        it('should get /', function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(done) {
                var app;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                dbFindStub = sandbox.stub(mongoose.Model, 'find').resolves('fake');
                                app = licence({ config: config, db: db });


                                request(app).get('/').expect(200).end(function (err, response) {
                                    expect(dbFindStub).to.have.been.calledOnce;
                                    expect(response.body).to.be.an('Object');
                                    done(err);
                                });

                                done();

                            case 4:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, undefined);
            }));

            return function (_x) {
                return _ref.apply(this, arguments);
            };
        }());

        // it('should throw error', (done)=>{
        //     dbFindStub = sandbox.stub(mongoose.Model, 'find').rejects(new Error('fake_error'))
        //     request(licence).get('/')
        //         .expect(400)
        //         .end((err, response)=>{
        //             expect(dbFindStub).to.have.been.calledOnce
        //             expect(err.message).to.equal('');
        //             done(err)
        //         })

        //     done()
        // })
    });

    // context('GET /:serial', ()=>{
    //     beforeEach(()=>{
    //         sandbox.restore()
    //         licence = rewire('./licence')
    //     })

    //     it('should get /:serial', (done)=>{
    //         dbFindStub = sandbox.stub(mongoose.Model, 'find').resolves({name: 'fake_serial'})

    //         request(licence).get('/123')
    //             .expect(200)
    //             .end((err, response)=>{
    //                 expect(dbFindStub).to.have.been.calledOnce
    //                 expect(response.body).to.have.property('name').to.equal('fake_serial');
    //                 done(err)
    //             })

    //         done()
    //     })
    // })
});
//# sourceMappingURL=licence.test.js.map