import { useStopwatch } from '../../provider/StopwatchProvider.tsx'

interface ButtonWatchProps {}

const ButtonWatch = ({}: ButtonWatchProps) => {
  const { time, isRunning, isResettable, handleLapAndReset, handleStartAndStop } = useStopwatch()

  return (
    <div className='flex max-[280px]:flex-col gap-4 md:gap-16'>
      <button className='bg-slate-600' disabled={time === 0} onClick={handleLapAndReset}>
        {isResettable ? 'Reset' : 'Lap'}
      </button>
      <button className={isRunning ? 'bg-red-500' : 'bg-green-400'} onClick={handleStartAndStop}>
        {isRunning ? 'Stop' : 'Start'}
      </button>
    </div>
  )
}

export default ButtonWatch
