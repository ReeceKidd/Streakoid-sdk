import mongoose from 'mongoose';
import { getServiceConfig } from '../../getServiceConfig';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const setUpDatabase = async (): Promise<any> => {
    const databaseUri = getServiceConfig().DATABASE_URI;
    await mongoose.connect(databaseUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    });
    return mongoose.connection.dropDatabase();
};

export { setUpDatabase };
