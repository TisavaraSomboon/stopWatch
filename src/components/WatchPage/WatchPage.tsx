import ButtonWatch from '../ButtonWatch'
import { generateTime } from '../../utils/generateTime.ts'
import { useStopwatch } from '../../provider/StopwatchProvider.tsx'
import TimeLapDetails from '../TimeLapDetails'

const WatchPage = () => {
  const { time, lapTime } = useStopwatch()

  return (
    <div className='w-screen h-screen bg-black'>
      <div className='flex flex-col gap-16 justify-center items-center h-screen'>
        <div className='flex flex-col gap-4 items-center h-3/4 md:h-2/4 w-full md:w-2/5 max-[280px]:h-3/5'>
          <p className='text-white max-[280px]:text-5xl text-7xl md:text-8xl'>
            {generateTime(time)}
          </p>
          {lapTime.length !== 0 && <TimeLapDetails />}
        </div>
        <ButtonWatch />
      </div>
    </div>
  )
}

export default WatchPage
