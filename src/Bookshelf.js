import React from 'react'
import BookSnippet from './BookSnippet'
import Loading from './Loading'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'

/**
 * A shelf of books
 * List all books marked with a determined shelf
 *
 * @param {Object} props
 */
const Bookshelf = (props) => {
  let dragCounter = 0;
  let dragOffset = {};
  let dragClone = {};
  let dragElement = '';

  const dragging = (event) => {
    // Should simulate a "move" effect, but has problems
    // var x;
    // var y;
    // x = event.clientX - dragOffset.x;
    // y = event.clientY - dragOffset.y;
    //
    // dragElement.style.left = x + 'px';
    // dragElement.style.top = y + 'px';
    //
    // console.log(dragCounter);
  }

  const dragStart = (event, book) => {
    event.dataTransfer.setData("text/plain", JSON.stringify(book));
    dragCounter = 0;

    dragElement = event.currentTarget;
    dragElement.style.opacity = '.4';

    // Should simulate a "move" effect, but has problems
    // dragOffset = {
    //   x: event.clientX - dragElement.offsetLeft,
    //   y: event.clientY - dragElement.offsetTop,
    // }
    // dragElement.style.left = event.currentTarget.offsetLeft + 'px';
    // dragElement.style.top = event.currentTarget.offsetTop + 'px';
    // dragElement.style.position = 'fixed';
    // dragElement.style.zIndex = 10;
    // dragElement.style.backgroundColor = 'white';
    // event.dataTransfer.setDragImage(document.createElement('span'), 0, 0);
  }

  const dragOver = (event) => {
    event.preventDefault();
    // event.currentTarget.classList.add('has-drag-over');
    // dragCounter++;
  }

  const dragEnter = (event) => {
    event.preventDefault();
    event.currentTarget.classList.add('has-drag-over');
    dragCounter++;
  }

  const dragLeave = (event) => {
    event.preventDefault();
    dragCounter--;
    if (!dragCounter) {
      event.currentTarget.classList.remove('has-drag-over');
    }
  }

  const dragEnd = (event) => {
    // Should simulate a "move" effect, but has problems
    // event.preventDefault();
    // dragElement.style.position = '';
    // dragElement.style.backgroundColor = '';
    // dragElement.style.zIndex = '';
    // dragElement.style.left = '',
    // dragElement.style.top = '',
    // dragOffset = {};
    // dragCounter = 0;
    // dragClone.remove();

    dragElement.style.opacity = '';
    event.currentTarget.classList.remove('has-drag-over');
  }

  const drop = (event) => {
    // event.preventDefault();
    const data = event.dataTransfer.getData("text/plain");
    const book = (book) ? JSON.parse(data) : '';
    const shelf = {
      id: props.id,
      title: props.title
    }

    event.currentTarget.classList.remove('has-drag-over');

    if (book && book.shelf !== shelf.id) props.updateShelf(book, shelf);
  }

  // Filter books received from props (all books) to show only
  // those listed in the current shelf
  const books = (props.books) ? props.books.filter(book => book.shelf === props.id) : '';
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.title} - <span className="bookshelf-title-count">{books.length} books</span></h2>
      <div className="bookshelf-books">
        {!Array.isArray(books) ? (
            <Loading />
        ) : !books.length ? (
          <span>No books</span>
        ) : (
          <ol className="books-grid is-droppable" onDragEnd={dragEnd} onDragEnter={dragEnter} onDragOver={dragOver} onDragLeave={dragLeave} onDrop={drop}>
            {books && books.sort(sortBy('title')).map((book, index) => (
              <BookSnippet
                key={index}
                details={book}
                shelfs={props.shelfs}
                updateShelf={props.updateShelf}
                drag={dragging}
                dragStart={dragStart}
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
  // books not required since PropTypes not allow check for null
  // https://github.com/facebook/react/issues/3163#issuecomment-292669149
  books: PropTypes.array,
  shelfs: PropTypes.array.isRequired,
  updateShelf: PropTypes.func.isRequired,
}

export default Bookshelf
