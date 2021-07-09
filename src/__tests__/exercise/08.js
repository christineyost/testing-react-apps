// testing custom hooks
// http://localhost:3000/counter-hook

import useCounter from '../../components/use-counter'
import {renderHook, act} from '@testing-library/react-hooks'

// const TestComponent = (props = {}) => {
//   const {count, increment, decrement} = useCounter(props)

//   return (
//     <div>
//       <p>Count: {count}</p>
//       <button onClick={increment}>Increment</button>
//       <button onClick={decrement}>Decrement</button>
//     </div>
//   )
// }

// test('exposes the count and increment/decrement functions', () => {
//   render(<TestComponent />)
//   const count = screen.getByText(/count/i)
//   const incrementButton = screen.getByRole('button', {name: /increment/i})
//   const decrementButton = screen.getByRole('button', {name: /decrement/i})

//   expect(count).toHaveTextContent('Count: 0')

//   userEvent.click(incrementButton)
//   expect(count).toHaveTextContent('Count: 1')

//   userEvent.click(decrementButton)
//   expect(count).toHaveTextContent('Count: 0')
// })

// test('uses initialCount configuration', () => {
//   render(<TestComponent initialCount={10} />)
//   const count = screen.getByText(/count/i)
//   expect(count).toHaveTextContent('Count: 10')
// })

// test('uses step configuration', () => {
//   render(<TestComponent step={2} />)
//   const count = screen.getByText(/count/i)
//   const incrementButton = screen.getByRole('button', {name: /increment/i})
//   const decrementButton = screen.getByRole('button', {name: /decrement/i})

//   expect(count).toHaveTextContent('Count: 0')

//   userEvent.click(incrementButton)
//   expect(count).toHaveTextContent('Count: 2')

//   userEvent.click(decrementButton)
//   expect(count).toHaveTextContent('Count: 0')
// })

test('test with a fake component', () => {
  const {result} = renderHook(useCounter)

  expect(result.current.count).toEqual(0)
  act(() => result.current.decrement())
  expect(result.current.count).toEqual(-1)
  act(() => result.current.increment())
  expect(result.current.count).toEqual(0)
})

test('allows customization of the initial count', () => {
  const {result} = renderHook(useCounter, {initialProps: {initialCount: 10}})

  expect(result.current.count).toEqual(10)
  act(() => result.current.decrement())
  expect(result.current.count).toEqual(9)
  act(() => result.current.increment())
  expect(result.current.count).toEqual(10)
})

test('allows customization of the step', () => {
  const {result} = renderHook(useCounter, {initialProps: {step: 4}})

  expect(result.current.count).toEqual(0)
  act(() => result.current.increment())
  expect(result.current.count).toEqual(4)
  act(() => result.current.decrement())
  expect(result.current.count).toEqual(0)
})

test('step can be changed', () => {
  const {result, rerender} = renderHook(useCounter, {initialProps: {step: 4}})

  expect(result.current.count).toEqual(0)
  act(() => result.current.increment())
  expect(result.current.count).toEqual(4)

  rerender({step: 2})
  act(() => result.current.decrement())
  expect(result.current.count).toEqual(2)
})
