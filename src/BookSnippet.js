import React from 'react'
import { Link } from 'react-router-dom'
import slugify from 'slugify'
import PropTypes from 'prop-types'
import ShelfSelector from './ShelfSelector'
import * as BooksAPI from './BooksAPI'

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
    if (this.props.details) {
      BooksAPI.get(this.props.details.id).then(book => {
        this.setState({ currentShelf: book.shelf });
      });
    }
  }

  render() {
    const {id, title, authors, imageLinks} = this.props.details;
    const cover = (imageLinks && imageLinks.thumbnail) ? imageLinks.thumbnail : '';
    let shelf = this.props.details.shelf || this.state.currentShelf;
    // debugger;
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${cover})` }}></div>
            <div className="book-shelf-changer">
              {shelf && (
                <ShelfSelector handleChange={this.handleChange} currentShelf={shelf || ''}/>
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
