const chai = require("chai");
const chaiHttp = require("chai-http");
const { describe } = require("mocha");
const expect = require("chai").expect;

chai.use(chaiHttp);

const BASE_URL = "http://localhost:3000/user/";
const SAMPPLE_TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzA0YzBkNzVlMjlhNDg1NTJkZjk1MzMiLCJlbWFpbCI6InNvbWV0aGluZ0BnbWFpbC5jb20iLCJpYXQiOjE2NjEyNTk1OTEsImV4cCI6MTY2MTI2MTM5MX0.7RNm-uPo21CBgSLxSrzwfd2cxPg4XAQQrtWm9_dXVrc";
 describe('POST/signup',  () => {
    it("Should return 422 status if email or password were not supplied", (done) => {
        chai.request(BASE_URL)
        .post("signup")
        .send({email: "test@hola.com"})
        .end((err, res) => {
            expect(res).to.have.status(422);
            done();
        });
    });
  
});

describe('POST/login',  () => {
    
    it("Should return 422 status if email or password were not supplied", (done) => {
        chai.request(BASE_URL)
        .post("login")
        .send({email: "test@hola.com"})
        .end((err, res) => {
            expect(res).to.have.status(422);
            done();
        });
    });

     it("Should return 400 status if password is wrong", (done) => {
        chai.request(BASE_URL)
        .post("login")
        .send({"email": "something@gmail.com","password": "__"})
        .end((err, res) => {
            expect(res).to.have.status(400);
            done();
        });
    });   

     it("Should return 200 status if login was successfull", (done) => {
        chai.request(BASE_URL)
        .post("login")
        .send({"email": "something@gmail.com","password": "password12"})
        .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property("token").to.be.string;
            done();
        });
    });   
});

describe('POST/add-contact',  () => {
    
    it("Should return 401 status if user does not provide a valid token", (done) => {
        chai.request(BASE_URL)
        .post("add-contact")
        .send({"email": "something@gmail.com","password": "password12"})
        .end((err, res) => {
            expect(res).to.have.status(401);
            done();
        });
    });

     it("Should return 400 status if a contact is missing a field", (done) => {
        chai.request(BASE_URL)
        .post("add-contact")
        .set("Authorization", SAMPPLE_TOKEN)
        .send({"email": "something@gmail.com","password": "password12"})
        .end((err, res) => {
            expect(res).to.have.status(400);
            done();
        });
    });
  
});