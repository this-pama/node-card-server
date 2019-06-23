const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised);
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const rewire = require('rewire');
const request = require('supertest');

var licence = rewire('./licence');
var Licence = require('../model/licence')
const  mongoose = require('mongoose');
var sandbox = sinon.sandbox.create();

const nodemailer = require('nodemailer');

describe('licence Route', ()=>{
        let dbFindStub; 
        let config; 
        let db

        config = sandbox.stub().returns({port: 3000});
        db = sandbox.stub().callsFake((db)=>{
            return db()
        })

        // licence.__set__('api', licence)
        beforeEach(()=>{
            // licence = licence({ config, db })
        })
    
    afterEach(()=>{
        licence = rewire('./licence')
        sandbox.restore()
    })

    context('GET /', ()=>{
        afterEach(()=>{
            sandbox.restore()
        })
        
        it('should get /', (done)=>{
            before(()=>{
                 dbFindStub = sandbox.stub(mongoose.Model, 'find').resolves({name: 'fake'})
            })

            request(licence).get('/')
                .expect(200)
                .end((err, response)=>{
                    expect(dbFindStub).to.have.been.calledOnce
                    expect(response.body).to.have.property('name').to.equal('');
                    done(err)
                })

            done()

        })

        it('should throw error', (done)=>{
            dbFindStub = sandbox.stub(mongoose.Model, 'find').rejects(new Error('fake_error'))
            request(licence).get('/')
                .expect(400)
                .end((err, response)=>{
                    expect(dbFindStub).to.have.been.calledOnce
                    expect(err.message).to.equal('');
                    done(err)
                })

            done()
        })

    })

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
})