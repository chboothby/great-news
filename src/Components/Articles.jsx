import React from "react";
import { getArticles } from "./api";
import ArticleCard from "./ArticleCard";
import Loading from "./Loading";

class Articles extends React.Component {
  state = {
    articles: [],
    isLoading: true,
  };
  componentDidMount() {
    const topic = this.props.topic_slug;
    console.log(topic);
    getArticles(topic).then((articles) => {
      console.log(articles);
      this.setState({ articles, isLoading: false });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const newTopic = prevProps.topic_slug !== this.props.topic_slug;
    if (newTopic) {
      getArticles(this.props.topic_slug).then((articles) => {
        this.setState({ articles });
      });
    }
  }
  render() {
    const { articles, isLoading } = this.state;
    if (isLoading) {
      return <Loading />;
    }
    return (
      <section className="main">
        <ul>
          {articles.map((article) => {
            return <ArticleCard key={article.article_id} article={article} />;
          })}
        </ul>
      </section>
    );
  }
}

export default Articles;
