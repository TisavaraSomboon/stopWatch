import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

interface StopwatchProviderProps {
  children: ReactNode
}

interface CurrentTime {
  currentTime: number | null
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
  const localLapTime: string | null = localStorage.getItem('lap')
  const initialLapTime: CurrentTime & TimeInterval = localLapTime ? JSON.parse(localLapTime) : null

  const defaultTime = {
    lapTime: initialLapTime?.lapTime ?? [],
    isRunning: initialLapTime?.isRunning ?? false,
  }

  const [{ isRunning, lapTime }, setTimeInterval] = useState<TimeInterval>(defaultTime)
  const [time, setTime] = useState(
    initialLapTime?.currentTime ?? defaultTime.lapTime[defaultTime.lapTime.length - 1]?.time ?? 0,
  )

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
    setTimeInterval((prevState) => {
      const result = { ...prevState, isRunning: !prevState.isRunning, currentTime: time }

      localStorage.setItem('lap', JSON.stringify(result))
      return result
    })
  }

  const handleLapAndReset = () => {
    setTimeInterval((prevState) => {
      if (!isResettable) {
        const timeInterval = {
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

        localStorage.setItem('lap', JSON.stringify({ ...timeInterval, currentTime: null }))
        return timeInterval
      }

      localStorage.setItem('lap', '')
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
