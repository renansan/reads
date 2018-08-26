import React from 'react'
import { Link } from 'react-router-dom'
import slugify from 'slugify'
import PropTypes from 'prop-types'
import ShelfSelector from '../ShelfSelector'
import * as BooksAPI from '../../api/BooksAPI'

/**
 * Book Snippet
 * Show a snippet of the book with the cover, title and authors
 *
 * @extends React
 */
class BookSnippet extends React.Component {

  state = {
    currentShelf: '',
  }

  //handle changes on ShelfSelector
  handleChange = (event) => {
    this.props.updateShelf(this.props.details, event);
    this.setState({currentShelf: event.target.value});
  };

  componentDidMount() {
    // const bookId = this.props.location.hash.replace('#', '');
    // const bookId = this.props.location.state.bookId;

    // If receive book details from props
    if (this.props.details) {
      // get the book data from API
      BooksAPI.get(this.props.details.id).then(book => {
        // set correct shelf by the get method from the API since
        // the search method don't
        this.setState({ currentShelf: book.shelf });
      });
    }
  }

  render() {
    // get the constants from details prop
    const {id, title, authors, imageLinks} = this.props.details;
    // check and set if a cover image exists
    const cover = (imageLinks && imageLinks.thumbnail) ? imageLinks.thumbnail : '';
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${cover})` }}></div>
            <div className="book-shelf-changer">
              {this.state.currentShelf && (
                <ShelfSelector handleChange={this.handleChange} currentShelf={this.state.currentShelf || ''}/>
              )}
            </div>
          </div>
          <div className="book-title">{title}</div>
          <div className="book-authors">{Array.isArray(authors) ? authors.join(', ') : authors}</div>
          <Link
            className="book-details-link"
            to={{
              pathname: `/book/${slugify(title, {lower: true})}`,
              search: `?id=${id}`,
              state: {
                bookId: id
              }
            }}>See details</Link>
        </div>
      </li>
    )
  }
}

BookSnippet.propTypes = {
  details: PropTypes.object.isRequired,
  shelfs: PropTypes.array.isRequired,
  updateShelf: PropTypes.func.isRequired,
}

export default BookSnippet
