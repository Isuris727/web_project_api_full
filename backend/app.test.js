import supertest from "supertest";
import app from "./app.js";

const request = supertest(app);

describe("Los endpoints responden a las solicitudes", () => {

  

  it('Devuelve los Datos y el estado 200 a la solicitud de "/"', async () => {
    return await request.get("/users").then((response) => {
      expect(response.status).toBe(200);
    });
  });
});
