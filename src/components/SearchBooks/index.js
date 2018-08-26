import React, { Component } from 'react'
import BookSnippet from '../BookSnippet'
import * as BooksAPI from '../../api/BooksAPI'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Loading from '../Loading'
// import Cookies from 'js-cookie'

/**
 * SearchBooks
 * Search for books in API
 *
 * @extends Component
 */
class SearchBooks extends Component {

  state = {
    query: '',
    books: '',
    loading: false
  }

  debounce = (fn, time) => {
    let timeout;
    const output = () => {
      const functionCall = () => fn.apply(this, arguments);

      clearTimeout(timeout);
      timeout = setTimeout(functionCall, time);
    }
    return output();
  }

  // Update search query
  updateQuery = (query) => {

    if (query === this.state.query) {
      debugger;
      return
    };

    // set new query and add loading
    this.setState({
      query,
      loading: true
    })

    // If query's not empty
    if (query.length) {


      this.debounce(() => {

        // Set the new query and list of books in Local Storage to avoid lose
        // query when leaves the page (e.g. book details page) and come back or
        // localStorage.setItem('currentQuery', JSON.stringify({query, books: this.state.books}));

        // Search books in API
        BooksAPI.search(query).then((books) => {
          // check if current state query's not empty and equal to query
          // Obs: It's useful to avoid problems related to typing faster, like show
          // books from one query when another one is stored in state
          if (this.state.query.length && this.state.query === query) {

            // Set current state query and list of books returned by API in Local Storage
            // to avoid lose query when leaves the page (e.g. book details page) and come back
            localStorage.setItem('currentQuery', JSON.stringify({query: this.state.query, books}));

            // Set returned books and remove loading state
            this.setState({
              loading: false,
              books: books || []
            })
          }
        });
      }, 500)

    // If query's empty
    } else {
      // remove query and books from Local Storage
      localStorage.removeItem('currentQuery');

      // reset all states
      this.setState({
        query: '',
        loading: false,
        books: []
      })
    }
  }

  componentDidMount() {
    // Check and load an existent key from Local Storage if there's
    const queryCookie = localStorage.getItem('currentQuery');
    if (queryCookie) {
      this.setState({
        query: JSON.parse(queryCookie).query,
        books: JSON.parse(queryCookie).books
      })
    }

    // Set focus to search input on app load
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
