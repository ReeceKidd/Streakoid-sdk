import { username, email } from './environment';
import { streakoid } from '../../src/streakoid';
import { PopulatedCurrentUser } from '@streakoid/streakoid-models/lib/Models/PopulatedCurrentUser';

const getUser = async (): Promise<PopulatedCurrentUser> => {
    return streakoid.users.create({
        username,
        email,
    });
};

export { getUser };
