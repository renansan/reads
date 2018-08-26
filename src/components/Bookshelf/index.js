import React, { Component } from 'react'
import BookSnippet from '../BookSnippet'
import Loading from '../Loading'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'

/**
 * A shelf of books
 * List all books marked with a determined shelf
 */
class Bookshelf extends Component {
  state = {
    dragCounter: 0,
    dragOffset: {},
    dragClone: {},
    dragElement: '',
  }

  // Called when a bookshelf item starts to drag
  dragStart = (event, book) => {
    const el = event.currentTarget;
    el.style.opacity = '.4';
    // stores book data
    event.dataTransfer.setData("text/plain", JSON.stringify(book));
    // reset drag counter
    this.setState({ dragCounter: 0 });
    // set shelf item to dragElement variable
    this.setState({ dragElement: el });
  }

  // Called when dragged item is over a droppable element
  dragOver = (event) => {
    event.preventDefault();
  }

  // Called when dragged item enter over a droppable element
  dragEnter = (event) => {
    event.preventDefault();
    event.currentTarget.classList.add('has-drag-over');
    this.setState({ dragCounter: this.state.dragCounter + 1 })
  }

  // Called when dragged item leaves over a droppable element
  dragLeave = (event) => {
    const target = event.currentTarget;
    event.preventDefault();
    this.setState({ dragCounter: this.state.dragCounter - 1 }, () => {
      if (!this.state.dragCounter) {
        target.classList.remove('has-drag-over');
      }
    })
  }

  // Called when item dragging stops
  dragEnd = (event) => {
    if (this.state.dragElement) {
      this.setState(({ dragElement }) => {
        dragElement.style.opacity = '';
        return {
          dragElement: dragElement,
        }
      });
    };
    event.currentTarget.classList.remove('has-drag-over');
  }

  // Called when item's dropped in a droppable element
  drop = (event) => {
    const data = event.dataTransfer.getData("text/plain");
    const book = (data) ? JSON.parse(data) : '';
    const shelf = {
      id: this.props.id,
      title: this.props.title
    }

    if (this.state.dragElement) {
      this.setState(({ dragElement }) => {
        dragElement.style.opacity = '';
        return {
          dragElement: dragElement,
        }
      });
    }

    event.currentTarget.classList.remove('has-drag-over');

    if (book && book.shelf !== shelf.id) this.props.updateShelf(book, shelf);
  }

  render() {
    // Filter books received from this.props (all books) to show only
    // those listed in the current shelf
    const books = (this.props.books) ? this.props.books.filter(book => book.shelf === this.props.id) : '';
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title} - <span className="bookshelf-title-count">{books.length} books</span></h2>
        <div className="bookshelf-books">
          {!Array.isArray(books) ? (
              <Loading />
          ) : !books.length ? (
            <span>No books</span>
          ) : (
            <ol
              className="books-grid is-droppable"
              onDragEnd={this.dragEnd}
              onDragEnter={this.dragEnter}
              onDragOver={this.dragOver}
              onDragLeave={this.dragLeave}
              onDrop={this.drop}>
              {books && books.sort(sortBy('title')).map((book, index) => (
                <BookSnippet
                  key={index}
                  details={book}
                  shelfs={this.props.shelfs}
                  updateShelf={this.props.updateShelf}
                  draggable={this.dragStart}
                  />
              ))}
            </ol>
          )}
        </div>
      </div>
    )
  }
}

Bookshelf.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  // books not required since PropTypes not allow check for null
  // https://github.com/facebook/react/issues/3163#issuecomment-292669149
  books: PropTypes.array,
  shelfs: PropTypes.array.isRequired,
  updateShelf: PropTypes.func.isRequired,
}

export default Bookshelf
