import { seedCategories } from "./category.seeder";
import { seedGroupProducts } from "./groupProducts.seeder";
import { seedProducts } from "./products.seeder";
import { seedRoles } from "./role.seeder";

async function initSeeders() {
  console.log("Iniciando creación seeders..");
  await Promise.all([
    seedRoles(),
    seedCategories(),
    seedGroupProducts()
  ]);
  const products = await seedProducts();
  await Promise.all(products);
  console.log("Finished roles seeders");
}

export default initSeeders;
