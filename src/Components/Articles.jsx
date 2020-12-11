import React from "react";
import { getArticles } from "../api";
import ArticleCard from "./ArticleCard";
import Loading from "./Loading";
import FilterArticles from "./FilterArticles";
import ErrorMessage from "./ErrorMessage";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

class Articles extends React.Component {
  state = {
    articles: [],
    isLoading: true,
    hasError: false,
    errMessage: "",
    currentPage: 1,
    sort_by: "created_at",
    order: "desc",
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
        <div className="topic">
          {topic_slug ? <h2>{topic_slug}</h2> : <h2>All </h2>}
        </div>

        <FilterArticles filterArticles={this.filterArticles} />
        <div className="popular"></div>
        <ul>
          {articles.map((article) => {
            return <ArticleCard key={article.article_id} article={article} />;
          })}
        </ul>

        {currentPage === 1 ? (
          <div className="pages">
            <button
              onClick={() => {
                this.nextPage(1);
              }}
            >
              <FaArrowRight />
            </button>
          </div>
        ) : lastPage ? (
          <div className="pages">
            {" "}
            <button
              onClick={() => {
                this.nextPage(-1);
              }}
            >
              <FaArrowLeft />
            </button>
          </div>
        ) : (
          <div className="pages">
            {" "}
            <button
              onClick={() => {
                this.nextPage(-1);
              }}
            >
              <FaArrowLeft />
            </button>
            <button
              onClick={() => {
                this.nextPage(1);
              }}
            >
              <FaArrowRight />
            </button>
          </div>
        )}
      </section>
    );
  }

  filterArticles = (filter) => {
    let { order, sort_by } = this.state;
    if (filter === "Oldest") {
      order = "asc";
      sort_by = "created_at";
    }
    if (filter === "Most popular") {
      sort_by = "votes";
      order = "desc";
    }
    if (filter === "Most recent") {
      order = "desc";
      sort_by = "created_at";
    }

    this.setState({ order, sort_by }, () => {
      getArticles(this.props.topic_slug, order, sort_by).then((articles) => {
        this.setState({ articles });
      });
    });
  };

  nextPage = (num) => {
    window.scrollTo(0, 0);
    const { order, sort_by, currentPage } = this.state;
    this.setState(({ currentPage }) => {
      return {
        currentPage: currentPage + num,
      };
    });
    getArticles(this.props.topic_slug, order, sort_by, currentPage + num)
      .then((articles) => {
        if (articles.length < 10) {
          this.setState({ lastPage: true });
        }
        this.setState({ articles, lastPage: false });
      })
      .catch((err) => {
        console.log(err);
        this.setState(({ currentPage }) => {
          return {
            lastPage: true,
            currentPage: currentPage - num,
          };
        });
      });
  };
}

export default Articles;
