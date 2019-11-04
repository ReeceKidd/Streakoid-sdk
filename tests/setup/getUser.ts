import { username, email } from './environment';
import { streakoid } from '../../src/streakoid';
import { User } from '../../src';

const getUser = async (): Promise<User> => {
    return streakoid.users.create({
        username,
        email,
    });
};

export { getUser };
