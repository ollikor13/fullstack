/* eslint-disable linebreak-style */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('Render only title and author first', async () => {
  const testblog = {
    title: 'Test blog title',
    likes: '5565',
    author: 'Test author',
    url: 'Test URL'
  }

  const component = render(
    <Blog blog={testblog} />
  )

  const div = component.container.querySelector('.renderedDiv')
  expect(div).toHaveTextContent(
    'Test blog title Test author'
  )
  expect(div).not.toHaveTextContent(
    'Test URL'
  )
})

test('Render other values when clicked on', async () => {
  const testUser = {
    username: 'Testuser',
    name: 'Testname'
  }
  const testblog = {
    title: 'Test blog title',
    likes: '5565',
    author: 'Test author',
    url: 'Test URL',
    user: testUser
  }


  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={testblog} user={testUser} toggleVisibility={mockHandler} />
  )

  const button = component.container.querySelector('.divtoclick')
  fireEvent.click(button)


  const div = component.container.querySelector('.renderedDiv')
  expect(div).toHaveTextContent(
    'Test blog title Test authorTest URLThis blog has 5565 likes Likeadded by: TestnameRemove this blog'
  )

})
