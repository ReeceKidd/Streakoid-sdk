import mongoose from 'mongoose';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const disconnectFromDatabase = async (): Promise<any> => {
    await mongoose.connection.dropDatabase();
    return mongoose.disconnect();
};

export { disconnectFromDatabase };
