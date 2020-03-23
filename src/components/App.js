import React, { Component } from "react";
import MovieItem from "./MovieItem";
import MovieTabs from "./MovieTabs";
import { API_URL, API_KEY_3 } from "../utils/api";
import Pagination from "./Pagination";

class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      moviesWillWatch: [],
      sort_by: "popularity.desc",
      currentPage: 1,
      totalPages: 5,
      pageLimit: 5
    };
  }

  componentDidMount() {
    this.getMovies();
  };

  componentDidUpdate(prevProps, prevState) {
    if(prevState.sort_by !== this.state.sort_by || prevState.currentPage !== this.state.currentPage) {
      this.getMovies();
    }
  };

  getMovies = () => {
    fetch(
      `${API_URL}/discover/movie?api_key=${API_KEY_3}&page=${this.state.currentPage}&sort_by=${this.state.sort_by}`
    )
      .then(response => {
        console.log("then", response);
        return response.json();
      })
      .then(data => {
        console.log("data_server", data);
        this.setState({
          movies: data.results.filter(m => m),
          totalPages: data.total_pages
        });
      });
  }

  onChangePage = page => {
    this.setState({
      currentPage: page,
    })
  }

  removeMovie = id => {
    const { movies } = this.state;
    this.setState({
      movies: movies.filter(movie => {
        return movie.id !== id;
      })
    });
  };

  addWillWatchMovie = movie => {
    const { moviesWillWatch } = this.state;
    this.setState({
      moviesWillWatch: [...moviesWillWatch, movie]
    });
  };

  removeWillWatchMovie = id => {
    const { moviesWillWatch } = this.state;
    this.setState({
      moviesWillWatch: moviesWillWatch.filter(movie => {
        return movie.id !== id;
      })
    });
  };

  updateSortBy = value => {
    this.setState({
      sort_by: valueя
    });
  };

  render() {
    console.log("Data", this.state);
    const { movies, moviesWillWatch, sort_by, pageLimit } = this.state;
    const count = moviesWillWatch.length;
    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-9">
            <div className="row mb-4">
              <div className="col-12">
                <MovieTabs
                  sort_by={sort_by}
                  updateSortBy={this.updateSortBy}
                ></MovieTabs>
              </div>
              {movies.map(movie => {
                return (
                  <div className="col-6 mb-4" key={movie.id}>
                    <MovieItem
                      movie={movie}
                      removeMovie={this.removeMovie}
                      addWillWatchMovie={this.addWillWatchMovie}
                      removeWillWatchMovie={this.removeWillWatchMovie}
                    ></MovieItem>
                  </div>
                );
              })}
            </div>
            <Pagination pageLimit={pageLimit} onChangePage={this.onChangePage}></Pagination>
          </div>
          <div className="col-3">
            <p className="willWatch_title">Will watch: {count}</p>
            {moviesWillWatch.map(movie => {
              return <p className="willWatch_item">{movie.title}</p>;
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
