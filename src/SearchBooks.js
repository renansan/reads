import React, { Component } from 'react'
import BookSnippet from './BookSnippet'
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
    const booksLength = this.state.books.length;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
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
          {!!booksLength && (
            <h2 className="search-books-title">
              Showing&nbsp;
              <span className="search-books-count">
                {booksLength && booksLength === 1 ? ('1 result ') : (
                  `${booksLength} results `
                )}
              </span>
              for {'"'}<span className="search-books-term">{this.state.query}</span>{'"'}
            </h2>
          )}
          {this.state.loading && (
              <Loading />
          )}
          <ol className="books-grid">
            {!!booksLength && this.state.books.map((book, index) => (
              <BookSnippet
                key={index}
                details={book}
                shelfs={this.props.shelfs}
                updateShelf={this.props.updateShelf}
              />
            ))}
          </ol>
          {!booksLength && !this.state.loading && this.state.query && (
            <h2 className="search-books-title">
              No results found for {'"'}<span className="search-books-term">{this.state.query}</span>{'"'}
            </h2>
          )}
        </div>
      </div>
    )
  }
}

SearchBooks.propTypes = {
  shelfs: PropTypes.array.isRequired,
  updateShelf: PropTypes.func.isRequired,
}

export default SearchBooks
