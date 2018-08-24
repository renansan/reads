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
  //handle changes on ShelfSelector
  const handleChange = (event) => {
    // Set el from event target and shelf ID and title in an object
    const el = event.target;
    const shelf = {
      id: el.value,
      title: el[el.selectedIndex].textContent
    }
    props.handleChange(shelf, event);
  }
  return (
    <select onChange={handleChange} value={props.currentShelf || 'none'}>
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
