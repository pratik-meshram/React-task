import axiosInstance from "../../utils/axiosInstance";

export const getQuestions = async () => {
  const response = await axiosInstance.get(
    "/question"
  );
  return response.data;
};