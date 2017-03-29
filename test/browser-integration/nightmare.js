const Nightmare = require('nightmare');
const path = require('path');
const expect = require('chai').expect;  

describe('Nightmare Integration Tests', () => {

  let nightmare;

  beforeEach(() => nightmare = new Nightmare());

  describe('/ (Home Page)', () => {
    it('should load successfully without errors', done => {
      nightmare.goto('http://localhost:8080/')
      .end()
      .then(() => done())
      .catch(done);
    });
  });

});