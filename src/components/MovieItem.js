import React, { Component } from "react";

class MovieItem extends Component {
  constructor() {
    super();
    this.state = {
      willWatch: false
    };
  }
  render() {
    const { movie, removeMovie, addWillWatchMovie, removeWillWatchMovie } = this.props;
    return (
      <div className="card">
        <img
          className="card-img-top"
          src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path ||
            movie.poster_path}`}
          alt=""
        ></img>
        <div className="card-body">
          <h6 className="card-title">{movie.title}</h6>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <p className="mb-0">Rating: {movie.vote_average}</p>
          {this.state.willWatch ? (
            <button
              type="button"
              className="btn btn-success"
              onClick={()=> {
                this.setState({
                  willWatch: false,
                });
                removeWillWatchMovie(movie.id);
              }}
            >
              Remove Will Watch
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={()=> {
                this.setState({
                  willWatch: true,
                });
                addWillWatchMovie(movie);
              }}
            >
              Add Will Watch
            </button>
          )}
        </div>
        <button className='del_btn' onClick={removeMovie.bind(null, movie.id)}>Delete movie</button>
      </div>
    );
  }
}

export default MovieItem;
