import axios from "axios";

import ApiVersions from "./ApiVersions";
import RouterCategories from "./RouterCategories";
import { User } from "./models/User";
import { Friend } from "./models/Friend";

export default (applicationUrl: string) => {
    const getAll = async (userId: string): Promise<Friend[]> => {
        const { data } = await axios.get(
            `${applicationUrl}/${ApiVersions.v1}/${RouterCategories.users}/${userId}/${RouterCategories.friends}`
        );
        return data
    };

    const addFriend = async ({ userId, friendId }: { userId: string, friendId: string }): Promise<User> => {
        const { data } = await axios.post(
            `${applicationUrl}/${ApiVersions.v1}/${RouterCategories.users}/${userId}/${RouterCategories.friends}`,
            {
                friendId
            }
        );
        return data
    };

    const deleteOne = (userId: string, friendId: string) => {
        return axios.delete(
            `${applicationUrl}/${ApiVersions.v1}/${RouterCategories.users}/${userId}/${RouterCategories.friends}/${friendId}`
        );
    };

    return {
        getAll,
        addFriend,
        deleteOne
    };
};
