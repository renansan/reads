import React from 'react'
import renderer from 'react-test-renderer';
import ShelfSelector from './index'

it('renders correctly', () => {
  const props = {
    handleChange: jest.fn(() => 'handleChange'),
    currentShelf: 'test',
  }
  const tree = renderer.create(<ShelfSelector {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
