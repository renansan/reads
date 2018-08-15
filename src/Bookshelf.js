import React from 'react'
import BookDetails from './BookDetails'
import Loading from './Loading'
import * as BooksAPI from './BooksAPI'
import sortBy from 'sort-by'

const Bookshelf = (props) => {
  const books = (props.books) ? props.books.filter(book => book.shelf === props.id) : '';
  // debugger;
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.title} - <span className="bookshelf-title-count">{books.length} books</span></h2>
      <div className="bookshelf-books">
        {!Array.isArray(books) ? (
            <Loading />
        ) : !books.length ? (
          <span>No books</span>
        ) : (
          <ol className="books-grid">
            {books && books.sort(sortBy('name')).map((book, index) => (
              <BookDetails
                key={index}
                details={book}
                shelfs={props.shelfs}
                updateShelf={props.updateShelf}
                />
            ))}
          </ol>
        )}
      </div>
    </div>
  )
}

export default Bookshelf
