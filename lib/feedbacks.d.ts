import { Feedback } from "./models/Feedback";
declare const _default: (
  applicationUrl: string
) => {
  create: ({
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
  }) => Promise<Feedback>;
  deleteOne: (
    feedbackId: string
  ) => Promise<import("axios").AxiosResponse<any>>;
};
export default _default;
//# sourceMappingURL=feedbacks.d.ts.map
