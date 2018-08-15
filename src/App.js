import React from 'react'
// import BookDetails from './BookDetails'
import Bookshelf from './Bookshelf'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './BooksAPI'
import { Link, Route } from 'react-router-dom'
import Snackbar from 'node-snackbar'
import './App.css'
import './snackbar.min.css'

// TODO: BookPage must be called BookDetails
// TODO: BookDetails must be called BookSnippet or BookBrief
// TODO: Style of BookPage
// TODO: Allow rating books
// TODO: Check recommendations for better performance https://reactjs.org/docs/optimizing-performance.html
//

class BookPage extends React.Component {
  state = {
    book: '',
  }

  componentDidMount() {
    // const bookId = this.props.location.hash.replace('#', '');
    // const bookId = this.props.location.state.bookId;
    const bookId = this.props.location.search.replace('?id=', '');
    if (bookId) {
      BooksAPI.get(bookId).then(book => {
        this.setState({ book });
      });
    }
  }

  render() {
    const details = this.state.book;
    return (
      <div>
        <dl>
          {Object.keys(details).map((key, index) => {
            return typeof details[key] === 'string' && (
              <div key={index}>
                <dt>{key}</dt>
                <dd>{details[key]}</dd>
              </div>
            )
          })}
        </dl>
      </div>
    )
  }
}

class BooksApp extends React.Component {
  state = {
    books: '',
    shelfs: [
      {
        id: "currentlyReading",
        title: "Currently Reading"
      },
      {
        id: "wantToRead",
        title: "Want to Read"
      },
      {
        id: "read",
        title: "Read"
      }
    ],
    theme: 'light',
  }

  updateShelf = (book, shelf) => {
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
      pos: 'top-right',
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
        <Route path='/search' state='' render={() => (
          <SearchBooks
            shelfs={this.state.shelfs}
            updateShelf={this.updateShelf}
          />
        )}/>
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {this.state.shelfs && this.state.shelfs.map((shelf, index) => (
                  <Bookshelf
                    key={index}
                    id={shelf.id}
                    title={shelf.title}
                    shelfs={this.state.shelfs}
                    books={this.state.books}
                    updateShelf={this.updateShelf}
                  />
                ))}
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )}/>
        <Route exact path='/book/:book' render={(props) => (
          <BookPage {...props} />
        )}/>
      </div>
    )
  }
}

export default BooksApp
