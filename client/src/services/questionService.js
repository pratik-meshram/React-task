// services/questionService.js

import axios from "axios";

const API = "http://localhost:5000/api";

export const getQuestions = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    `${API}/questions`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};