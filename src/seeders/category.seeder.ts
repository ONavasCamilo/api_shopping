import { InsertResult } from "typeorm";
import CategoryModel from "../repositories/category.repository";

enum CategoryEnum {
  SUDADERAS = "sudaderas",
  CAMISETAS = "camisetas",
  ACCESORIOS = "accesorios",
  HOODIES = "hoodies",
}

const INITIAL_CATEGORIES = [
  CategoryEnum.SUDADERAS,
  CategoryEnum.CAMISETAS,
  CategoryEnum.ACCESORIOS,
  CategoryEnum.HOODIES,
];

export const seedCategories = (): Promise<InsertResult>[] => {
  const categoriesPromises = INITIAL_CATEGORIES.map((category) =>
    CategoryModel.insert({ name: category })
  );
  return categoriesPromises;
};
