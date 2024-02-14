/* eslint-disable no-undef */
const chai = require("chai");
const chaiHttp = require("chai-http");
require("../server");

const request = "http://127.0.0.1:3000";

const { faker } = require("@faker-js/faker");

chai.should();
chai.use(chaiHttp);
inValidIDMongo = "000000ac6cb8e56599f43f13";
notMongoId = "639362ac6cb8e56599f";
let movieTitle;
let movieId;

describe("Movies API Unit Test case", () => {
  describe("route: /api/movies, method:post", () => {
    it("It should create a movie, if given data is valid", (done) => {
      const post = {
        title: faker.random.word() + faker.random.word() + faker.random.word(),
        year: 2000,
        genre: ["comedy"],
      };
      chai
        .request(request)
        .post("/api/movies")
        .send(post)
        .end((err, res) => {
          if (err) {
            console.error(
              "The following error" +
                err.message +
                " is generated in movies api unit test case of route :/api/movies"
            );
          } else {
            res?.should.have.status(201);
            res?.body.should.be.an("object");
            res?.body?.should.have.property("title");
            movieTitle = res?.body?.title;
            res?.body?.should.have.property("year");
            res?.body?.should.have.property("genre").that.is.an("array");
            res?.body?.should.have.property("_id");
            movieId = res?.body?._id;

            res?.body?.should.have.property("createdAt");
            res?.body?.should.have.property("updatedAt");
            done();
          }
        });
    });
    it("It should give an error, if user try to add movie with same title", (done) => {
      const post = {
        title: movieTitle,
        year: 2001,
        genre: ["action"],
      };
      chai
        .request(request)
        .post("/api/movies")
        .send(post)
        .end((err, res) => {
          if (err) {
            console.error(
              "The following error" +
                err.message +
                " is generated in movies api unit test case of route :/api/movies"
            );
          } else {
            res?.should.have.status(400);
            res?.body?.should.have.a.property("error").be.a("array");
            for (let index = 0; index < res?.body?.error?.length; index++) {
              res?.body?.error[index]?.should.have.a.property("message");
            }

            done();
          }
        });
    });
    it("It should give an error, if user try to add movie without title", (done) => {
      const post = {
        year: 2001,
        genre: ["action"],
      };
      chai
        .request(request)
        .post("/api/movies")
        .send(post)
        .end((err, res) => {
          if (err) {
            console.error(
              "The following error" +
                err.message +
                " is generated in movies api unit test case of route :/api/movies"
            );
          } else {
            res?.should.have.status(422);
            res?.body?.should.have.a.property("error").be.a("array");
            for (let index = 0; index < res?.body?.error?.length; index++) {
              res?.body?.error[index]?.should.have.a.property("message");
            }

            done();
          }
        });
    });
    it("It should give an error, if user try to add movie without year", (done) => {
      const post = {
        title: faker.random.word() + faker.random.word() + faker.random.word(),
        genre: ["action"],
      };
      chai
        .request(request)
        .post("/api/movies")
        .send(post)
        .end((err, res) => {
          if (err) {
            console.error(
              "The following error" +
                err.message +
                " is generated in movies api unit test case of route :/api/movies"
            );
          } else {
            res?.should.have.status(422);
            res?.body?.should.have.a.property("error").be.a("array");
            for (let index = 0; index < res?.body?.error?.length; index++) {
              res?.body?.error[index]?.should.have.a.property("message");
            }

            done();
          }
        });
    });
    it("It should give an error, if user does not give genre as array", (done) => {
      const post = {
        title: faker.random.word() + faker.random.word() + faker.random.word(),
        year: 2002,
        genre: "action",
      };
      chai
        .request(request)
        .post("/api/movies")
        .send(post)
        .end((err, res) => {
          if (err) {
            console.error(
              "The following error" +
                err.message +
                " is generated in movies api unit test case of route :/api/movies"
            );
          } else {
            res?.should.have.status(422);
            res?.body?.should.have.a.property("error").be.a("array");
            for (let index = 0; index < res?.body?.error?.length; index++) {
              res?.body?.error[index]?.should.have.a.property("message");
            }

            done();
          }
        });
    });
  });
  describe("route: /api/movies/:movieId, method:get by id", () => {
    it("It should get a movie, if id is given valid", (done) => {
      chai
        .request(request)
        .get(`/api/movies/${movieId}`)
        .end((err, res) => {
          if (err) {
            console.error(
              "The following error" +
                err.message +
                " is generated in movies api unit test case of route :/api/movies/movieId"
            );
          } else {
            res?.should.have.status(200);
            res?.body.should.be.a("object");
            res?.body?.should.have.property("title");
            res?.body?.should.have.property("year");
            res?.body?.should.have.property("genre").that.is.an("array");
            res?.body?.should.have.property("_id");
            res?.body?.should.have.property("createdAt");
            res?.body?.should.have.property("updatedAt");

            done();
          }
        });
    });
    it("It should not display any data , if data does not exist for given id", (done) => {
      chai
        .request(request)
        .get(`/api/movies/${inValidIDMongo}`)
        .end((err, res) => {
          if (err) {
            console.error(
              "The following error" +
                err.message +
                " is generated in movies api unit test case of route :/api/movies/movieId"
            );
          } else {
            res?.should.have.status(204);
            done();
          }
        });
    });
    it("It should not display an error , if given id is not valid", (done) => {
      chai
        .request(request)
        .get(`/api/movies/${notMongoId}`)
        .end((err, res) => {
          if (err) {
            console.error(
              "The following error" +
                err.message +
                " is generated in movies api unit test case of route :/api/movies/movieId"
            );
          } else {
            res?.should.have.status(422);
            res?.body?.should.have.a.property("error").be.a("array");
            for (let index = 0; index < res?.body?.error?.length; index++) {
              res?.body?.error[index]?.should.have.a.property("message");
            }

            done();
          }
        });
    });
  });
  describe("route: /api/movies , method:get", () => {
    it("It should display all movies", (done) => {
      chai
        .request(request)
        .get("/api/movies")
        .end((err, res) => {
          if (err) {
            console.error(
              "The following error" +
                err.message +
                " is generated in movies api unit test case of route : /api/movies"
            );
          } else {
            res?.should.have.status(200);

            res?.body.should.be.an("array");

            for (let i = 0; i < res?.body.length; i++) {
              const movie = res?.body[i];
              movie?.should.have.property("_id");
              movie?.should.have.property("title");
              movie?.should.have.property("year");
              movie?.should.have.property("genre");
              movie?.should.have.property("updatedAt");
              movie?.should.have.property("createdAt");
            }

            done();
          }
        });
    });
  });
});
