const chai = require("chai");
const chaiHttp = require("chai-http");
const { app } = require("../app");

chai.should();
chai.use(chaiHttp);

const token = "eyJhbGciOiJIUzI1NiJ9.cm9zZQ.vEvuighmzkYQEtjq0tmPfqb6W3QqaC7wQCJll15lCWE"

describe("Alert tests", () => {
  it("should create a alert", done => {
    chai
      .request(app)
      .post("/v1/alerts/")
      .set("Authorization", `Bearer ${token}`)
      .send({
        type: "test",
        label: "l",
        status: "s",
        from: "f",
        to: "t"
      })
      .end((err, res) => {
        console.log(`res: ${res}`);
        res.should.have.status(200);
        chai
          .request(app)
          .get("/v1/alerts/3")
          .set("Authorization", `Bearer ${token}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property("type");
            res.body.should.have.property("label");
            res.body.should.have.property("status");
            res.body.should.have.property("from");
            res.body.should.have.property("to");
            res.body.type.should.equal("test");
            res.body.label.should.equal("l");
            res.body.status.should.equal("s");
            res.body.from.should.equal("f");
            res.body.to.should.equal("t");
            done();
          });
      });
  });

  it("should find a alert with the search", done => {
    chai
      .request(app)
      .post("/v1/alerts/")
      .set("Authorization", `Bearer ${token}`)
      .send({
        type: "test",
        label: "test_search",
        status: "s",
        from: "f",
        to: "t"
      })
      .end((err, ressource) => {
        ressource.should.have.status(200);
        chai
          .request(app)
          .get("/v1/alerts/search")
          .set("Authorization", `Bearer ${token}`)
          .send({ label: "test_search" })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("array");
            res.body[0].should.have.property("type");
            res.body[0].should.have.property("label");
            res.body[0].should.have.property("status");
            res.body[0].should.have.property("from");
            res.body[0].should.have.property("to");
            res.body[0].type.should.equal("test");
            res.body[0].label.should.equal("test_search");
            res.body[0].status.should.equal("s");
            res.body[0].from.should.equal("f");
            res.body[0].to.should.equal("t");
            done();
          });
      });
  });

});
