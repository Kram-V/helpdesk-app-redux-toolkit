import axios from "axios";

const createRefund = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post("/api/refunds/create", data, config);

  return response.data;
};

const getRefunds = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get("/api/refunds", config);

  return response.data;
};

const getRefund = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`/api/refunds/${id}`, config);

  return response.data;
};

const closeRefund = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    `/api/refunds/${id}`,
    { status: "refunded" },
    config
  );

  return response.data;
};

const refundService = {
  createRefund,
  getRefunds,
  getRefund,
  closeRefund,
};

export default refundService;
