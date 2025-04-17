// test/index.spec.js
const express = require("express");
const request = require("supertest");
const routes = require("../routes/index"); // Tu router principal
const MongoClient = require("mongodb").MongoClient;

const app = express();
app.use(express.json());
app.use("/", routes); // Este ya incluye /contacts, /products, etc.

// Opcional: conectar a MongoDB si estás accediendo datos reales
beforeAll(async () => {
  const url =
    process.env.MONGODB_URL || "mongodb://localhost:27017/team_project";
  await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

describe("GET /", () => {
  test("should respond with a 200 status code", async () => {
    const response = await request(app).get("/").send();
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe("Logged out");
  });
});

describe("GET /contacts", () => {
  test("should return status 200 and array of contacts", async () => {
    const res = await request(app).get("/contacts");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("should return a specific contact by id", async () => {
    const res = await request(app).get("/contacts/67ffeb5b6b9b23013554a1f0"); // <- Agregué la "/"
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("_id", "67ffeb5b6b9b23013554a1f0");
  });
});
describe("GET /products", () => {
  test("should return status 200 and array of contacts", async () => {
    const res = await request(app).get("/products");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("should return a specific contact by id", async () => {
    const res = await request(app).get("/products/67fd52056afe18c271666dfe"); // <- Agregué la "/"
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("_id", "67fd52056afe18c271666dfe");
  });
});
