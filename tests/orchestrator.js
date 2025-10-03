//#region imports
import migrator from "models/migrator";
import retry from "async-retry";
import database from "infra/database";
//#endregion

async function waitForAllServices() {
  await waitForWebServer();
}

async function waitForWebServer() {
  return retry(fetchStatusPage, {
    retries: 100,
    maxTimeout: 1000,
  });

  async function fetchStatusPage() {
    const response = await fetch("http://localhost:3000/api/v1/status");
    if (!response.ok) {
      throw new Error();
    }
  }
}

async function clearDatabase() {
  await database.query("DROP schema public cascade; create schema public;");
}

async function runPendingMigrations() {
  await migrator.runPendingMigrations();
}

const orchestrator = {
  clearDatabase,
  waitForAllServices,
  runPendingMigrations,
};

export default orchestrator;
