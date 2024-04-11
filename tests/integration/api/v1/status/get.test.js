test("GET to /api/v1/status should return 200", async () => {
  const result = fetch("http://localhost:3000/api/v1/status");

  expect((await result).status).toBe(200);
});
