import supertest from "supertest";

import app from "../index.js";

describe("GET /health", () => {
  it("health check endpoint working", async () => {
    const response = await supertest(app).get("/health");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ ok: true });
  });
});
