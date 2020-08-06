import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
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
  
    const component = render(
      <Blog blog={blog} likeBlog = {mockHandler} removeBlog = {mockHandler} user={user} />
    )
  
    expect(component.container).toHaveTextContent('Test')
    expect(component.container).toHaveTextContent('StannisB')
  }) 