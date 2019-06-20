const chai = require('chai');
const expect = chai.expect;

var CpLicence = require('./cpLicence');



describe('CpLicence Model', () =>{
    it('should not return error if any field is missing', (done) =>{
        let cp = new CpLicence()

        cp.validate((err) =>{
            expect(err.errors.fullName).to.not.exist;
            expect(err.errors.username).to.not.exist;
            expect(err.errors.serial).to.exist;
            expect(err.errors.imei).to.not.exist;
            expect(err.errors.phoneSerial).to.not.exist;
            expect(err.errors.email).to.not.exist;
            expect(err.errors.count).to.not.exist;
            expect(err.errors.licenceKey).to.not.exist;

            done()

        })
    })

    it('should have optional field', (done)=>{
        let cp = new CpLicence({
            serial: 'foo',
            email: 'foo@bar.com',
            username: 'foobar'
        })

        expect(cp).to.have.property('serial').to.equal('foo');
        expect(cp).to.have.property('email').to.equal('foo@bar.com');
        expect(cp).to.have.property('username').to.equal('foobar');
        expect(cp).to.have.property('fullName').to.equal(undefined );
        expect(cp).to.have.property('licenceKey').to.equal(undefined );
        expect(cp).to.have.property('phoneSerial').to.equal(undefined );
        done();
    })
})