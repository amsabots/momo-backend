import { Model, DataTypes, Sequelize } from "sequelize";
import { AbstractDataEntity, ScraperOutput } from "../types/data";

export const scraper_data = (sequelize: Sequelize) => {
  class ScraperData extends Model<
    Required<ScraperOutput> & Partial<AbstractDataEntity>,
    ScraperOutput
  > {}
  ScraperData.init(
    {
      name: DataTypes.STRING,
      source: DataTypes.STRING,
      type: DataTypes.STRING,
      url: DataTypes.STRING,
    },
    { sequelize, modelName: "scraper_data" }
  );
  return ScraperData;
};
