import { username, email } from './environment';
import { streakoid } from '../../src/streakoid';
import { PopulatedCurrentUser } from '../../src';

const getUser = async (): Promise<PopulatedCurrentUser> => {
    return streakoid.users.create({
        username,
        email,
    });
};

export { getUser };
