import { seedCategories } from "./category.seeder";
import { seedRoles } from "./role.seeder";

async function initSeeders() {
  console.log("Iniciando creación seeders..");
  const initialSeeders = [...seedRoles(), ...seedCategories()];
  await Promise.all(initialSeeders);
  console.log("Finished roles seeders");
}

export default initSeeders;
