const chai = require('chai');
const expect = chai.expect;

var Retailer = require('./retailerLicence');



describe('Retailer Model', () =>{
    it('should not return error if serial field is missing', (done) =>{
        let re = new Retailer()

        re.validate((err) =>{
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
        let re = new Retailer({
            serial: 'foo',
            email: 'foo@bar.com',
            username: 'foobar'
        })

        expect(re).to.have.property('serial').to.equal('foo');
        expect(re).to.have.property('email').to.equal('foo@bar.com');
        expect(re).to.have.property('username').to.equal('foobar');
        expect(re).to.have.property('fullName').to.equal(undefined );
        expect(re).to.have.property('licenceKey').to.equal(undefined );
        expect(re).to.have.property('phoneSerial').to.equal(undefined );
        done();
    })
})