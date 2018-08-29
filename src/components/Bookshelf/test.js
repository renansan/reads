import React from 'react'
import { shallow } from 'enzyme';
import Bookshelf from './index'
import BookSnippet from '../BookSnippet'

describe('tests suite', () => {
  let props;
  let wrapper;

  describe('Base test', () => {
    beforeEach(() => {
      props = {
        id: 'test',
        title: 'Shelf Title',
        books: [
          {"id": "test", "title": "Test Book", "shelf": "test"},
          {"id": "test2", "title": "Test Book 2", "shelf": "test2"},
        ],
        updateShelf: jest.fn(() => 'updateShelf'),
      };
      wrapper = shallow(<Bookshelf {...props} />);
    });

    it('renders without crashing', () => {
      expect(wrapper).toBeDefined();
    });

    it('renders BookSnippet with right props', () => {
      expect(wrapper.find(BookSnippet)).toHaveLength(1);
      expect(wrapper.find(BookSnippet)
        .prop('details')).toEqual(props.books[0]);
    });
  });
})
