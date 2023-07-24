import { render } from '@testing-library/react'
import WatchPage from './WatchPage'
import StopwatchProvider from '../../provider/StopwatchProvider.tsx'

describe('WatchPage Component', () => {
  it('should render WatchPage component', () => {
    render(
      <StopwatchProvider>
        <WatchPage />
      </StopwatchProvider>,
    )
  })
})
