import React from 'react'
import Bookshelf from './Bookshelf'
import PropTypes from 'prop-types'

/**
 * List the bookshelfs
 * @param {Object} props
 */
const BooksList = (props) => {
  return (
    <div className="list-books">
      <div className="list-books-content">
        <div>
          {props.shelfs && props.shelfs.map((shelf, index) => (
            <Bookshelf
              key={index}
              id={shelf.id}
              title={shelf.title}
              shelfs={props.shelfs}
              books={props.books}
              updateShelf={props.updateShelf}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

BooksList.propTypes = {
  books: PropTypes.array.isRequired,
  shelfs: PropTypes.array.isRequired,
  updateShelf: PropTypes.func.isRequired,
}

export default BooksList
