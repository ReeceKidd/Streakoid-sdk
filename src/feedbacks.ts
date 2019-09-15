import ApiVersions from "./ApiVersions";
import RouterCategories from "./RouterCategories";
import Feedback from "./models/Feedback";
import { AxiosInstance } from "axios";

export default (streakoidClient: AxiosInstance) => {
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
    const { data } = await streakoidClient.post(
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
    return streakoidClient.delete(
      `/${ApiVersions.v1}/${RouterCategories.feedbacks}/${feedbackId}`
    );
  };

  return {
    create,
    deleteOne
  };
};
