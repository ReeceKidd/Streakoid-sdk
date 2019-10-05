import { streakoid } from "../src/streakoid";
import { GroupStreakType } from "../src";

const email = "delete-groupMember-streak-user@gmail.com";
const username = "delete-groupMember-streak-user";

jest.setTimeout(120000);

describe("DELETE /group-member-streaks", () => {
  let registeredUserId: string;
  let createdGroupStreakId: string;
  let createGroupMemberStreakId: string;

  const streakName = "Daily Spanish";
  const streakDescription = "Everyday I must do Spanish on Duolingo";

  beforeAll(async () => {
    const registrationResponse = await streakoid.users.create({
      username,
      email
    });
    registeredUserId = registrationResponse._id;

    const members = [{ memberId: registeredUserId }];

    const createGroupStreakResponse = await streakoid.groupStreaks.create({
      creatorId: registeredUserId,
      type: GroupStreakType.team,
      streakName,
      streakDescription,
      members
    });
    createdGroupStreakId = createGroupStreakResponse._id;

    const createGroupMemberStreakResponse = await streakoid.groupMemberStreaks.create(
      {
        userId: registeredUserId,
        groupStreakId: createdGroupStreakId
      }
    );

    createGroupMemberStreakId = createGroupMemberStreakResponse._id;
  });

  afterAll(async () => {
    await streakoid.users.deleteOne(registeredUserId);
    await streakoid.groupStreaks.deleteOne(createdGroupStreakId);
  });

  test(`deletes groupMember streak`, async () => {
    expect.assertions(1);

    const response = await streakoid.groupMemberStreaks.deleteOne(
      createGroupMemberStreakId
    );
    expect(response.status).toEqual(204);
  });
});
