import React, { Component } from 'react'
import BookDetails from './BookDetails'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Loading from './Loading'
// import Cookies from 'js-cookie'

class SearchBooks extends Component {

  state = {
    query: '',
    books: '',
    loading: false
  }

  updateQuery = (query) => {
    this.setState({
      query,
      loading: true
    })
    if (query.length) {
      localStorage.setItem('currentQuery', JSON.stringify({query, books: this.state.books}));
      BooksAPI.search(query).then((books) => {
        if (this.state.query.length) {
          localStorage.setItem('currentQuery', JSON.stringify({query: this.state.query, books}));
          this.setState({
            loading: false,
            books: books || []
          })
        }
      });
    } else {
      localStorage.removeItem('currentQuery');
      this.setState({
        query: '',
        loading: false,
        books: []
      })
    }
  }

  componentDidMount() {
    const queryCookie = localStorage.getItem('currentQuery');
    if (queryCookie) {
      this.setState({
        query: JSON.parse(queryCookie).query,
        books: JSON.parse(queryCookie).books
      })
    }
    // Set focus to search input on page load
    this.nameInput.focus();
  }

  render () {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              ref={(input) => { this.nameInput = input; }}
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          {!!this.state.books.length && (
            <h2 className="search-books-title">
              Showing <span className="search-books-count">{this.state.books.length && (
                  this.state.books.length === 1 && '1 results '
              ) || (
                `${this.state.books.length} results `
              )}</span>
              for {'"'}<span className="search-books-term">{this.state.query}</span>{'"'}
            </h2>
          )}
          {this.state.loading && (
              <Loading />
          )}
          <ol className="books-grid">
            {!!this.state.books.length && this.state.books.map((book, index) => (
              <BookDetails
                key={index}
                details={book}
                shelfs={this.props.shelfs}
                updateShelf={this.props.updateShelf}
              />
            ))}
          </ol>
          {!this.state.books.length && !this.state.loading && this.state.query && (
            <h2 className="search-books-title">
              No results found for <span className="search-books-term">{this.state.query}</span>{'"'}
            </h2>
          )}
        </div>
      </div>
    )
  }
}

export default SearchBooks
