import * as BooksAPI from '../../api/BooksAPI'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Loading from '../Loading'
import ShelfSelector from '../ShelfSelector'

/**
 * Book Details
 * Show details from book
 *
 * @extends React
 */
class BookDetails extends Component {
  state = {
    book: '',
    currentShelf: '',
  }

  //handle changes on ShelfSelector
  handleChange = (shelf) => {
    this.props.updateShelf(this.state.book, shelf);
    this.setState({currentShelf: shelf.id});
  };

  // Get the book ID from url passed by Route in props.location.
  // Although it is possible to get the ID from parent component through props
  // when access page by clicking in "See Details" anchor, It was the better
  // approach to ensure that's the correct page when access it directly by URL
  getBook = (cb) => {
    const bookId = this.props.location.search.replace('?id=', '');
    // IF there's and ID in the URL get the book from API
    if (bookId) {
      BooksAPI.get(bookId).then(book => {
        this.setState({ book }, () => cb(book) );
      });
    // otherwise push back to root page
    }
  }

  componentDidMount() {
    // const bookId = this.props.location.hash.replace('#', '');
    // const bookId = this.props.location.state.bookId;
    this.getBook((book) => {
      if (!book) this.props.history.push('/');
    });
}

  render() {
    // get constants from book state
    const {title, subtitle, publisher, publishedDate, description, language, authors, imageLinks, pageCount, categories, canonicalVolumeLink} = this.state.book;
    // set an object of details to loop through
    const details = {publisher, publishedDate, language, pageCount, categories};
    // check and set if a cover image exists
    const cover = (imageLinks && imageLinks.thumbnail) ? imageLinks.thumbnail : '';
    // set shelf from currentShelf (only if ShelfSelector changes) or from data taken from API
    let shelf = this.state.currentShelf || this.state.book.shelf;
    return (
      <div className="book-page">
        {!this.state.book ? (
          <Loading />
        ) : (
          <article className="book-page-main">
            <header className="book-page-header">
              <div className="book-page-cover">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${cover})` }}></div>
                {shelf && (
                  <div className="book-page-select">
                    <label>Current Shelf:</label>
                    <ShelfSelector handleChange={this.handleChange} currentShelf={shelf || ''}/>
                  </div>
                )}
              </div>
              <div className="book-page-abstract">
                <h1 className="book-page-title">{title}</h1>
                <h2 className="book-page-subtitle">{subtitle}</h2>
                <div className="book-authors">{Array.isArray(authors) ? authors.join(', ') : authors}</div>
                <dl className="book-details-list">
                  {Object.keys(details).map((key, index) => (
                    <div className="book-details-item" key={index}>
                      <dt className="book-details-term">{key}:&nbsp;</dt>
                      <dd className="book-details-description">{Array.isArray(details[key]) ? (details[key].join(', ')) : (details[key])}</dd>
                    </div>
                  ))}
                </dl>
                <a className="button" href={canonicalVolumeLink} title="Click to go to the store" target="_blank">Buy</a>
              </div>
            </header>
            <div className="book-description">
              <h3>Description</h3>
              {description}
            </div>
          </article>
        )}
      </div>
    )
  }
}

BookDetails.propTypes = {
  location: PropTypes.object.isRequired,
  updateShelf: PropTypes.func.isRequired,
}

export default BookDetails
