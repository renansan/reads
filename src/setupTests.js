global.fetch = require('jest-fetch-mock');
fetch.mockResponse(JSON.stringify({ testing: true }));

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn()
};
global.localStorage = localStorageMock
