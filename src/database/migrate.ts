import "dotenv/config";
import { migrate } from "drizzle-orm/mysql2/migrator";
import { db, connection } from "./db";

// This will run migrations on the database, skipping the ones already applied
migrate(db, { migrationsFolder: "src/database/drizzle" })
  .then(() => {
    console.log("Migrations ran successfully");

    connection.end();
    process.exit(0);
  })
  .catch((error) => {
    console.log("An error occured: ", error);

    process.exit(1);
  });
