import axios from "axios";
const newsApi = axios.create({
  baseURL: "https://backend-news-site.herokuapp.com/api",
});

export const getTopics = () => {
  return newsApi.get("/topics").then(({ data: { topics } }) => {
    return topics;
  });
};

export const getArticles = (topic) => {
  return newsApi
    .get("/articles", {
      params: {
        topic,
      },
    })
    .then(({ data: { articles } }) => {
      return articles;
    });
};

export const getPreview = (article_id) => {
  return newsApi
    .get(`/articles/${article_id}`)
    .then(({ data: { article } }) => {
      const preview = `${article.body.slice(0, 140)}...`;
      return preview;
    });
};

export const getArticleById = (article_id) => {
  return newsApi
    .get(`/articles/${article_id}`)
    .then(({ data: { article } }) => {
      return article;
    });
};

export const addVote = (article_id, votes) => {
  return newsApi.patch(`/articles/${article_id}`, { inc_votes: votes });
};

export const getArticleComments = (article_id, sort_by, order) => {
  return newsApi
    .get(`/articles/${article_id}/comments`, { params: { sort_by, order } })
    .then(({ data: { comments } }) => {
      return comments;
    });
};

export const addCommentVote = (comment_id, vote) => {
  return newsApi.patch(`/comments/${comment_id}`, { inc_votes: vote });
};
