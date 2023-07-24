import clsx from 'clsx'
import { generateTime, timeString } from '../../utils/generateTime.ts'
import { useStopwatch } from '../../provider/StopwatchProvider.tsx'

const LapTable = () => {
  const { lapTime } = useStopwatch()

  return (
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
  )
}

export default LapTable
