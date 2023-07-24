import { generateTime } from '../../utils/generateTime.ts'
import { useStopwatch } from '../../provider/StopwatchProvider.tsx'
import LapTable from '../LapTable'

const TimeLapDetails = () => {
  const { time, lapTime } = useStopwatch()

  return (
    <>
      <p className='text-gray-800 text-4xl'>
        {generateTime(time - lapTime[lapTime.length - 1]?.time)}
      </p>
      <div className='flex flex-col gap-4 h-full w-full overflow-auto'>
        <LapTable />
      </div>
    </>
  )
}

export default TimeLapDetails
