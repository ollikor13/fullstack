/* eslint-disable linebreak-style */
let savedItems = {}

const localStorageMock = {
  setItem: (key, item) => {
    savedItems[key] = item
  },
  getItem: (key) => savedItems[key],
  clear: savedItems = {}
}

Object.defineProperty(window, 'localStorage', { value: localStorageMock })