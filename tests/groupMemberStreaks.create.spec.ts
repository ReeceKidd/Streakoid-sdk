import { streakoid } from "../src/streakoid";


const registeredEmail = "create-groupMember-streak-user@gmail.com";
const registeredUsername = "create-groupMember-streak-user";

const timezone = "Europe/London";

jest.setTimeout(120000);

describe("POST /group-member-streaks", () => {
    let registeredUserId: string;
    let createdGroupStreakId: string;
    let createdGroupMemberStreakId: string;

    const streakName = "Daily Spanish";
    const streakDescription = "Everyday I must do Spanish on Duolingo";

    beforeAll(async () => {
        const registrationResponse = await streakoid.users.create(
            {
                username: registeredUsername,
                email: registeredEmail
            }
        );
        registeredUserId = registrationResponse._id;

        const members = [{ memberId: registeredUserId }];

        const createGroupStreakResponse = await streakoid.groupStreaks.create({
            creatorId: registeredUserId,
            streakName,
            timezone,
            streakDescription,
            members
        });
        createdGroupStreakId = createGroupStreakResponse._id;
    });

    afterAll(async () => {
        await streakoid.users.deleteOne(registeredUserId);
        await streakoid.groupStreaks.deleteOne(createdGroupStreakId);
        await streakoid.groupMemberStreaks.deleteOne(createdGroupMemberStreakId);
    });

    test(`creates groupMember streak associated with groupId`, async () => {
        expect.assertions(13);

        const groupMemberStreak = await streakoid.groupMemberStreaks.create(
            {
                userId: registeredUserId,
                groupStreakId: createdGroupStreakId,
                timezone
            }
        );

        const {
            userId,
            groupStreakId,
            _id,
            currentStreak,
            completedToday,
            active,
            activity,
            pastStreaks,
            createdAt,
            updatedAt
        } = groupMemberStreak;

        expect(Object.keys(currentStreak)).toEqual(["numberOfDaysInARow"]);
        expect(currentStreak.numberOfDaysInARow).toEqual(0);
        expect(completedToday).toEqual(false);
        expect(active).toEqual(false);
        expect(activity).toEqual([]);
        expect(pastStreaks).toEqual([]);
        expect(_id).toBeDefined();
        expect(userId).toEqual(registeredUserId);
        expect(groupStreakId).toEqual(createdGroupStreakId);
        expect(timezone).toEqual(timezone)
        expect(createdAt).toEqual(expect.any(String))
        expect(updatedAt).toEqual(expect.any(String))
        expect(Object.keys(groupMemberStreak).sort()).toEqual([
            "currentStreak",
            "completedToday",
            "active",
            "activity",
            "pastStreaks",
            "_id",
            "userId",
            "groupStreakId",
            "timezone",
            "createdAt",
            "updatedAt",
            "__v"
        ].sort());
    });

    test("throws userId does not exist error", async () => {
        expect.assertions(2);

        try {
            await streakoid.groupMemberStreaks.create(
                {
                    userId: "incorrect-userid",
                    groupStreakId: createdGroupStreakId,
                    timezone
                }
            );
        } catch (err) {
            expect(err.response.status).toEqual(500);
            expect(err.response.data.code).toEqual("500-113");
        }
    });

    test("throws groupStreakId does not exist error", async () => {
        expect.assertions(2);

        try {
            await streakoid.groupMemberStreaks.create(
                {
                    userId: registeredUserId,
                    groupStreakId: "incorrect-group-streak-id",
                    timezone
                }
            );
        } catch (err) {
            expect(err.response.status).toEqual(500);
            expect(err.response.data.code).toEqual("500-114");
        }
    });
});
