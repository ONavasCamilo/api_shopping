import INITIAL_PRODUCTS from "../utils/data.json";

export const seedGroupProducts = async () => {
  // deberia retornar una promesa que agregue a la entidad groupProducts los diferentes grupos basandonos en los nombres que se repitieron por lo menos una vez y añadiendo al mismo grupo los productos con el mismo nombre
  const groupProductsPromises = INITIAL_PRODUCTS.map((product) => {
    const nameProducts: any = [];  // ["camiseta 1"]
    if (nameProducts.length === 0) {
        nameProducts.push(product.name)
    } else {
        for (let i = 0; i < nameProducts.length; i++) {
            if (product.name === nameProducts[i]) {
                
            }
        }
    }

  });
  return groupProductsPromises;
};
