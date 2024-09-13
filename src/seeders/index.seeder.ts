import { seedRoles } from "./role.seeder";

async function initSeeders() {
  console.log("Iniciando creación seeders..");
  const roleSeeders = seedRoles();
  await Promise.all([...roleSeeders]);
  console.log("Finished roles seeders");
}

export default initSeeders;
