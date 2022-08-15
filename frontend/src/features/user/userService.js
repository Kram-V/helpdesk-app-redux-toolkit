import axios from "axios";

const getUsers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get("/api/users/allUsers", config);

  return response.data;
};

const userService = {
  getUsers,
};

export default userService;
