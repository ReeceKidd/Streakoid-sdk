import { User } from '../../src';
import { streakoid } from '../../src/streakoid';

export const friendUsername = 'friend';
export const friendEmail = 'friend@gmail.com';

const getFriend = async (): Promise<User> => {
    return streakoid.users.create({ username: friendUsername, email: friendEmail });
};

export { getFriend };