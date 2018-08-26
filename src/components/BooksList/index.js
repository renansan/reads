import React from 'react'
import Bookshelf from '../Bookshelf'
import PropTypes from 'prop-types'

/**
 * List the bookshelfs
 * @param {Object} props
 */
const BooksList = ({shelfs, books, updateShelf}) => {
  return (
    <div className="list-books">
      <div className="list-books-content">
        <div>
          {shelfs && shelfs.map((shelf, index) => (
            <Bookshelf
              key={index}
              id={shelf.id}
              title={shelf.title}
              shelfs={shelfs}
              books={books}
              updateShelf={updateShelf}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

BooksList.propTypes = {
  // books not required since PropTypes not allow check for null
  // https://github.com/facebook/react/issues/3163#issuecomment-292669149
  books: PropTypes.array,
  shelfs: PropTypes.array.isRequired,
  updateShelf: PropTypes.func.isRequired,
}

export default BooksList
