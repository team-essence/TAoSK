import { useState, useEffect } from 'react'
import date from 'utils/date/date'

export const useChangeDeadlineImage = (endDate: string): string => {
  const [filePath, setFilePath] = useState<string>('')
  const isYesterday = date.isYesterday(endDate)
  const isThreeDaysAgo = date.isThreeDaysAgo(endDate)

  useEffect(() => {
    if (isThreeDaysAgo) {
      if (isYesterday) {
        setFilePath('/images/warning/over.png')
      } else {
        setFilePath('/images/warning/warning.png')
      }
    } else {
      setFilePath('/images/warning/normal.png')
    }
  }, [])

  return filePath
}
