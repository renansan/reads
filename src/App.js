import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'
import Snackbar from 'node-snackbar'
import * as BooksAPI from './api/BooksAPI'
import BookDetails from './components/BookDetails'
import BooksList from './components/BooksList'
import SearchBooks from './components/SearchBooks'
import shelfsList from './shelfs'
import './css/App.css'
import './css/snackbar.min.css'

// TODO: Styling ShelfSelector in BookDetails
// TODO: Check recommendations for better performance https://reactjs.org/docs/optimizing-performance.html
// TODO: Add drag and drop to shelfs
// TODO: Highlight in search results page the books that have a shelf defined
// TODO: Create new tests

/**
 * BooksApp
 * @extends React
 */
class BooksApp extends Component {
  state = {
    books: null,
    theme: 'light',
  }

  /**
   * Update Shelf
   * @param  {Object} book  The book data
   * @param  {Object} event An event from a ShelfSelector
   */
  updateShelf = (book, shelf) => {
    // Get the ID from book
    const {id: bookId } = book;
    // Get the title from previousShelf (the one before update)
    let previousShelfTitle = '';
    // Loop for books in state to change the book shelf
    this.setState(({ books }) => {
      return {
        books: books.map(book => {
          if (bookId === book.id) {
            previousShelfTitle = book.shelf;
            book.shelf = shelf.id;
          }
          return book;
        })
      }
    }, () => {
      // Show Snackbar to report the book shelf change
      this.showSnackbar(book.title, shelf.title, previousShelfTitle)

      // Update book shelf on API
      BooksAPI.update(book, shelf.id).then(books => {
        this.updateBooks();
      });
    });

  }

  /**
   * Show a snackbar for change reports
   * @link https://www.polonel.com/snackbar/
   *
   * @param  {String} bookTitle          the book title
   * @param  {String} shelfTitle         the current/new shelf title
   * @param  {String} previousShelfTitle the previous shelf title
   */
  showSnackbar = (bookTitle, shelfTitle, previousShelfTitle) => {
    // set text content based on shelf
    const action = (shelfTitle === 'None') ? 'Removed' : 'Moved';
    const preposition = (shelfTitle === 'None') ? 'from' : 'to';
    const shelf = (shelfTitle === 'None') ? previousShelfTitle : shelfTitle;
    const text = `
      ${action} <span class="snackbar-book-title">${bookTitle}</span>
      ${preposition} <span class="snackbar-book-shelf">${shelf}</span> shelf.
    `;

    // Show snackbar
    Snackbar.show({
      text,
      duration: 3000,
      pos: 'bottom-right',
      showAction: false,
    });
  }

  /**
   * Update books in state from API data
   */
  updateBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    });
  }

  componentDidMount() {
    // Update books on app load
    this.updateBooks();
  }

  render() {
    return (
      <div className={`app theme-${(this.state.theme)}`}>
        <div className="list-books-title">
          <h1><Link to="/">MyReads</Link></h1>
          <div className="open-search">
            <Link to="/search">Add a book</Link>
          </div>
        </div>
        <Route path='/search' state='' render={() => (
          <SearchBooks
            shelfs={shelfsList.shelfs}
            updateShelf={this.updateShelf}
          />
        )}/>
        <Route exact path='/' render={() => (
          <BooksList
            shelfs={shelfsList.shelfs}
            books={this.state.books}
            updateShelf={this.updateShelf}
          />
        )}/>
        <Route exact path='/book/:book' render={(props) => (
          <BookDetails
            updateShelf={this.updateShelf}
            {...props}
            />
        )}/>
      </div>
    )
  }
}

export default BooksApp
