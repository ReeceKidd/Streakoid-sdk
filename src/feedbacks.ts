import axios from "axios";
import ApiVersions from "./ApiVersions";
import RouterCategories from "./RouterCategories";

export default (applicationUrl: string) => {
    const create = (
        userId: string,
        pageUrl: string,
        username: string,
        userEmail: string,
        feedback: string
    ) => {
        return axios.post(
            `${applicationUrl}/${ApiVersions.v1}/${RouterCategories.feedbacks}`,
            {
                userId,
                pageUrl,
                username,
                userEmail,
                feedback
            }
        );
    };

    const deleteOne = (feedbackId: string) => {
        return axios.delete(
            `${applicationUrl}/${ApiVersions.v1}/${RouterCategories.feedbacks}/${feedbackId}`
        );
    };

    return {
        create,
        deleteOne
    };
};
