import orchestrator from "tests/orchestrator";
import database from "infra/database";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await database.query("drop schema public cascade; create schema public");
});

test("GET to /api/v1/migrations should return 200", async () => {
  const result = await fetch("http://localhost:3000/api/v1/migrations");

  expect(result.status).toBe(200);

  const responseBody = await result.json();

  expect(Array.isArray(responseBody)).toBe(true);
  expect(responseBody.length).toBeGreaterThan(0);
});
