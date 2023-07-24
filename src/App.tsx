import StopwatchProvider from './provider/StopwatchProvider.tsx'
import WatchPage from './components/WatchPage'

function App() {
  return (
    <StopwatchProvider>
      <WatchPage />
    </StopwatchProvider>
  )
}

export default App
