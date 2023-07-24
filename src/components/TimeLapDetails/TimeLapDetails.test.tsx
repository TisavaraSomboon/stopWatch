import { render } from '@testing-library/react'
import TimeLapDetails from './TimeLapDetails'
import StopwatchProvider from '../../provider/StopwatchProvider.tsx'

describe('TimeLapDetails Component', () => {
  it('should render TimeLapDetails component', () => {
    render(
      <StopwatchProvider>
        <TimeLapDetails />
      </StopwatchProvider>,
    )
  })
})
