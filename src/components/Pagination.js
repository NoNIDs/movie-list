import React, { Component } from "react";

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      startPagPage: 1
    };
  }

  genPageList = (startPagPage, pageLimit) => {
    let arrPageList = [];
    for(let i = startPagPage, count = 0; count <= pageLimit; i++) {
      arrPageList.push(i);
    }
    return [...arrPageList]
  }

  handleChange = (page, event) => {
    event.preventDefault();
    this.props.onChangePage(page);
    this.setState({
      currentPage: page,
    })
    
  }

  render() {
    const {pageLimit} = this.props;
    const {currentPage, startPagPage} = this.state;
    const pages = this.genPageList(startPagPage, pageLimit);
    return (
      <ul className='pag_container'>
        {pages.map((page, index) => {
          return (<li key={index} className={`pag_item${
            currentPage === page ? " pag_active" : ""
          }`} onClick={event => this.handleChange(page, event)}>{page}</li>)
        })}
      </ul>
    );
  }
};

export default Pagination;
