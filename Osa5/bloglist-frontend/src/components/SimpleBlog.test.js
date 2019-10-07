/* eslint-disable linebreak-style */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
//import { prettyDOM } from '@testing-library/dom'
import SimpleBlog from './SimpleBlog'

//afterEach(cleanup)

test('clicking the button calls event handler once', async () => {
  const testblog = {
    title: 'Testiblogi',
    author: 'Testihenkilo',
    likes: 23
  }

  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog={testblog} onClick={mockHandler} />
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})
