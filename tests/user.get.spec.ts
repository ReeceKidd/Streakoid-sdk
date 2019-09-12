import { streakoid } from "../src/streakoid";

const registeredEmail = "get-user@gmail.com";
const registeredUsername = "get-user";

jest.setTimeout(120000);

describe("GET /users/:userId", () => {
  let userId = "";

  beforeAll(async () => {
    const registrationResponse = await streakoid.users.create(
      registeredUsername,
      registeredEmail
    );
    userId = registrationResponse.data._id;
  });

  afterAll(async () => {
    await streakoid.users.deleteOne(userId);
  });

  test(`retreives user`, async () => {
    expect.assertions(3);

    const getUserResponse = await streakoid.users.getOne(userId);

    expect(getUserResponse.status).toBe(200);
    expect(getUserResponse.data.user.email).toEqual(registeredEmail);
    expect(getUserResponse.data.user.username).toEqual(registeredUsername);
  });

  test(`sends string must be 24 characters long error when userId is not valid`, async () => {
    expect.assertions(2);

    try {
      await streakoid.users.getOne("notLongEnough");
    } catch (err) {
      expect(err.response.status).toBe(422);
      expect(err.response.data.message).toEqual(
        'child "userId" fails because ["userId" length must be 24 characters long]'
      );
    }
  });
});
