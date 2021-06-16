// simple test with ReactDOM
// http://localhost:3000/counter

import * as React from 'react'
import ReactDOM from 'react-dom'
import Counter from '../../components/counter'

beforeEach(() => {
  document.body.innerHTML = ''
})

test('counter increments and decrements when the buttons are clicked', () => {
  const root = document.createElement('div')
  document.body.append(root)
  ReactDOM.render(<Counter />, root)

  const [decrementButton, incrementButton] = root.querySelectorAll('button')
  const message = root.firstChild.querySelector('div')

  expect(message.textContent).toBe('Current count: 0')

  const clickEvent = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    button: 0,
  })

  incrementButton.dispatchEvent(clickEvent)
  expect(message.textContent).toBe('Current count: 1')

  decrementButton.dispatchEvent(clickEvent)
  expect(message.textContent).toBe('Current count: 0')
})
