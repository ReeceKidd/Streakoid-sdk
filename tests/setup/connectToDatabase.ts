import mongoose from 'mongoose';
import { databaseUri } from './environment';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const connectToDatabase = async (): Promise<any> => {
    await mongoose.connect(databaseUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    });
    return mongoose.connection.dropDatabase();
};

export { connectToDatabase };
