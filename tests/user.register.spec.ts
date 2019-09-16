import { streakoid } from "../src/streakoid";
import UserTypes from "../src/userTypes";

jest.setTimeout(120000);

describe(`POST /users`, () => {
  const username = "tester1";
  const email = "tester1@gmail.com";
  let userId: string;
  let registeredUserId: string;

  beforeAll(async () => {
    const response = await streakoid.users.create({ username, email });
    userId = response._id;
  });

  afterAll(async () => {
    await streakoid.users.deleteOne(userId);
    await streakoid.users.deleteOne(registeredUserId);
  });

  test("user can register successfully", async () => {
    expect.assertions(12);

    const username = "registerusername";
    const email = "register@gmail.com";

    const user = await streakoid.users.create({
      username,
      email
    });

    expect(Object.keys(user.stripe)).toEqual(["customer", "subscription"]);
    expect(user.stripe.subscription).toEqual(null);
    expect(user.stripe.customer).toEqual(null);
    expect(user.type).toEqual(UserTypes.basic);
    expect(user.friends).toEqual([]);
    expect(user._id).toEqual(expect.any(String));
    expect(user.username).toEqual(username);
    expect(user.email).toEqual(email);
    expect(user.timezone).toEqual("Europe/London");
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
        "timezone",
        "createdAt",
        "updatedAt",
        "__v"
      ].sort()
    );

    registeredUserId = user._id;
  });

  test("fails because username is missing from request", async () => {
    expect.assertions(2);

    try {
      await streakoid.users.create({ username: "", email });
    } catch (err) {
      expect(err.response.status).toEqual(400);
      expect(err.response.data.message).toEqual(
        'child "username" fails because ["username" is not allowed to be empty]'
      );
    }
  });

  test("fails because username already exists", async () => {
    expect.assertions(3);

    try {
      await streakoid.users.create({ username, email: "new-email@gmail.com" });
    } catch (err) {
      expect(err.response.status).toEqual(400);
      expect(err.response.data.code).toBe("400-10");
      expect(err.response.data.message).toEqual(`Username already exists.`);
    }
  });

  test("fails because email is not allowed to be empty", async () => {
    expect.assertions(2);

    try {
      await streakoid.users.create({ username, email: "" });
    } catch (err) {
      expect(err.response.status).toEqual(400);
      expect(err.response.data.message).toEqual(
        'child "email" fails because ["email" is not allowed to be empty]'
      );
    }
  });

  test("fails because email already exists", async () => {
    expect.assertions(3);

    try {
      await streakoid.users.create({ username: "tester01", email });
    } catch (err) {
      expect(err.response.status).toEqual(400);
      expect(err.response.data.code).toEqual("400-09");
      expect(err.response.data.message).toEqual(`User email already exists.`);
    }
  });

  test("fails because email is invalid", async () => {
    expect.assertions(2);

    try {
      await streakoid.users.create({
        username: "tester01",
        email: "invalid email"
      });
    } catch (err) {
      expect(err.response.status).toEqual(422);
      expect(err.response.data.message).toEqual(
        `child \"email\" fails because [\"email\" must be a valid email]`
      );
    }
  });
});
