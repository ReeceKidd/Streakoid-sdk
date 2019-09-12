import axios from "axios";


import ApiVersions from "./ApiVersions";
import RouterCategories from "./RouterCategories";

export default (applicationUrl: string) => {
    const getAll = (searchQuery?: string) => {
        let getAllUsersURL = `${applicationUrl}/${ApiVersions.v1}/${RouterCategories.users}?`;
        if (searchQuery) {
            getAllUsersURL = `${getAllUsersURL}searchQuery=${searchQuery}`;
        }
        return axios.get(getAllUsersURL);
    };

    const getOne = (userId: string) => {
        return axios.get(
            `${applicationUrl}/${ApiVersions.v1}/${RouterCategories.users}/${userId}`
        );
    };

    const create = (username: string, email: string) => {
        return axios.post(
            `${applicationUrl}/${ApiVersions.v1}/${RouterCategories.users}`,
            {
                username,
                email
            }
        );
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
