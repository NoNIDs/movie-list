import React, { Component } from "react";

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1
    };
  }

  genPageList = totalPages => {
    let arrPageList = [];
    for(let i = 1; i <= totalPages; i++) {
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
    const {totalPages} = this.props;
    const {currentPage} = this.state;
    const pages = this.genPageList(totalPages);
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
