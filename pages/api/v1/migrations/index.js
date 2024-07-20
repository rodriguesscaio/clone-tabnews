import migrationRunner from "node-pg-migrate";
import { join } from "node:path";
import database from "infra/database";

export default async function migrations(request, response) {
  const dbClient = await database.getNewClientDB();

  const migrationDefaultOptions = {
    dbClient: dbClient,
    dir: join("infra", "migrations"),
    direction: "up",
    dryRun: true,
    verbose: true,
    migrationsTable: "pgmigrations",
  };

  if (request.method === "GET") {
    const migrationsPending = await migrationRunner(migrationDefaultOptions);
    dbClient.end();

    return response.status(200).json(migrationsPending);
  }

  if (request.method === "POST") {
    const migratedMigrations = await migrationRunner({
      ...migrationDefaultOptions,
      dryRun: false,
    });

    dbClient.end();

    if (migratedMigrations.length > 0) {
      return response.status(201).json(migratedMigrations);
    }

    return response.status(200).json(migratedMigrations);
  }

  return response.status(405).end();
}
