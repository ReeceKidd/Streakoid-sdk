import { streakoid } from "../src/streakoid";
import { StreakTypes } from "../src/models/StreakTypes";

const email = "create-complete-solo-streak-tasks-user@gmail.com";
const username = "create-complete-solo-streak-tasks-user";

const timezone = "Europe/London";

jest.setTimeout(120000);

describe("POST /complete-solo-streak-tasks", () => {
    let userId: string;
    let soloStreakId: string;
    let secondSoloStreakId: string;

    const streakName = "Intermittent fasting";
    const streakDescription = "I will not eat until 1pm everyday";

    beforeAll(async () => {
        const registrationResponse = await streakoid.users.create(
            {
                username,
                email
            }
        );
        userId = registrationResponse._id;

        const createSoloStreakResponse = await streakoid.soloStreaks.create({
            userId,
            streakName,
            timezone,
            streakDescription
        }
        );
        soloStreakId = createSoloStreakResponse._id;
    });

    afterAll(async () => {
        await streakoid.users.deleteOne(userId);

        await streakoid.soloStreaks.deleteOne(soloStreakId);
        await streakoid.soloStreaks.deleteOne(secondSoloStreakId);

        const completeSoloStreakTasks = await streakoid.completeSoloStreakTasks.getAll({
            userId
        }
        );
        await Promise.all(
            completeSoloStreakTasks.map(
                (completeSoloStreakTask: any) => {
                    return streakoid.completeSoloStreakTasks.deleteOne(
                        completeSoloStreakTask._id
                    );
                }
            )
        );
    });

    describe("POST /v1/complete-solo-streak-tasks", () => {
        test("user can say that a solo streak task has been completed for the day", async () => {
            expect.assertions(14);

            const completeSoloStreakTask = await streakoid.completeSoloStreakTasks.create(
                {
                    userId,
                    soloStreakId,
                    timezone
                }
            );

            expect(completeSoloStreakTask._id).toBeDefined();
            expect(completeSoloStreakTask.userId).toEqual(userId);
            expect(completeSoloStreakTask.streakId).toEqual(soloStreakId);
            expect(completeSoloStreakTask.taskCompleteTime).toEqual(expect.any(String));
            expect(completeSoloStreakTask.taskCompleteDay).toEqual(expect.any(String));
            expect(completeSoloStreakTask.streakType).toEqual(StreakTypes.soloStreak);
            expect(completeSoloStreakTask.createdAt).toEqual(expect.any(String));
            expect(completeSoloStreakTask.updatedAt).toEqual(expect.any(String));
            expect(Object.keys(completeSoloStreakTask).sort()).toEqual([
                "_id",
                "userId",
                "streakId",
                "taskCompleteTime",
                "taskCompleteDay",
                "streakType",
                "createdAt",
                "updatedAt",
                "__v"
            ].sort());

            const updatedSoloStreak = await streakoid.soloStreaks.getOne(
                soloStreakId
            );

            const { currentStreak } = updatedSoloStreak;
            expect(currentStreak.startDate).toBeDefined();
            expect(currentStreak.numberOfDaysInARow).toEqual(1);
            expect(Object.keys(currentStreak).sort()).toEqual([
                "startDate",
                "numberOfDaysInARow"
            ].sort());
            expect(updatedSoloStreak.completedToday).toEqual(true);
            expect(updatedSoloStreak.active).toEqual(true);
        });

        test("user cannot complete the same solo streak task in the same day", async () => {
            expect.assertions(3);
            const secondaryCreateSoloStreakResponse = await streakoid.soloStreaks.create({
                userId,
                streakName,
                timezone,
                streakDescription
            }
            );
            secondSoloStreakId = secondaryCreateSoloStreakResponse._id;
            try {
                await streakoid.completeSoloStreakTasks.create(
                    {
                        userId,
                        soloStreakId: secondSoloStreakId,
                        timezone
                    }
                );
                await streakoid.completeSoloStreakTasks.create(
                    {
                        userId,
                        soloStreakId: secondSoloStreakId,
                        timezone
                    }
                );
            } catch (err) {
                expect(err.response.status).toEqual(422);
                expect(err.response.data.message).toEqual(
                    "Task already completed today."
                );
                expect(err.response.data.code).toEqual("422-01");
            }
        });
    });
});
