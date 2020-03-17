import React, { Component } from "react";
import MovieItem from "./MovieItem";
import MovieTabs from "./MovieTabs";
import { API_URL, API_KEY_3 } from "../utils/api";

class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      moviesWillWatch: [],
      sort_by: "popularity.desc"
    };
  }

  componentDidMount() {
    fetch(
      `${API_URL}/discover/movie?api_key=${API_KEY_3}&sort_by=${this.state.sort_by}`
    )
      .then(response => {
        console.log("then", response);
        return response.json();
      })
      .then(data => {
        this.setState({
          movies: data.results
        });
      });
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
      sort_by: value
    });
  };

  render() {
    console.log("Data", this.state);
    const { movies, moviesWillWatch, sort_by } = this.state;
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
          </div>
          <div className="col-3">
            <p className="willwatch_title">Will watch: {count}</p>
            {moviesWillWatch.map(movie => {
              return <p className="willwatch_item">{movie.title}</p>;
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
