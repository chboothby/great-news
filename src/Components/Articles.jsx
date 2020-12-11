import React from "react";
import { getArticles } from "./api";
import ArticleCard from "./ArticleCard";
import Loading from "./Loading";
import FilterArticles from "./FilterArticles";
import ErrorMessage from "./ErrorMessage";

class Articles extends React.Component {
  state = {
    articles: [],
    isLoading: true,
    hasError: false,
    errMessage: "",
  };
  componentDidMount() {
    const topic = this.props.topic_slug;

    console.log(topic);
    getArticles(topic)
      .then((articles) => {
        console.log(articles);
        this.setState({ articles, isLoading: false });
      })
      .catch(({ response: { status, statusText } }) => {
        this.setState({
          isLoading: false,
          hasError: true,
          errMessage: `${status}: ${statusText}`,
        });
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
    const { articles, isLoading, hasError, errMessage } = this.state;
    if (isLoading) {
      return <Loading items={"articles"} />;
    }
    if (hasError) {
      return <ErrorMessage errMessage={errMessage} />;
    }
    return (
      <section className="main">
        <FilterArticles filterArticles={this.filterArticles} />
        <div className="popular"></div>
        <ul>
          {articles.map((article) => {
            return <ArticleCard key={article.article_id} article={article} />;
          })}
        </ul>
      </section>
    );
  }

  filterArticles = (filter) => {
    let order = "desc";
    let sort_by = "created_at";
    if (filter === "Oldest") {
      order = "asc";
    }
    if (filter === "Most popular") {
      sort_by = "votes";
    }
    getArticles(this.props.topic_slug, order, sort_by).then((articles) => {
      this.setState({ articles });
    });
  };
}

export default Articles;
