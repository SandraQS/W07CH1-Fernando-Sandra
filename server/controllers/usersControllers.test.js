const bcrypt = require("bcrypt");
const User = require("../../database/models/User");
const { createUser, loginUser } = require("./usersControllers");

jest.mock("../../database/models/User");

describe("Given createUser function", () => {
  describe("When receives an req object with a new user and res objet", () => {
    test("Then it should called the method create and called res.json with the new user", async () => {
      const req = {
        body: {
          name: "Fernando",
          username: "FMC",
          password: "1234",
          admin: true,
        },
      };

      const newUser = {
        body: {
          name: "Fernando",
          username: "FMC",
          password: await bcrypt.hash(req.body.password, 10),
          admin: true,
        },
      };

      User.create = jest.fn().mockResolvedValue(newUser);
      const res = {
        json: jest.fn(),
      };

      await createUser(req, res);

      expect(User.create).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(newUser);
    });
  });

  describe("When receives a function next and rejected error", () => {
    test("Then it should call the next function with the error object and status code 400", async () => {
      const req = {
        body: {
          name: "Fernando",
          username: "FMC",
          password: "1234",
          admin: true,
        },
      };
      const error = new Error("Formato no válido");
      User.create = jest.fn().mockRejectedValue(error);
      const res = {
        json: jest.fn(),
      };
      const next = jest.fn();

      await createUser(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(error.code).toBe(400);
    });
  });
});

describe("Given loginUser function", () => {
  describe("When receives an req object with an username unexist, and a next function", () => {
    test("Then it should called the next function with error", async () => {
      const req = {
        body: {
          username: "Fernando",
          password: "1234",
        },
      };

      User.findOne = jest.fn().mockResolvedValue(null);

      const error = new Error("Algo ha fallado");
      const next = jest.fn();

      await loginUser(req, null, next);
      expect(next.mock.calls[0][0]).toHaveProperty("message", error.message);
      expect(next.mock.calls[0][0]).toHaveProperty("code", 401);
    });
  });
});
