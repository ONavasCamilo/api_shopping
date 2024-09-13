import CategoryModel from "../repositories/category.repository";

export const getCategoriesService = async () => {
  const categories = await CategoryModel.find();
  return categories;
};

export const postCreateCategorieService = async (name: string) => {
  const newCategory = CategoryModel.create({
    name,
  });
  await CategoryModel.save(newCategory);
  const DBCategory = await CategoryModel.findOneBy({name});
  return DBCategory;
};
