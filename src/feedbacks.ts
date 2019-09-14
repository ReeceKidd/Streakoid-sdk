import axios from "axios";
import ApiVersions from "./ApiVersions";
import RouterCategories from "./RouterCategories";
import Feedback from "./models/Feedback";

export default (applicationUrl: string) => {
  const create = async ({
    userId,
    pageUrl,
    username,
    userEmail,
    feedbackText
  }: {
    userId: string;
    pageUrl: string;
    username: string;
    userEmail: string;
    feedbackText: string;
  }): Promise<Feedback> => {
    const { data } = await axios.post(
      `${applicationUrl}/${ApiVersions.v1}/${RouterCategories.feedbacks}`,
      {
        userId,
        pageUrl,
        username,
        userEmail,
        feedbackText
      }
    );
    return data;
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
