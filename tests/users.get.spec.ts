import { streakoid, londonTimezone } from "../src/streakoid";
import UserTypes from "../src/userTypes";

const email = "search-user@gmail.com";
const username = "search-user";

jest.setTimeout(120000);

describe("GET /users", () => {
  let userId: string;

  beforeAll(async () => {
    const createUserResponse = await streakoid.users.create({
      username,
      email
    });
    userId = createUserResponse._id;
  });

  afterAll(async () => {
    await streakoid.users.deleteOne(userId);
  });

  test(`returns all users when no searchTerm is used`, async () => {
    expect.assertions(13);

    const users = await streakoid.users.getAll();
    expect(users.length).toBeGreaterThanOrEqual(1);

    const user = users[0];

    expect(Object.keys(user.stripe).sort()).toEqual(
      ["customer", "subscription"].sort()
    );
    expect(user.stripe.subscription).toEqual(null);
    expect(user.stripe.customer).toEqual(null);
    expect(user.type).toEqual(UserTypes.basic);
    expect(user.friends).toEqual([]);
    expect(user._id).toEqual(expect.any(String));
    expect(user.username).toEqual(expect.any(String));
    expect(user.email).toEqual(expect.any(String));
    expect(user.timezone).toEqual(londonTimezone);
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
  });

  test(`returns user when full searchTerm is used`, async () => {
    expect.assertions(13);

    const users = await streakoid.users.getAll(username);
    expect(users.length).toBeGreaterThanOrEqual(1);

    const user = users[0];
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
    expect(user.timezone).toEqual(londonTimezone);
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
  });

  test("returns user when partial searchTerm is used", async () => {
    expect.assertions(13);

    const users = await streakoid.users.getAll("search");
    expect(users.length).toBeGreaterThanOrEqual(1);

    const user = users[0];
    expect(Object.keys(user.stripe)).toEqual(["customer", "subscription"]);
    expect(user.stripe.subscription).toEqual(null);
    expect(user.stripe.customer).toEqual(null);
    expect(user.type).toEqual(UserTypes.basic);
    expect(user.friends).toEqual([]);
    expect(user._id).toEqual(expect.any(String));
    expect(user.username).toEqual(username);
    expect(user.email).toEqual(email);
    expect(user.timezone).toEqual(londonTimezone);
    expect(user.createdAt).toEqual(expect.any(String));
    expect(user.updatedAt).toEqual(expect.any(String));
    expect(Object.keys(user)).toEqual([
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
    ]);
  });
});
