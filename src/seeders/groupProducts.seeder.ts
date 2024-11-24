import GroupProductModel from "../repositories/groupProduct.repository";
import ProductModel from "../repositories/product.repository";
import INITIAL_PRODUCTS from "../utils/data.json";

export const seedGroupProducts = async () => {

  const groupsMap: { [name: string]: any[] } = {};

  INITIAL_PRODUCTS.forEach(product => {
    if (!groupsMap[product.name]) {
      groupsMap[product.name] = [];
    }
    groupsMap[product.name].push(product);
  });

  const groupProductsPromises = Object.entries(groupsMap).map(async ([name, products]) => {
    let group = await GroupProductModel.findOne({ where: { name } });
    if (!group) {
      group = GroupProductModel.create({ name });
      await GroupProductModel.save(group);
    }

    const productPromises = products.map(async productData => {
      const product = ProductModel.create({
        name: productData.name,
        price: productData.price,
        stock: productData.stock,
        imgUrl: productData.imgUrl,
        groupProducts: group
      });
      await ProductModel.save(product);
    });

    return Promise.all(productPromises);
  });

  await Promise.all(groupProductsPromises);
};
