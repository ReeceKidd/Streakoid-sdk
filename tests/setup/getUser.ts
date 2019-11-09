import { username, email } from './environment';
import { streakoid } from '../../src/streakoid';
import { CurrentUser } from '../../src';

const getUser = async (): Promise<CurrentUser> => {
    return streakoid.user.create({
        username,
        email,
    });
};

export { getUser };
