import app from "./app";
import { PORT, RESTART_SCHEMA } from "./config/env.config";
import { AppDataSource } from "./config/typeorm.config";
import initSeeders from "./seeders/index.seeder";

AppDataSource.initialize()
  .then(() => {
    console.log("Conectado a la base de datos");
    app.listen(PORT, () => {
      console.log(`Servidor corriendo ${PORT}`);
      if (RESTART_SCHEMA) {
        initSeeders();
      }
    });
  })
  .catch((err) => console.log("ERROR:", err));
