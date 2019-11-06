import { username, email } from './environment';
import { streakoid } from '../../src/streakoid';
import { FormattedUser } from '../../src';

const getUser = async (): Promise<FormattedUser> => {
    return streakoid.users.create({
        username,
        email,
    });
};

export { getUser };
