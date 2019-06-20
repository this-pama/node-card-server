const chai = require('chai');
const expect = chai.expect;

var SubCp = require('./subCpLicence');



describe('SubCp Model', () =>{
    it('should not return error if serial field is missing', (done) =>{
        let sub = new SubCp()

        sub.validate((err) =>{
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
        let sub = new SubCp({
            serial: 'foo',
            email: 'foo@bar.com',
            username: 'foobar'
        })

        expect(sub).to.have.property('serial').to.equal('foo');
        expect(sub).to.have.property('email').to.equal('foo@bar.com');
        expect(sub).to.have.property('username').to.equal('foobar');
        expect(sub).to.have.property('fullName').to.equal(undefined );
        expect(sub).to.have.property('licenceKey').to.equal(undefined );
        expect(sub).to.have.property('phoneSerial').to.equal(undefined );
        done();
    })
})