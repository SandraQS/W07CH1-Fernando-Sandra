const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../database/models/User");
const { createUser, loginUser } = require("./usersControllers");

jest.mock("../../database/models/User");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

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
          password:
            "$2b$10$zT/nsDjrM8cj57I1O0gteOcJk9xWj6azdXyknC4SUjP.Q1dyMxz66",
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
    test("Then it should called the next function with error, error.message 'Algo ha fallado' and error.code 401", async () => {
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

  describe("When receives an req object with a correct username and a password incorrect", () => {
    test("Then it should called the next function with error, error.message 'Algo ha fallado' and error.code 401", async () => {
      User.findOne = jest.fn().mockResolvedValue({
        body: {
          id: "618c2ad341f016c64bcee2d3",
          username: "Fernando",
          password: "1234",
        },
      });

      bcrypt.compare = jest.fn().mockResolvedValue(false);
      const req = {
        body: {
          username: "Fernando",
          password: "1234",
        },
      };
      const error = new Error("Algo ha fallado");
      const next = jest.fn();

      await loginUser(req, null, next);
      expect(next.mock.calls[0][0]).toHaveProperty("message", error.message);
      expect(next.mock.calls[0][0]).toHaveProperty("code", 401);
    });
  });

  describe("When receives an req object with a correct username and a correct password ", () => {
    test("Then it should called jwt.sing with a new token and called res.json with this token", async () => {
      User.findOne = jest.fn().mockResolvedValue({
        body: {
          id: "618c2ad341f016c64bcee2d3",
          username: "Fernando",
          password: "1234",
        },
      });

      bcrypt.compare = jest.fn().mockResolvedValue(true);
      const req = {
        body: {
          username: "Fernando",
          password: "1234",
        },
      };
      const res = {
        json: jest.fn(),
      };
      const expectedToken = "tokenSuperSeguro";

      jwt.sign = jest.fn().mockReturnValue(expectedToken);

      const response = {
        token: expectedToken,
      };

      await loginUser(req, res);

      expect(res.json).toHaveBeenCalledWith(response);
    });
  });
});
