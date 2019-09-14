import { streakoid } from "../src/streakoid";
import { UserTypes } from "../src/types";

const email = "get-user@gmail.com";
const username = "get-user";

jest.setTimeout(120000);

describe("GET /users/:userId", () => {
  let userId = "";

  beforeAll(async () => {
    const registrationResponse = await streakoid.users.create({
      username,
      email
    });
    userId = registrationResponse._id;
  });

  afterAll(async () => {
    await streakoid.users.deleteOne(userId);
  });

  test(`retreives user`, async () => {
    expect.assertions(11);

    const user = await streakoid.users.getOne(userId);

    expect(Object.keys(user.stripe).sort()).toEqual(
      ["customer", "subscription"].sort()
    );
    expect(user.stripe.subscription).toEqual(null);
    expect(user.stripe.customer).toEqual(null);
    expect(user.type).toEqual(UserTypes.basic);
    expect(user.friends).toEqual([]);
    expect(user._id).toEqual(expect.any(String));
    expect(user.username).toEqual(username);
    expect(user.email).toEqual(email);
    expect(user.createdAt).toEqual(expect.any(String));
    expect(user.updatedAt).toEqual(expect.any(String));
    expect(Object.keys(user).sort()).toEqual(
      [
        "stripe",
        "type",
        "friends",
        "_id",
        "username",
        "email",
        "createdAt",
        "updatedAt",
        "__v"
      ].sort()
    );
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
