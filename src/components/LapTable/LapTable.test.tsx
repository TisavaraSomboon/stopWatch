import { render } from '@testing-library/react'
import LapTable from './LapTable'
import StopwatchProvider from '../../provider/StopwatchProvider.tsx'

describe('LapTable Component', () => {
  it('should render LapTable component', () => {
    render(
      <StopwatchProvider>
        <LapTable />
      </StopwatchProvider>,
    )
  })
})
