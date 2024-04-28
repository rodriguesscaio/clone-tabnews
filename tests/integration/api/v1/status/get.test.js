test("GET to /api/v1/status should return 200", async () => {
  const result = await fetch("http://localhost:3000/api/v1/status");

  const parseBody = await result.json();

  const parseUpdatedAt = new Date(parseBody.updated_at).toISOString();

  expect(result.status).toBe(200);
  expect(parseBody.updated_at).toEqual(parseUpdatedAt);
  expect(parseBody.dependencies.database.version).toEqual("16.0");
  expect(parseBody.dependencies.database.max_connections).toBe(100);
  expect(parseBody.dependencies.database.opened_connections).toBe(1);
});
