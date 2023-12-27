const request = require("supertest");
const app = require("../../app");

describe("Test GET /Launch", () => {
  test("it respond with status 200", async () => {
    const response = await request(app).get("/launches").expect(200);
  });
});

describe("Test POST /Launch", () => {
  const completeLaunchData = {
    mission: "Kepler Exploration X",
    launchDate: "December 27 2030",
    target: "Kepler 442 -b",
    rocket: "Rocket ss1",
  };

  const launchesDataWithoutDate = {
    mission: "Kepler Exploration X",
    target: "Kepler 442 -b",
    rocket: "Rocket ss1",
  };

  const launchDataWithInvalidDate = {
    mission: "Kepler Exploration X",
    launchDate: "xoot",
    target: "Kepler 442 -b",
    rocket: "Rocket ss1",
  };

  test("it respond with status 201 Created", async () => {
    const response = await request(app)
      .post("/launches")
      .send(completeLaunchData)
      .expect("Content-Type", /json/)
      .expect(201);

    const requestDate = new Date(completeLaunchData.launchDate).valueOf();
    const responseDate = new Date(response.body.launchDate).valueOf();
    expect(responseDate).toBe(requestDate);

    expectedDate(response.body).toMatchObject(launchesDataWithoutDate);
  });
  test("it should catch missing required properties", async () => {
    const response = await request(app)
      .post("/launches")
      .send(launchesDataWithoutDate)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: "Bad request",
    });
  });
  test("i should detect invalid date", async () => {
    const response = await request(app)
      .post("/launches")
      .send(launchDataWithInvalidDate)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: "Wahala for you ooo, incorrect date",
    });
  });
});
