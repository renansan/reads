import React from 'react'
import PropTypes from 'prop-types'
import shelfsList from './shelfs'

/**
 * ShelfSelector
 * A select to change the book's shelf
 *
 * This component must receive a function to handle select changes and the
 * current shelf of the book. The list of shelfs are taken from the shelfs.json.
 *
 * @param {Object} props
 */
const ShelfSelector = (props) => {
  return (
    <select onChange={props.handleChange} value={props.currentShelf || 'none'}>
      <option value="move" disabled>Move to...</option>
      {shelfsList.shelfs && shelfsList.shelfs.map((bookshelf, index) => (
        <option key={index} value={bookshelf.id}>{bookshelf.title}</option>
      ))}
      <option value="none">None</option>
    </select>
  )
}

ShelfSelector.propTypes = {
  handleChange: PropTypes.func.isRequired,
  currentShelf: PropTypes.string.isRequired,
}

export default ShelfSelector
