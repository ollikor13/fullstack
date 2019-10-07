/* eslint-disable linebreak-style */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, waitForElement } from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'

/*const Wrapper = props => {
  const onChange = event => {
    props.state.value = event.target.value
  };

  return (
    <LoginForm
      username={props.state.value}
      password={props.state.value}
      onSubmit={props.onSubmit}
      handleChange={onChange}
    />
  )
}*/

describe('<App />', () => {
  test('if no user logged, blogs are not rendered', async () => {
    const component = render(<App />)
    component.rerender(<App />)

    await waitForElement(() => component.getByText('login'))

    const div = component.container.querySelector('.loginDiv')
    expect(div).toHaveTextContent('Log in to applicationusernamepasswordlogin')
  })

  test('Test user login', async () => {
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Donald Tester'
    }
    

    localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

    const component = render(<App />)
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('Blogs')
    )

    const div = component.container.querySelector('.MainDiv')
    expect(div).toHaveTextContent('BlogsDonald Tester logged inLogoutAdd new blogCreate new blogTitle Author Url SubmitcancelBlogs:tokentesti3 OlliTestikaks Jonkun nimitokentesti Ollitokentesti2 OlliErrorblogi OlliKBlogin nimi Olli')
  })
})
