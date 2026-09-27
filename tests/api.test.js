const request = require("supertest");
const { createApp } = require("../src/app");

describe("backend API", () => {
  let app;
  beforeEach(() => {
    app = createApp();
  });

  test("GET /health -> 200 { status: ok }", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: "ok" });
  });

  test("GET /api/version -> 200 with name and version", async () => {
    const res = await request(app).get("/api/version");
    expect(res.status).toBe(200);
    expect(res.body.name).toBeDefined();
    expect(res.body.version).toBeDefined();
  });

  test("GET /api/services -> 200 with services and summary", async () => {
    const res = await request(app).get("/api/services");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.services)).toBe(true);
    expect(res.body.summary).toBeDefined();
  });
});
