const bcrypt = require("bcrypt");
const User = require("../../database/models/users");
const { createUser } = require("./usersControllers");

jest.mock("../../database/models/users");

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
});
