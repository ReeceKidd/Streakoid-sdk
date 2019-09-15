import ApiVersions from "./ApiVersions";
import RouterCategories from "./RouterCategories";
import Feedback from "./models/Feedback";
import axiosClient from "./axiosClient";

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
    const { data } = await axiosClient.post(
      `/${ApiVersions.v1}/${RouterCategories.feedbacks}`,
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
    return axiosClient.delete(
      `/${ApiVersions.v1}/${RouterCategories.feedbacks}/${feedbackId}`
    );
  };

  return {
    create,
    deleteOne
  };
};
