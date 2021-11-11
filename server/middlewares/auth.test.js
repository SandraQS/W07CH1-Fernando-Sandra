const jwt = require("jsonwebtoken");
const auth = require("./auth");

describe("Given an auth function", () => {
  describe("When it receives without an Authorization header", () => {
    test("Then it should invoke a next function with an error rejected", () => {
      const req = {
        header: jest.fn(),
      };
      const next = jest.fn();

      auth(req, null, next);
      const expectedError = new Error("No estás autorizado");

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
  describe("When it receives an Authorization true but no token", () => {
    test("Then it should invoke a next function with an error rejected", () => {
      const req = {
        header: jest.fn().mockReturnValue("chachi"),
      };
      const error = new Error("No hay token");
      error.code = 401;
      const next = jest.fn();

      const expectedError = new Error("No hay token");
      auth(req, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
  describe("When it receives a correct Authorization and a wrong token", () => {
    test("Then it should invoke a next function with an error rejected", () => {
      const authHeader = "chachi";
      const req = {
        header: jest.fn().mockReturnValue(authHeader),
      };
      const res = {};
      const next = jest.fn();
      const error = new Error("No hay token");
      error.code = 401;

      auth(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
  describe("When it receives an Authorization and a token", () => {
    test("Then it should invoke a next function and a req with user.id", () => {
      const req = {
        header: jest
          .fn()
          .mockReturnValue(
            "Bearer DGhKdN5jBP2ndIeLQpXumjYHCAkx0UeIGVAJMLhAJLc"
          ),
      };
      jwt.verify = jest.fn().mockReturnValue("618c386bc3130c8c95e72bee");
      const next = jest.fn();

      auth(req, null, next);

      expect(next).toHaveBeenCalled();
    });
  });
  describe("When it receives an Authorization and a token", () => {
    test("Then it should invoke a next function with an error", () => {
      const req = {
        header: jest
          .fn()
          .mockReturnValue(
            "Bearer DGhKdN5jBP2ndIeLQpXumjYHCAkx0UeIGVAJMLhAJLc"
          ),
      };
      jwt.verify = jest.fn().mockReturnValue();
      const error = new Error("El token no sirve");
      error.code = 401;
      const next = jest.fn();

      auth(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
