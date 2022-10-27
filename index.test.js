import chai from 'chai';
import chaiHttp from 'chai-http';
import app from './index.js';

chai.use(chaiHttp);


describe("Post API request test", function() {

    let name = {
        username : "testAccount",
        email : "testAccount@gmail.com",
        password : "rahasia"
    };

    const expectedSuccessMessage = "Created new user testAccount successfully!";

    it("Should return status 201", function(done) {
        chai.expect(name).to.be.a("object");
        
        chai.request(app).post("/api/user").send(name).end((err, res) => {
            chai.expect(res).to.have.status(201);
            chai.expect(res.body.message).to.equal(expectedSuccessMessage);
        });
        done();
    });

    let body2 = {
        username : "testAdd"
    };

    const expectedErrorMessage = "Username and/or Password are missing!";

    it("Should return status 400", function(done) {
        chai.expect(body2).to.be.a("object");

        chai.request(app).post("/api/user").send(body2).end(function (err, res) {
            chai.expect(res).to.have.status(400);
            chai.expect(res.body.message).to.equal(expectedErrorMessage);
        });
        done();
    });

});

describe("Get API request test", function() {

    let name = "testAccount"

    const expectedResponse = {
        username: "testAccount",
        email: "testAccount@gmail.com",
    };

    it("Should return status 201", function(done) {
        chai.expect(name).to.be.a("string");
        
        chai.request(app).get(`/api/user/${name}`).end((err, res) => {
            chai.expect(res).to.have.status(201);
            chai.expect(res).to.be.a('object');
            chai.expect(res.body).to.deep.equal(expectedResponse);
        });
        done();
    });

    let name2 = "test12345";

    it("Should return status 400", function(done) {
        chai.expect(name).to.be.a("string");
        

        chai.request(app).get(`/api/user/${name2}`).send(name2).end(function (err, res) {
            chai.expect(res).to.have.status(400);
        });
        done();
    });

});

describe("Put API request test", function() {

    let name = {
        username : "testAccount",
        email : "testAccount@gmail.com",
        newEmail: "testAccount2@gmail.com"
    };

    const successMessage = "Succesfully update email of test1234!"

    it("Should return status 201", function(done) {
        chai.expect(name).to.be.a("object");
        
        chai.request(app).put("/api/user").send(name).end((err, res) => {
            chai.expect(res).to.have.status(201);
            chai.expect(res).to.be.a('object');
            chai.expect(res.body.message).to.equal(successMessage);
        });
        done();
    });

    let name2 = {
        username : "test12345",
        email : "test1234@gmail.com",
        newEmail: "test@gmail.com"
    };
    it("Should return status 500", function(done) {
        chai.expect(name).to.be.a("object");
        

        chai.request(app).put("/api/user").send(name2).end(function (err, res) {
            chai.expect(res).to.have.status(500);
        });
        done();
    });

});

describe("Delete API request test", function() {

    let name = {
        username : "testAccount"
    };

    it("Should return status 201", function(done) {
        chai.expect(name).to.be.a("object");
        
        chai.request(app).delete("/api/user").send(name).end((err, res) => {
            chai.expect(res).to.have.status(201);
            chai.expect(res.body).to.be.a('boolean');
            chai.expect(res.body).to.be.true;
        });
        done();
    });

    let body2 = {
        username : "testDeletes",
    };

    const expectedErrorMessage = "Username does not exist in the database!";

    it("Should return status 400", function(done) {
        chai.expect(body2).to.be.a("object");

        chai.request(app).delete("/api/user").send(body2).end(function (err, res) {
            chai.expect(res).to.have.status(400);
            chai.expect(res.body.message).to.equal(expectedErrorMessage);
        });
        done();
    });

});
