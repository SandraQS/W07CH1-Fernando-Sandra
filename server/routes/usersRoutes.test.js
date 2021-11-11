require("dotenv").config();
const mongoose = require("mongoose");
const supertest = require("supertest");
const bcrypt = require("bcrypt");
const { initializerServer, app } = require("..");
const initDB = require("../../database");
const User = require("../../database/models/User");

const request = supertest(app);
let server;

beforeAll(async () => {
  await initDB(process.env.MONGODB_STRING_SERIES_TESTS);
  server = await initializerServer(2901);
  await User.deleteMany();
});

afterAll((done) => {
  server.close(async () => {
    await mongoose.connection.close();
    done();
  });
});

beforeEach(async () => {
  await User.deleteMany();
  await User.create(
    {
      name: "Sandra",
      username: "SQS",
      password: await bcrypt.hash("holi", 10),
    },
    {
      name: "Fernando",
      username: "FMC",
      password: await bcrypt.hash("1234", 10),
    }
  );
});

describe("Given /registe route", () => {
  describe("When it receives a POST request", () => {
    test("Then it should send a response with a new user", async () => {
      const { body } = await request
        .post("/users/register")
        .send({
          name: "Gisela",
          username: "GQS",
          password: "123",
        })
        .expect(201);

      expect(body).toHaveProperty("name", "Gisela");
      expect(body).toHaveProperty("username", "GQS");
      expect(body).toHaveProperty("password");
    });
  });
});
