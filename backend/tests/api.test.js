const request = require("supertest");
const { app } = require("../src/app");
const { generarAlerta } = require("../src/services/sensores.service");

describe("API IoT", () => {

  test("POST /login devuelve token", async () => {
    const res = await request(app)
      .post("/login")
      .send({ username: "admin" });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  test("POST /sensores sin token bloquea acceso", async () => {
    const res = await request(app)
      .post("/sensores")
      .send({});

    expect(res.statusCode).toBe(401);
  });

  test("Combustible bajo genera alerta", () => {
    const resultado = generarAlerta(2);

    expect(resultado).toBeDefined();
  });

});