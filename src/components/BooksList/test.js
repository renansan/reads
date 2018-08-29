import React from 'react'
import { shallow } from 'enzyme';
import BooksList from './index'
import Bookshelf from '../Bookshelf'

describe('tests suite', () => {
  let props;
  let wrapper;

  describe('Base test', () => {
    beforeEach(() => {
      props = {
        shelfs: [{"id": "test", "title": "Test Shelf"}],
        books: [{"id": "test", "title": "Test Book", "shelf": "test"}],
        updateShelf: jest.fn(() => 'updateShelf'),
      };
      wrapper = shallow(<BooksList {...props} />);
    });

    it('renders without crashing', () => {
      expect(wrapper).toBeDefined();
    });

    it('renders Bookshelf with right props', () => {
      expect(wrapper.find(Bookshelf)).toHaveLength(1);
      expect(wrapper.find(Bookshelf)
        .prop('title')).toEqual(props.shelfs[0].title);
      expect(wrapper.find(Bookshelf)
        .prop('books')).toContainEqual(props.books[0]);
    });
  });
})
