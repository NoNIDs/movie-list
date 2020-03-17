import React from "react";

const MovieTabs = props => {
  const { sort_by, updateSortBy } = props;

  const handleClick = value => () => {
    updateSortBy(value);
  };
  
  const getClassLink = value => {
      return `nav-link ${
        sort_by === value ? "active" : ""
      }`
  }
  return (
    <ul className="tabs nav nav-pills">
      <li className="nav-item">
        <div
          className={getClassLink("popularity.desc")}
          onclick={handleClick("popularity.desc")}
        >
          Popularity desc
        </div>
      </li>
      <li className="nav-item">
        <div
          className={getClassLink("revenue.desc")}
          onclick={handleClick("revenue.desc")}
        >
          Revenue desc
        </div>
      </li>
      <li className="nav-item">
        <div
          className={getClassLink("vote_avetage.desc")}
          onclick={handleClick("vote_avetage.desc")}
        >
          Vote avetage desc
        </div>
      </li>
    </ul>
  );
};

export default MovieTabs;
