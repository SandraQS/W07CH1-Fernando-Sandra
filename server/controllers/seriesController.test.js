const Serie = require("../../database/models/series");
const { getSeries } = require("./seriesControllers");

jest.mock("../../database/models/series");

describe("Given a getSeries function", () => {
  describe("When it receives an object res", () => {
    test("Then it should invoke the method json", async () => {
      const series = [
        {
          id: 1,
          name: "Fredy",
          year: 2002,
          categorie: "Action",
          platform: "Filmin",
          viewed: true,
        },
      ];
      Serie.find = jest.fn().mockResolvedValue(series);
      const res = {
        json: jest.fn(),
      };

      await getSeries(null, res);

      expect(Serie.find).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(series);
    });
  });
});
