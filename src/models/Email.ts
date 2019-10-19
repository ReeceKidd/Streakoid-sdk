interface Email {
    _id: string;
    name: string;
    email: string;
    message: string;
    createdAt: string;
    updatedAt: string;
    userId?: string;
    username?: string;
}

export default Email;
