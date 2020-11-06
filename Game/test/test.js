let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../juego');
let should = chai.should();
let expect = require('chai').expect;
chai.use(chaiHttp);


describe('#Obtener un juego', () => {
    it('should return the game', (done) => {
      chai.request(server.server)
          .get('/juego/1')
          .end((err, res) => {
                res.should.have.status(200);
                expect(res.headers['content-type']).to.have.string('text/html');
            done();
          });
    });
    it('should return html content', (done) => {
        chai.request(server.server)
            .get('/juego/1')
            .end((err, res) => {
                  expect(res.headers['content-type']).to.have.string('text/html');
              done();
            });
      });
});


describe('Dados', function() {
    describe('#simular dados', function() {
        it('should return an integer between 1 and 6', function() {
            expect(server.sdado()).to.be.within(1,6,'should be');
        });
        it('should be a number', function() {
            expect(server.sdado()).to.be.a('number');
        });
    });
});

describe('Casillas especiales', function() {
    describe('#Simular casillas especiales', function() {
        it('should return estrella', function() {
            expect(server.scasilla(24)).to.equal('estrella');
        });
        it('should return arbol', function() {
            expect(server.scasilla(4)).to.be.equal('arbol');
        });
        it('should return hoyo', function() {
            expect(server.scasilla(35)).to.equal('hoyo');
        });
    });
});