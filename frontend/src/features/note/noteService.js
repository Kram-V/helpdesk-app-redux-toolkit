import axios from "axios";

const getNotes = async (refundId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`/api/refunds/${refundId}/notes`, config);

  return response.data;
};

const createNote = async (refundId, text, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    `/api/refunds/${refundId}/notes`,
    { text },
    config
  );

  return response.data;
};

const noteService = {
  getNotes,
  createNote,
};

export default noteService;
