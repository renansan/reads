import React from 'react'
import BookSnippet from './BookSnippet'
import Loading from './Loading'
import PropTypes from 'prop-types'
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
              <BookSnippet
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

Bookshelf.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  shelfs: PropTypes.array.isRequired,
  updateShelf: PropTypes.func.isRequired,
}

export default Bookshelf
