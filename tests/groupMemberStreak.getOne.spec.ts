import { streakoid } from "../src/streakoid";


const email = "get-one-group-member-streak@gmail.com";
const username = "get-one-group-member-streak-user";

const streakName = "10 minutes journaling";
const streakDescription = "Each day I must do 10 minutes journaling";

const timezone = "Europe/London";

jest.setTimeout(120000);

describe("GET /group-member-streaks/:groupMemberStreakId", () => {
    let userId: string;
    let groupStreakId: string;

    let groupMemberStreakId: string;

    beforeAll(async () => {
        const registrationResponse = await streakoid.users.create({ username, email });
        userId = registrationResponse._id;
        const members = [{ memberId: userId }];

        const createGroupStreakResponse = await streakoid.groupStreaks.create({
            creatorId: userId,
            streakName,
            timezone,
            members
        });
        groupStreakId = createGroupStreakResponse._id;

        const createGroupMemberStreakResponse = await streakoid.groupMemberStreaks.create(
            {
                userId,
                groupStreakId,
                timezone
            }
        );
        groupMemberStreakId = createGroupMemberStreakResponse._id;
    });

    afterAll(async () => {
        await streakoid.users.deleteOne(userId);
        await streakoid.groupStreaks.deleteOne(groupStreakId);
        await streakoid.groupMemberStreaks.deleteOne(groupMemberStreakId);
    });

    test(`group member streak can be retreived`, async () => {
        expect.assertions(13);

        const groupMemberStreak = await streakoid.groupMemberStreaks.getOne(
            groupMemberStreakId
        );

        expect(groupMemberStreak._id).toEqual(expect.any(String));
        expect(groupMemberStreak.currentStreak.numberOfDaysInARow).toEqual(0);
        expect(Object.keys(groupMemberStreak.currentStreak).sort()).toEqual([
            "numberOfDaysInARow"
        ].sort());
        expect(groupMemberStreak.completedToday).toEqual(false);
        expect(groupMemberStreak.active).toEqual(false);
        expect(groupMemberStreak.activity).toEqual([])
        expect(groupMemberStreak.pastStreaks).toEqual([])
        expect(groupMemberStreak.userId).toEqual(userId);
        expect(groupMemberStreak.groupStreakId).toEqual(groupStreakId);
        expect(groupMemberStreak.timezone).toEqual(timezone);
        expect(groupMemberStreak.createdAt).toEqual(expect.any(String))
        expect(groupMemberStreak.updatedAt).toEqual(expect.any(String))
        expect(Object.keys(groupMemberStreak).sort()).toEqual([
            "_id",
            "currentStreak",
            "completedToday",
            "active",
            "activity",
            "pastStreaks",
            "userId",
            "groupStreakId",
            "timezone",
            "createdAt",
            "updatedAt",
            "__v"
        ].sort());
    });

    test(`sends group member streak does not exist error when group member streak doesn't exist`, async () => {
        expect.assertions(5);

        try {
            await streakoid.groupMemberStreaks.getOne("5d54487483233622e43270f9");
        } catch (err) {
            const { data } = err.response
            const { code, message, httpStatusCode } = data;
            expect(err.response.status).toEqual(400);
            expect(code).toEqual("400-34");
            expect(message).toEqual("Group member streak does not exist.");
            expect(httpStatusCode).toEqual(400);
            expect(Object.keys(data).sort()).toEqual([
                "code",
                "message",
                "httpStatusCode"
            ].sort());
        }
    });
});
