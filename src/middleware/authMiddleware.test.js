const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised);
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const rewire = require('rewire');

var auth = rewire('./authMiddleware')
var expressJwt = require('express-jwt')
const jwt = require('jsonwebtoken') ;

var sandbox = sinon.sandbox.create();

describe('Auth Middleware', () =>{
    let secret, req

    beforeEach(()=>{
        fakeNext = () =>{
            return sandbox.stub().resolves()
        }

        req={
                user : {
                    username: 'foo',
                    id: 'id'
                }
            }

        secret = 'Fake_Secret'

    })

    afterEach(() =>{
        sandbox.restore()
    })

    context('response function', ()=>{
        beforeEach(()=>{          
            jsonStub = sandbox.stub().returns(req)
            statusStub = sandbox.stub().returns({
                json: req
            })

            res= {
                status: sandbox.stub().returns({
                    json:  jsonStub
                })
            }


        })

        afterEach(()=>{
            sandbox.restore()
        })

        it('should reject when called with no args', async ()=>{
            // await expect(auth.respond(req,res)).to.have.been.calledOnce;
        })

    })


    context('Authenticate ', ()=>{
        beforeEach(()=>{
            authenticateStub = sandbox.stub(expressJwt)
        })

        afterEach(()=>{
            sandbox.restore()
        })

        it('should call authenticate',()=>{
            expect(auth.authenticate).to.be.calledOn;
        })
    })

    context('generateAccessToken', ()=>{
        beforeEach(async ()=>{
            jwtStub = await sandbox.stub(jwt, 'sign').resolves('fake_jwt')
        })

        afterEach(()=>{
            sandbox.restore()
        })

        it('should called jwt', (done)=>{
            req.token = jwtStub
            expect(req.token).to.be.a("function")
            auth.generateAccessToken(req, res, fakeNext)
            expect(jwtStub).to.have.been.calledOnce;
            done()
        })

        it('should return token value',  (done)=>{
            auth.generateAccessToken(req, res, fakeNext)
            expect(req).to.have.a.property('token')
            done()
        })
    })

})