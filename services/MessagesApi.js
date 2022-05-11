// 1
import { Axios } from "axios";

// 2
const axios = new Axios({
  baseURL: "http://localhost:1337/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// 3
const MessagesAPIService = {
  find: async () => {
    const response = await axios.get("/messages");
    return JSON.parse(response.data).data;
  },

  create: async ({ data }) => {
    const response = await axios.post(
      "/messages",
      JSON.stringify({ data: data })
    );
    return JSON.parse(response.data).data;
  },

  update: async ({ id, data }) => {
    const response = await axios.put(
      `/messages/${id}`,
      JSON.stringify({ data: data })
    );
    return JSON.parse(response.data).data;
  },

  delete: async ({ id }) => {
    const response = await axios.delete(`/messages/${id}`);
    return JSON.parse(response.data).data;
  },
};

// 4
export { MessagesAPIService };