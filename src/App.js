import React from 'react'
import BooksList from './BooksList'
import BookDetails from './BookDetails'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './BooksAPI'
import { Link, Route } from 'react-router-dom'
import Snackbar from 'node-snackbar'
import shelfsList from './shelfs'
import './App.css'
import './snackbar.min.css'

// TODO: Create new tests
// TODO: Add comments
// TODO: Check recommendations for better performance https://reactjs.org/docs/optimizing-performance.html
//

class BooksApp extends React.Component {
  state = {
    books: [],
    theme: 'light',
  }

  updateShelf = (book, event) => {
    const el = event.target;
    const shelf = {
      id: el.value,
      title: el[el.selectedIndex].textContent
    }
    const {id: bookId } = book;
    const books = this.state.books.map(book => {
      book.shelf = (bookId === book.id) ? shelf.id : book.shelf;
      return book;
    });
    this.setState({ books });

    // https://www.polonel.com/snackbar/
    Snackbar.show({
      text: `Moved <span class="snackbar-book-title">${book.title}</span> to <span class="snackbar-book-shelf">${shelf.title}</span> shelf.`,
      duration: 3000,
      pos: 'bottom-right',
      showAction: false,
    });

    BooksAPI.update(book, shelf.id).then(books => {
      this.updateBooks();
    });
  }

  updateBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    });
  }

  componentDidMount() {
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
