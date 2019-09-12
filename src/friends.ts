import axios from "axios";

import ApiVersions from "./ApiVersions";
import RouterCategories from "./RouterCategories";

export default (applicationUrl: string) => {
    const getAll = (userId: string) => {
        return axios.get(
            `${applicationUrl}/${ApiVersions.v1}/${RouterCategories.users}/${userId}/${RouterCategories.friends}`
        );
    };

    const addFriend = (userId: string, friendId: string) => {
        return axios.post(
            `${applicationUrl}/${ApiVersions.v1}/${RouterCategories.users}/${userId}/${RouterCategories.friends}`,
            {
                friendId
            }
        );
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
