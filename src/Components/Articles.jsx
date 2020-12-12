import React from "react";
import { getArticles } from "../api";
import ArticleCard from "./ArticleCard";
import Loading from "./Loading";
import FilterArticles from "./FilterArticles";
import ErrorMessage from "./ErrorMessage";
import PageNav from "./PageNav";

class Articles extends React.Component {
  state = {
    articles: [],
    isLoading: true,
    hasError: false,
    errMessage: "",
    currentPage: 1,
    sort_by: "created_at",
    order: "asc",
    lastPage: false,
  };
  componentDidMount() {
    const topic = this.props.topic_slug;
    const { currentPage } = this.state.currentPage;
    getArticles(topic, null, null, currentPage)
      .then((articles) => {
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
    const {
      articles,
      isLoading,
      hasError,
      errMessage,
      currentPage,
      lastPage,
    } = this.state;
    const { topic_slug } = this.props;
    if (isLoading) {
      return <Loading items={"articles"} />;
    }
    if (hasError) {
      return <ErrorMessage errMessage={errMessage} />;
    }
    return (
      <section>
        <div className="articleBar">
          <div className="topic">
            {topic_slug ? <h2>{topic_slug}</h2> : <h2>All </h2>}
          </div>

          <FilterArticles filterArticles={this.filterArticles} />
        </div>

        <div className="popular"></div>
        <ul>
          {articles.map((article) => {
            return <ArticleCard key={article.article_id} article={article} />;
          })}
        </ul>

        <PageNav
          lastPage={lastPage}
          currentPage={currentPage}
          nextPage={this.nextPage}
        />
      </section>
    );
  }

  filterArticles = (filter) => {
    let { order, sort_by } = this.state;
    if (filter === "Oldest") {
      order = "desc";
      sort_by = "created_at";
    }
    if (filter === "Most popular") {
      sort_by = "votes";
      order = "desc";
    }
    if (filter === "Most recent") {
      order = "asc";
      sort_by = "created_at";
    }

    this.setState({ order, sort_by }, () => {
      getArticles(this.props.topic_slug, order, sort_by).then((articles) => {
        this.setState({ articles });
      });
    });
  };

  nextPage = (num) => {
    const { order, sort_by, currentPage } = this.state;
    window.scrollTo(0, 0);
    this.setState(
      ({ currentPage }) => {
        return {
          currentPage: currentPage + num,
        };
      },
      () => {
        getArticles(this.props.topic_slug, order, sort_by, currentPage + num)
          .then((articles) => {
            if (articles.length < 10) {
              this.setState({ lastPage: true, articles });
            } else this.setState({ articles, lastPage: false });
          })
          .catch((err) => {
            this.setState(({ currentPage }) => {
              return {
                lastPage: true,
                currentPage: currentPage - num,
              };
            });
          });
      }
    );
  };
}

export default Articles;
