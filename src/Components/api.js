import axios from "axios";
const newsApi = axios.create({
  baseURL: "https://backend-news-site.herokuapp.com/api",
});
export const getTopics = () => {
  return newsApi.get("/topics").then(({ data: { topics } }) => {
    return topics;
  });
};
