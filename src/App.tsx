import { useEffect, useState } from 'react'
import clsx from 'clsx'

interface TimeInterval {
  lapTime: Array<{ lap: number; time: number }>
  isRunning: boolean
}

const timeString = (time: number) => time.toString().padStart(2, '0')

const generateTime = (time: number) => {
  // Times calculation
  const minutes = timeString(Math.floor((time % 360000) / 6000))
  const seconds = timeString(Math.floor((time % 6000) / 100))
  const milliseconds = timeString(time % 100)

  return `${minutes}:${seconds}.${milliseconds}`
}

function App() {
  const defaultTime = { lapTime: [], isRunning: false }

  const [time, setTime] = useState(0)
  const [{ isRunning, lapTime }, setTimeInterval] = useState<TimeInterval>(defaultTime)

  const isResettable = time !== 0 && !isRunning

  useEffect(() => {
    let intervalId: number

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
      if (!isResettable)
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
      return defaultTime
    })
  }

  return (
    <div className='w-screen h-screen bg-black'>
      <div className='flex flex-col gap-16 justify-center items-center h-screen'>
        <div className='flex flex-col gap-4 items-center h-3/4 md:h-2/4 w-full md:w-2/5 max-[280px]:h-3/5'>
          <p className='text-white max-[280px]:text-5xl text-7xl md:text-8xl'>
            {generateTime(time)}
          </p>
          {lapTime.length !== 0 && (
            <>
              <p className='text-gray-800 text-4xl'>
                {generateTime(time - lapTime[lapTime.length - 1].time)}
              </p>
              <div className='flex flex-col gap-4 h-full w-full overflow-auto'>
                <table>
                  <thead>
                    <tr className='text-2xl'>
                      <th className='text-gray-800'>Lap</th>
                      <th className='text-gray-800'>Lap times</th>
                      <th className='text-gray-400'>Overall time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...lapTime].reverse().map(({ time, lap }, index) => (
                      <tr key={time} className='text-2xl'>
                        <td
                          className={clsx(
                            'text-gray-800',
                            lapTime.length > 1 &&
                              Math.max(...lapTime.map(({ lap }) => lap)) === lap &&
                              'text-red-400',
                            lapTime.length > 1 &&
                              Math.min(...lapTime.map(({ lap }) => lap)) === lap &&
                              'text-green-400',
                          )}
                        >
                          {timeString(lapTime.length - index)}
                        </td>
                        <td className='text-gray-800'>{generateTime(lap)}</td>
                        <td className='text-gray-400'>{generateTime(time)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
        <div className='flex max-[280px]:flex-col gap-4 md:gap-16'>
          <button className='bg-slate-600' disabled={time === 0} onClick={handleLapAndReset}>
            {isResettable ? 'Reset' : 'Lap'}
          </button>
          <button
            className={isRunning ? 'bg-red-500' : 'bg-green-400'}
            onClick={handleStartAndStop}
          >
            {isRunning ? 'Stop' : 'Start'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
