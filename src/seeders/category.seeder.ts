import { InsertResult } from "typeorm";
import CategoryModel from "../repositories/category.repository";

enum CategoryEnum {
  SUDADERAS = "sudaderas",
  CAMISETAS = "camisetas",
  ACCESORIOS = "accesorios",
}

const INITIAL_CATEGORIES = [
  CategoryEnum.SUDADERAS,
  CategoryEnum.CAMISETAS,
  CategoryEnum.ACCESORIOS,
];

export const seedCategories = (): Promise<InsertResult>[] => {
  const categoriesPromises = INITIAL_CATEGORIES.map((category) =>
    CategoryModel.insert({ name: category })
  );
  return categoriesPromises;
};
