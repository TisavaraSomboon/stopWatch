export const timeString = (time: number) => time.toString().padStart(2, '0')

export const generateTime = (time: number) => {
  // Times calculation
  const minutes = timeString(Math.floor((time % 360000) / 6000))
  const seconds = timeString(Math.floor((time % 6000) / 100))
  const milliseconds = timeString(time % 100)

  return `${minutes}:${seconds}.${milliseconds}`
}
