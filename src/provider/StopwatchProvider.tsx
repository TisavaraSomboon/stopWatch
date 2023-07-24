import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

interface StopwatchProviderProps {
  children: ReactNode
}

interface LapTime {
  lap: number
  time: number
}
interface TimeInterval {
  lapTime: LapTime[]
  isRunning: boolean
}

interface StopwatchProviderValue {
  time: number
  isRunning: boolean
  isResettable: boolean
  lapTime: LapTime[]
  handleStartAndStop: () => void
  handleLapAndReset: () => void
}

const StopwatchProviderContext = createContext<StopwatchProviderValue>({
  time: 0,
  isRunning: false,
  isResettable: false,
  lapTime: [],
  handleStartAndStop: () => {},
  handleLapAndReset: () => {},
})

export const useStopwatch = () => useContext(StopwatchProviderContext)

const StopwatchProvider = ({ children }: StopwatchProviderProps) => {
  const defaultTime = { lapTime: [], isRunning: false }

  const [time, setTime] = useState(0)
  const [{ isRunning, lapTime }, setTimeInterval] = useState<TimeInterval>(defaultTime)

  const isResettable = time !== 0 && !isRunning

  useEffect(() => {
    let intervalId: NodeJS.Timer

    if (isRunning) {
      intervalId = setInterval(() => {
        setTime((prevState) => prevState + 1)
      }, 10)
    }

    return () => {
      clearInterval(intervalId)
    }
  }, [isRunning, time])

  const handleStartAndStop = () => {
    setTimeInterval((prevState) => ({ ...prevState, isRunning: !prevState.isRunning }))
  }

  const handleLapAndReset = () => {
    setTimeInterval((prevState) => {
      if (!isResettable) {
        return {
          ...prevState,
          lapTime: [
            ...prevState.lapTime,
            {
              time,
              lap:
                prevState.lapTime.length === 0
                  ? time
                  : time - prevState.lapTime[prevState.lapTime.length - 1].time,
            },
          ],
        }
      }

      return defaultTime
    })
  }

  return (
    <StopwatchProviderContext.Provider
      value={{ time, isRunning, isResettable, lapTime, handleStartAndStop, handleLapAndReset }}
    >
      {children}
    </StopwatchProviderContext.Provider>
  )
}

export default StopwatchProvider
