import axios from "axios";


import ApiVersions from "./ApiVersions";
import RouterCategories from "./RouterCategories";
import { User } from "./models/User";

export default (applicationUrl: string) => {
    const getAll = async (searchQuery?: string): Promise<User[]> => {
        let getAllUsersURL = `${applicationUrl}/${ApiVersions.v1}/${RouterCategories.users}?`;
        if (searchQuery) {
            getAllUsersURL = `${getAllUsersURL}searchQuery=${searchQuery}`;
        }
        const { data } = await axios.get(getAllUsersURL);
        return data
    };

    const getOne = async (userId: string): Promise<User> => {
        const { data } = await axios.get(
            `${applicationUrl}/${ApiVersions.v1}/${RouterCategories.users}/${userId}`
        );
        return data
    };

    const create = async ({ username, email }: { username: string, email: string }): Promise<User> => {
        const { data } = await axios.post(
            `${applicationUrl}/${ApiVersions.v1}/${RouterCategories.users}`,
            {
                username,
                email
            }
        );
        return data
    };

    const deleteOne = (userId: string) => {
        return axios.delete(
            `${applicationUrl}/${ApiVersions.v1}/${RouterCategories.users}/${userId}`
        );
    };

    return {
        getAll,
        getOne,
        create,
        deleteOne
    };
};
