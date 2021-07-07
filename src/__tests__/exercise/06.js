// mocking Browser APIs and modules
// http://localhost:3000/location

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import Location from '../../examples/location'
import {useCurrentPosition} from 'react-use-geolocation'
import {act} from 'react-dom/test-utils'

jest.mock('react-use-geolocation')

test('displays the users current location', () => {
  const fakePosition = {
    coords: {
      latitude: 40,
      longitude: -105,
    },
  }

  let setReturnValue
  const useMockCurrentPosition = () => {
    const state = React.useState([])
    setReturnValue = state[1]
    return state[0]
  }

  useCurrentPosition.mockImplementation(useMockCurrentPosition)

  render(<Location />)
  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()

  act(() => {
    setReturnValue([fakePosition])
  })

  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument()
  expect(
    screen.getByText(`Latitude: ${fakePosition.coords.latitude}`),
  ).toBeInTheDocument()
  expect(
    screen.getByText(`Longitude: ${fakePosition.coords.longitude}`),
  ).toBeInTheDocument()
})

test('displays an error', () => {
  const fakePosition = {}
  const error = {message: 'oh no! there was an error'}

  let setReturnValue
  const useMockCurrentPosition = () => {
    const state = React.useState([])
    setReturnValue = state[1]
    return state[0]
  }

  useCurrentPosition.mockImplementation(useMockCurrentPosition)

  render(<Location />)
  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()

  act(() => {
    setReturnValue([fakePosition, error])
  })
  expect(screen.getByRole('alert')).toHaveTextContent(error.message)
})
