import React from 'react'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types'
import Loading from './Loading'

class BookDetails extends React.Component {
  state = {
    book: '',
  }

  componentDidMount() {
    // const bookId = this.props.location.hash.replace('#', '');
    // const bookId = this.props.location.state.bookId;
    const bookId = this.props.location.search.replace('?id=', '');
    if (bookId) {
      BooksAPI.get(bookId).then(book => {
        this.setState({ book });
      });
    }
  }

  render() {
    const {title, subtitle, publisher, publishedDate, description, language, authors, imageLinks, pageCount, categories, canonicalVolumeLink} = this.state.book;
    const details = {publisher, publishedDate, language, pageCount, categories};
    const cover = (imageLinks && imageLinks.thumbnail) ? imageLinks.thumbnail : '';
    return (
      <div className="book-page">
        {!this.state.book ? (
          <Loading />
        ) : (
          <article className="book-page-main">
            <header className="book-page-header">
              <div className="book-page-cover">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${cover})` }}></div>
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
}

export default BookDetails
