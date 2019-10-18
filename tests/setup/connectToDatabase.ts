import mongoose from 'mongoose';
import { getServiceConfig } from '../../src/getServiceConfig';
const { TEST_DATABASE_URI } = getServiceConfig();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const connectToDatabase = async (): Promise<any> => {
    await mongoose.connect(TEST_DATABASE_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    });
    return mongoose.connection.dropDatabase();
};

export { connectToDatabase };
