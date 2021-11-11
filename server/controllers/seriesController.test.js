const Serie = require("../../database/models/Serie");
const { getSeries, getSeriesViewed } = require("./seriesControllers");

jest.mock("../../database/models/Serie");

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

describe("Given a getSeriesViewed function", () => {
  describe("When it receives a series list with a property viewed true and a res object", () => {
    test("Then it should invoke Serie.find with series viewed", async () => {
      const seriesList = [
        {
          id: 1,
          name: "Fredy",
          year: 2002,
          categorie: "Action",
          platform: "Filmin",
          viewed: true,
        },
        {
          id: 2,
          name: "Isidoro",
          year: 1980,
          categorie: "Animation",
          platform: "Cinetix",
          viewed: true,
        },
      ];
      const res = {
        json: jest.fn(),
      };
      Serie.find = jest.fn().mockResolvedValue(seriesList);

      await getSeriesViewed(null, res);

      expect(res.json).toHaveBeenCalledWith(seriesList);
    });
  });

  describe("And Serie.find reject", () => {
    test("Then it should invoke next function with error rejected", async () => {
      const error = {};
      Serie.find = jest.fn().mockRejectedValue(error);
      const res = {};
      const next = jest.fn();

      await getSeriesViewed(null, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
