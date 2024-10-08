import CategoryModel from "../repositories/category.repository";
import ProductModel from "../repositories/product.repository";
import INITIAL_PRODUCTS from "../utils/data.json"

export const seedProducts = async () => {
    const categories = await CategoryModel.find();
    const productsPromises = INITIAL_PRODUCTS.map(product => {
        const objProduct = {
            name: product.name,
            price: product.price,
            stock: product.stock,
            imgUrl: product.imgUrl,
            category: categories.find(categ => categ.name === product.category)
        }
        return ProductModel.insert(objProduct);
    })
    return productsPromises;
}