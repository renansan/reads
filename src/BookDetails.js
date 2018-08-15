import React from 'react'
import { Link } from 'react-router-dom'
import slugify from 'slugify'

const BookDetails = (props) => {
  const change = (event) => {
    const el = event.target;
    const shelf = {
      id: el.value,
      title: el[el.selectedIndex].textContent
    }
    props.updateShelf(props.details, shelf)
  };
  const {id, title, authors, imageLinks, shelf} = props.details;
  const cover = (imageLinks && imageLinks.thumbnail) ? imageLinks.thumbnail : '';
  // const linkTo = `/book/${slugify(title, {lower: true})}`;
  // const linkTo = `/book/${slugify(title, {lower: true})}#${id}`;
  // const linkTo = `/book/${slugify(title, {lower: true})}?id=${id}`;

  return (
    <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${cover})` }}></div>
            <div className="book-shelf-changer">
              <select onChange={change} value={shelf || 'none'}>
                <option value="move" disabled>Move to...</option>
                {props.shelfs && props.shelfs.map((bookshelf, index) => (
                  <option key={index} value={bookshelf.id}>{bookshelf.title}</option>
                ))}
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{title}</div>
          <div className="book-authors">{authors}</div>
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

export default BookDetails
