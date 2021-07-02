// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {build, fake} from '@jackfranklin/test-data-bot'
import Login from '../../components/login'

const loginBuilder = build({
  fields: {
    username: fake(f => f.internet.userName()),
    password: fake(f => f.internet.password()),
  },
})

test('submitting the form calls onSubmit with username and password', () => {
  const handleSubmit = jest.fn()
  render(<Login onSubmit={handleSubmit} />)
  const {username, password} = loginBuilder()

  const usernameInput = screen.getByRole('textbox', {name: /username/i})
  const passwordInput = screen.getByLabelText(/password/i)
  userEvent.type(usernameInput, username)
  userEvent.type(passwordInput, password)

  const submit = screen.getByRole('button', {name: /submit/i})
  userEvent.click(submit)

  expect(handleSubmit).toHaveBeenCalledWith({
    username,
    password,
  })
  expect(handleSubmit).toHaveBeenCalledTimes(1)
})
