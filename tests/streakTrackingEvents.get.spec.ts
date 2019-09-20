import { streakoid } from "../src/streakoid";
import StreakTrackingEventType from "../src/streakTrackingEventType";

const registeredEmail = "create-streak-tracking-event@gmail.com";
const registeredUsername = "create-streak-tracking-event";

const streakName = "Daily yoga";
const streakDescription = "Every day I must do yoga before 12pm";

jest.setTimeout(120000);

describe("GET /streak-tracking-events", () => {
  let userId: string;
  let soloStreakId: string;
  let streakTrackingEventId: string;

  beforeAll(async () => {
    const registrationResponse = await streakoid.users.create({
      username: registeredUsername,
      email: registeredEmail
    });
    userId = registrationResponse._id;

    const soloStreakRegistration = await streakoid.soloStreaks.create({
      userId,
      streakName,
      streakDescription
    });
    soloStreakId = soloStreakRegistration._id;

    const createStreakTrackingEventResponse = await streakoid.streakTrackingEvents.create(
      {
        type: StreakTrackingEventType.LostStreak,
        streakId: soloStreakId,
        userId
      }
    );

    streakTrackingEventId = createStreakTrackingEventResponse._id;
  });

  afterAll(async () => {
    await streakoid.users.deleteOne(userId);
    await streakoid.soloStreaks.deleteOne(soloStreakId);
    await streakoid.streakTrackingEvents.deleteOne(streakTrackingEventId);
  });

  test(`streak tracking events can be retreived without a query paramater`, async () => {
    expect.assertions(7);

    const streakTrackingEvents = await streakoid.streakTrackingEvents.getAll(
      {}
    );
    expect(streakTrackingEvents.length).toBeGreaterThanOrEqual(1);

    const streakTrackingEvent = streakTrackingEvents[0];
    expect(streakTrackingEvent.userId).toBeDefined();
    expect(streakTrackingEvent.streakId).toBeDefined();
    expect(streakTrackingEvent._id).toEqual(expect.any(String));
    expect(streakTrackingEvent.createdAt).toEqual(expect.any(String));
    expect(streakTrackingEvent.updatedAt).toEqual(expect.any(String));
    expect(Object.keys(streakTrackingEvent).sort()).toEqual(
      [
        "_id",
        "type",
        "streakId",
        "userId",
        "createdAt",
        "updatedAt",
        "__v"
      ].sort()
    );
  });
});
