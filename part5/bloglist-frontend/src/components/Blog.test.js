import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

const blog = {
    title: 'Test',
    author: 'StannisB',
    url: 'hwww.google.com/',
    likes: 100,
    user: {
      username: 'Stannis',
      name: 'StanTheMan',
      id: '2346iu2i34go67g14763',
    },
  }

const user = {
  name: 'Seppo',
  id: '1'
}

const mockHandler = jest.fn()

test('renders content', () => {  
    const component = render(
      <Blog blog={blog} likeBlog = {mockHandler} removeBlog = {mockHandler} user={user} />
    )
  
    expect(component.container).toHaveTextContent('Test')
    expect(component.container).toHaveTextContent('StannisB')
  }) 

test('clicking the button twice calls event handler once', async () => {
  const likeMock = jest.fn()
  const removeMock = jest.fn()

  const { getByText } = render(
    <Blog blog={blog} likeBlog = {likeMock} removeBlog = {removeMock} user={user} />
  )
  
  const likeButton = getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(likeMock.mock.calls.length).toBe(2)
})