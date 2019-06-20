const chai = require('chai');
const expect = chai.expect;

var Licence = require('./licence');



describe('Licence Model', () =>{
    it('should not return error if serial field is missing', (done) =>{
        let li = new Licence()

        li.validate((err) =>{
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
        let li = new Licence({
            serial: 'foo',
            email: 'foo@bar.com',
            username: 'foobar'
        })

        expect(li).to.have.property('serial').to.equal('foo');
        expect(li).to.have.property('email').to.equal('foo@bar.com');
        expect(li).to.have.property('username').to.equal('foobar');
        expect(li).to.have.property('fullName').to.equal(undefined );
        expect(li).to.have.property('licenceKey').to.equal(undefined );
        expect(li).to.have.property('phoneSerial').to.equal(undefined );
        done();
    })
})