import api from "./axiosInstance";

const fetchCurrentUser = async () => {
  try {
    const response = await api.get("/users/current-user");

    if (response.data.success) {
      return response.data;
    }

  } catch (error) {
    throw error;
  }
};

export default fetchCurrentUser;
