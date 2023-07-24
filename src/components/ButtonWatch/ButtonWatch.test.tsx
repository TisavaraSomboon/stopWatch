import { render } from '@testing-library/react'
import ButtonWatch from './ButtonWatch'
import StopwatchProvider from '../../provider/StopwatchProvider.tsx'

describe('ButtonWatch Component', () => {
  it('should render ButtonWatch component', () => {
    render(
      <StopwatchProvider>
        <ButtonWatch />
      </StopwatchProvider>,
    )
  })
})
