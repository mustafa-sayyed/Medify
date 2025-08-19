import axios from "axios";

const fetchCurrentUser = async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get("/users/current-user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.success) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export default fetchCurrentUser;
